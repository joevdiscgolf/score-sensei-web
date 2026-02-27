# ScoreSensei Screenshot Checklist

Capture all screenshots on iPhone 15 Pro Max (or latest) in dark mode.
Save images as PNG in this folder with the exact filenames below.

---

## Website Screenshots

### Hero Section
- [ ] `hero-main.png` (280x600)
  - **What:** Form analysis results with skeleton overlay on video
  - **Why:** Most visually impressive, shows AI in action
  - **Tips:** Pick a frame where skeleton lines are clearly visible

- [ ] `hero-secondary.png` (280x600)
  - **What:** Round summary or stats dashboard
  - **Why:** Shows the data/analytics side of the app

### Feature Sections
- [ ] `form-analysis.png` (320x680)
  - **What:** Mid-analysis view showing skeleton tracking
  - **Why:** Demonstrates the computer vision AI
  - **Tips:** Capture during playback with skeleton animating

- [ ] `the-judge.png` (280x600)
  - **What:** A savage Judge verdict
  - **Why:** This is memorable and shareable
  - **Tips:** Pick one that's brutal but funny, not mean

### Carousel Screenshots
- [ ] `screen-1.png` (280x600)
  - **What:** Voice scoring in action (recording state)
  - **Tips:** Show the mic UI, maybe mid-hole

- [ ] `screen-2.png` (280x600)
  - **What:** C1X putting stats chart
  - **Tips:** Use a round with varied putting data

- [ ] `screen-3.png` (280x600)
  - **What:** Round story AI narrative
  - **Tips:** Pick a story with dramatic moments

- [ ] `screen-4.png` (280x600)
  - **What:** Shot patterns visualization
  - **Tips:** Show clear tendencies in the data

- [ ] `screen-5.png` (280x600)
  - **What:** Form checkpoint comparison (you vs pro)
  - **Tips:** Side-by-side or overlay view

### Download CTA
- [ ] `download-cta.png` (280x600)
  - **What:** Clean home screen or first onboarding screen
  - **Why:** Shows the entry point to the app

---

## App Store Screenshots (in priority order)

Apple allows 10, Google allows 8. These are the most important:

1. [ ] **Form Analysis Results**
   - Skeleton overlay with scores/metrics visible
   - This is your biggest differentiator

2. [ ] **The Judge Verdict**
   - Brutal but funny feedback
   - Makes people laugh and want to try it

3. [ ] **Voice Scoring Active**
   - Mic UI during round recording
   - Emphasizes hands-free unique feature

4. [ ] **Round Story**
   - AI-generated narrative text
   - "See the story behind every throw"

5. [ ] **C1X Putting Stats**
   - Chart showing percentages by distance
   - Data visualization appeal

6. [ ] **Pro Comparison**
   - User vs pro form overlay or side-by-side
   - Shows the coaching value

7. [ ] **Shot Patterns**
   - Spray chart or tendency visualization
   - Appeals to data nerds

8. [ ] **Checkpoint Breakdown**
   - Frame-by-frame form positions
   - Shows depth of analysis

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
# Resize all to web dimensions (maintains aspect ratio)
cd /Users/joevanderveen/Development/score-sensei/score-sensei-web/assets/screenshots

# For hero/carousel (280px wide)
sips -Z 600 hero-main.png hero-secondary.png screen-*.png the-judge.png download-cta.png

# For form analysis (320px wide)
sips -Z 680 form-analysis.png
```

---

## File Checklist

```
assets/screenshots/
├── SCREENSHOT_CHECKLIST.md  (this file)
├── hero-main.png            [ ]
├── hero-secondary.png       [ ]
├── form-analysis.png        [ ]
├── the-judge.png            [ ]
├── screen-1.png             [ ]
├── screen-2.png             [ ]
├── screen-3.png             [ ]
├── screen-4.png             [ ]
├── screen-5.png             [ ]
└── download-cta.png         [ ]
```

---

## Notes

_Use this space to track which screenshots you've captured:_

-
-
-
