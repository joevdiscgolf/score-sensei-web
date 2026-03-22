# ScoreSensei Screenshot Checklist

Capture all screenshots on iPhone 15 Pro Max (or latest) in dark mode.
Save images as PNG in this folder with the exact filenames below.

---

## Current Website Screenshot Mapping

### Hero Section
| Element | Image Path | Status |
|---------|-----------|--------|
| Main phone (right) | `v2/kalan-loaded-comparison.png` | [x] |
| Secondary phone (left) | `hero-secondary.png` (v1) | [x] |

### "See what you've been missing" Section
| Element | Image Path | Status |
|---------|-----------|--------|
| Form Analysis showcase | `v2/trent-loaded-comparison.png` | [x] |

### "Every detail, measured" Section
| Label | Image Path | Status |
|-------|-----------|--------|
| Get Your Form Graded | `v2/joe-analysis-score.png` | [x] |
| Back Knee Analysis | `v2/kalan-knee-angle.png` | [x] |
| Powered Rotation | `v2/trent-powered-rotation.png` | [x] |

### Round Showcase Section
| Element | Image Path | Status |
|---------|-----------|--------|
| Drive Analysis | `drive-analysis.png` (v1) | [x] |
| Putt Analysis | `putt-analysis.png` (v1) | [x] |
| Round Story | `round-story.png` (v1) | [x] |

### "See ScoreSensei in action" Carousel
| Image Path | Alt Text | Status |
|-----------|----------|--------|
| `v2/kalan-loaded-comparison.png` | Form Comparison | [x] |
| `v2/trent-loaded-comparison.png` | Form Analysis | [x] |
| `the-judge.png` (v1) | The Judge | [x] |
| `putt-analysis.png` (v1) | Putt Analysis | [x] |
| `round-story.png` (v1) | Round Story | [x] |
| `drive-analysis.png` (v1) | Drive Analysis | [x] |
| `skills_assessment.png` | Skills Assessment | [x] |
| `mental-game.png` | Mental Game | [x] |
| `top-discs.png` | Top Discs | [x] |
| `hole-throws-panel.png` | Hole Throws | [x] |

---

## Folder Structure

```
assets/screenshots/
├── SCREENSHOT_CHECKLIST.md     (this file)
│
├── v1 images (kept for reference)
│   ├── hero-main.png
│   ├── hero-secondary.png      ← still used in hero
│   ├── form-analysis.png
│   ├── form-observations.png
│   ├── back-knee-annotation.png
│   ├── extension-annotation.png
│   ├── download-cta.png
│   └── backn-knee-annotation.png (old typo version)
│
├── v1 round analysis (still in use)
│   ├── drive-analysis.png
│   ├── putt-analysis.png
│   ├── round-story.png
│   └── the-judge.png
│
├── new round analysis
│   ├── skills_assessment.png
│   ├── mental-game.png
│   ├── top-discs.png
│   └── hole-throws-panel.png
│
└── v2/
    ├── kalan-loaded-comparison.png   ← hero main
    ├── trent-loaded-comparison.png   ← form analysis section
    ├── joe-analysis-score.png        ← "Get Your Form Graded"
    ├── kalan-knee-angle.png          ← "Back Knee Analysis"
    ├── trent-powered-rotation.png    ← "Powered Rotation"
    ├── joe-extension-angle.png       (available, not used)
    └── joe-powered-rotation.png      (available, not used)
```

---

## V2 Form Analysis Images

| Filename | Used For | Notes |
|----------|----------|-------|
| `kalan-loaded-comparison.png` | Hero main phone | Pro comparison view |
| `trent-loaded-comparison.png` | "See what you've been missing" | Loaded position analysis |
| `joe-analysis-score.png` | "Get Your Form Graded" | Overall form score |
| `kalan-knee-angle.png` | "Back Knee Analysis" | Knee angle measurement |
| `trent-powered-rotation.png` | "Powered Rotation" | Core rotation mechanics |
| `joe-extension-angle.png` | Not currently used | Extension angle detail |
| `joe-powered-rotation.png` | Not currently used | Alternative rotation view |

---

## Round Analysis Images

| Filename | Used In | Notes |
|----------|---------|-------|
| `drive-analysis.png` | Round Showcase, Carousel | Drive stats |
| `putt-analysis.png` | Round Showcase, Carousel | Putting stats |
| `round-story.png` | Round Showcase, Carousel | AI narrative |
| `the-judge.png` | Carousel | Roast verdict |
| `skills_assessment.png` | Carousel | Skills breakdown |
| `mental-game.png` | Carousel | Mental game stats |
| `top-discs.png` | Carousel | Most used discs |
| `hole-throws-panel.png` | Carousel | Hole-by-hole throws |

---

## Capture Tips

- **Device:** iPhone 15 Pro Max (1290 x 2796 pixels)
- **Mode:** Dark mode ON
- **Status bar:** Keep visible (Apple requires it)
- **Data:** Use real round data, not test/placeholder
- **Time:** Set to 9:41 AM (Apple's classic demo time) or hide
- **Battery:** Full or hide
- **Notifications:** Clear all before capturing

---

## Quick Resize Commands

After capturing full-res screenshots, resize for web:

```bash
cd /Users/joevanderveen/Development/score-sensei/score-sensei-web/assets/screenshots

# Resize v2 images
sips -Z 680 v2/*.png

# Resize new round analysis images
sips -Z 600 skills_assessment.png mental-game.png top-discs.png hole-throws-panel.png
```

---

## Notes

_Use this space to track changes:_

- 2025-03-21: Added v2 folder structure, updated form analysis to v2 images
- 2025-03-21: Added 4 new round analysis screenshots to carousel
- 2025-03-21: Fixed back-knee-annotation.png spelling (was backn-knee)
