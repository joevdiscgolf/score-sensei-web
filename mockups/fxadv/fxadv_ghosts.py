# Generates all Mockup E assets from IMG_8036.MOV + cached landmarks.
# Outputs (in this dir): ghosts_poster.jpg, person.png, bg.jpg, flow_still.jpg
import pickle

import cv2
import numpy as np

ROOT = '/Users/joevanderveen/Development/score-sensei'
CLIP = f'{ROOT}/IMG_8036.MOV'
CACHE = f'{ROOT}/.wt-formfx/lab_renders/.cache/sample_front__fast.pkl'
OUT = f'{ROOT}/.wt-rebrand/web/mockups/fxadv'

GHOST_FRAMES = [30, 55, 70]          # x-step, reachback, pro position
RELEASE = 81
GHOST_ALPHA = [0.25, 0.40, 0.60]

TEAL = np.array([196, 205, 78], dtype=np.float32)  # BGR of #4ecdc4


def read_frames(indices):
    cap = cv2.VideoCapture(CLIP)
    want = set(indices)
    got = {}
    i = 0
    while True:
        ok, fr = cap.read()
        if not ok:
            break
        if i in want:
            got[i] = fr
        i += 1
        if len(got) == len(want):
            break
    cap.release()
    # apply -90 rotation metadata if opencv didn't (frame would be landscape)
    for k, fr in got.items():
        if fr.shape[1] > fr.shape[0]:
            got[k] = cv2.rotate(fr, cv2.ROTATE_90_CLOCKWISE)
    return got


_SEGMENTER = None


def segment(frame, model=1):
    # mediapipe 0.10 tasks API (legacy solutions absent in this build)
    global _SEGMENTER
    import mediapipe as mp
    from mediapipe.tasks.python import BaseOptions, vision
    if _SEGMENTER is None:
        opts = vision.ImageSegmenterOptions(
            base_options=BaseOptions(
                model_asset_path=f'{ROOT}/score-sensei-backend/models/mediapipe/selfie_segmenter.tflite'),
            output_confidence_masks=True)
        _SEGMENTER = vision.ImageSegmenter.create_from_options(opts)
    img = mp.Image(image_format=mp.ImageFormat.SRGB,
                   data=cv2.cvtColor(frame, cv2.COLOR_BGR2RGB))
    res = _SEGMENTER.segment(img)
    m = res.confidence_masks[0].numpy_view().copy()
    if m.shape[:2] != frame.shape[:2]:
        m = cv2.resize(m, (frame.shape[1], frame.shape[0]))
    return m  # float32 HxW 0..1 (person confidence)


def person_mask(frame, thresh=0.25):
    m = segment(frame, 1)
    hard = (m > thresh).astype(np.uint8)
    hard = cv2.dilate(hard, np.ones((7, 7), np.uint8))
    # keep only largest component (the thrower), drop background people/noise
    n, lab, stats, _ = cv2.connectedComponentsWithStats(hard, 8)
    if n > 1:
        big = 1 + int(np.argmax(stats[1:, cv2.CC_STAT_AREA]))
        hard = (lab == big).astype(np.uint8)
    hard = cv2.morphologyEx(hard, cv2.MORPH_CLOSE, np.ones((15, 15), np.uint8))
    soft = cv2.GaussianBlur(hard.astype(np.float32), (13, 13), 0)
    return soft  # feathered 0..1


def cool_desat(img, amount):
    g = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY).astype(np.float32)
    gray3 = cv2.merge([g, g, g])
    f = img.astype(np.float32)
    out = f * (1 - amount) + gray3 * amount
    # cool tint: nudge toward teal
    out = out * 0.92 + TEAL[None, None, :] * 0.08 * (out.mean(axis=2, keepdims=True) / 255 + 0.3)
    return np.clip(out, 0, 255)


def vignette(img):
    h, w = img.shape[:2]
    y, x = np.mgrid[0:h, 0:w].astype(np.float32)
    d = np.sqrt(((x - w / 2) / (w / 2)) ** 2 + ((y - h / 2) / (h / 2)) ** 2)
    v = np.clip(1.15 - 0.45 * d ** 2.2, 0.45, 1.0)
    return np.clip(img.astype(np.float32) * v[..., None], 0, 255).astype(np.uint8)


def build_ghost_poster(frames):
    base = frames[RELEASE].astype(np.float32)
    base = np.clip(base * 0.88 + 4, 0, 255)  # subtle dark grade
    canvas = base.copy()
    for idx, alpha in zip(GHOST_FRAMES, GHOST_ALPHA):
        fr = frames[idx]
        m = person_mask(fr)[..., None] * alpha
        ghost = cool_desat(fr, 0.65)
        canvas = canvas * (1 - m) + ghost * m
    # release rider on top at full opacity (crisp)
    rm = person_mask(frames[RELEASE])[..., None]
    canvas = canvas * (1 - rm) + frames[RELEASE].astype(np.float32) * rm
    out = vignette(np.clip(canvas, 0, 255).astype(np.uint8))
    cv2.imwrite(f'{OUT}/ghosts_poster.jpg', out, [cv2.IMWRITE_JPEG_QUALITY, 90])
    print('ghosts_poster.jpg', out.shape)


def build_parallax_layers(frame):
    soft = person_mask(frame, thresh=0.15)
    hard = (soft > 0.2).astype(np.uint8)
    dil = cv2.dilate(hard, np.ones((51, 51), np.uint8))
    bg = cv2.inpaint(frame, dil * 255, 7, cv2.INPAINT_TELEA)
    bg = cv2.GaussianBlur(bg, (5, 5), 0)  # hide inpaint smears a touch
    cv2.imwrite(f'{OUT}/bg.jpg', bg, [cv2.IMWRITE_JPEG_QUALITY, 88])
    rgba = np.dstack([frame, (soft * 255).astype(np.uint8)])
    cv2.imwrite(f'{OUT}/person.png', rgba)
    print('bg.jpg', bg.shape, '| person.png', rgba.shape)


def build_flow_still(frame, cache_frames):
    h, w = frame.shape[:2]

    def pt(fi, li):
        lm = cache_frames[fi]['landmarks'][li]
        return np.array([lm['x'], lm['y']], dtype=np.float32)

    # temporal kinetic chain (RH): hip early -> shoulder -> wrist sweeping through release
    chain = [pt(60, 24), pt(70, 12), pt(74, 16), pt(78, 16), pt(84, 16)]
    exit_dir = pt(84, 16) - pt(81, 16)
    exit_dir /= (np.linalg.norm(exit_dir) + 1e-6)
    chain.append(chain[-1] + exit_dir * 240)

    # smooth curve through chain
    chain = np.array(chain)
    t = np.linspace(0, 1, len(chain))
    ts = np.linspace(0, 1, 240)
    sx = np.interp(ts, t, chain[:, 0])
    sy = np.interp(ts, t, chain[:, 1])
    k = np.hanning(41); k /= k.sum()
    sx = np.convolve(np.pad(sx, 20, mode='edge'), k, 'valid')
    sy = np.convolve(np.pad(sy, 20, mode='edge'), k, 'valid')
    pts = np.stack([sx, sy], axis=1)[:240]

    glow = np.zeros((h, w, 3), np.float32)
    n = len(pts)
    for i in range(n - 1):
        f = i / (n - 1)
        thick = int(3 + 13 * f)                     # tapered: thin at hips, fat at exit
        white = (f ** 2) * 0.65                     # only the tip goes hot
        col = TEAL * (1 - white) + np.array([255, 255, 255]) * white
        col = col * (0.45 + 0.55 * f)               # dim near hips
        cv2.line(glow, tuple(pts[i].astype(int)), tuple(pts[i + 1].astype(int)),
                 col.tolist(), thick, cv2.LINE_AA)
    # streamline offshoots
    rng = np.random.default_rng(7)
    for k in range(4):
        i0 = rng.integers(n // 3, n - 30)
        seg = pts[i0:i0 + 28].copy()
        normal = np.array([-(seg[-1] - seg[0])[1], (seg[-1] - seg[0])[0]])
        normal /= (np.linalg.norm(normal) + 1e-6)
        off = (k - 1.5) * 26
        seg += normal * off * np.linspace(0.2, 1, len(seg))[:, None]
        for j in range(len(seg) - 1):
            cv2.line(glow, tuple(seg[j].astype(int)), tuple(seg[j + 1].astype(int)),
                     (TEAL * 0.9).tolist(), 3, cv2.LINE_AA)
    core = glow.copy()
    glow = cv2.GaussianBlur(glow, (0, 0), 22) * 0.9 + cv2.GaussianBlur(core, (0, 0), 3) * 0.9
    out = np.clip(frame.astype(np.float32) * 0.86 + glow * 0.75, 0, 255).astype(np.uint8)
    out = vignette(out)
    cv2.imwrite(f'{OUT}/flow_still.jpg', out, [cv2.IMWRITE_JPEG_QUALITY, 90])
    print('flow_still.jpg', out.shape)


def main():
    frames = read_frames(GHOST_FRAMES + [RELEASE])
    print('frames read:', {k: v.shape for k, v in frames.items()})
    build_ghost_poster(frames)
    build_parallax_layers(frames[RELEASE])
    cache = pickle.load(open(CACHE, 'rb'))
    build_flow_still(frames[RELEASE], cache['frames'])


if __name__ == '__main__':
    main()
