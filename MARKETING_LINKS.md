# Marketing links cheat sheet

Which ScoreSensei URL to paste where. One rule: **every placement gets its own link** so the dashboard can tell them apart. Technical details live in `ANALYTICS_TRACKING.md`.

## The links

| Where you're putting it | Use this | Why |
|---|---|---|
| Instagram bio | `scoresensei.app/ig` | Clean, tappable, attributes to IG |
| YouTube description (generic) | `scoresensei.app/yt` | Default for any video |
| YouTube description (big video push) | `https://scoresensei.app/?utm_source=youtube&utm_medium=description&utm_campaign=<video_slug>` | Per-video tracking (e.g. `mcbeth_video`) |
| Pinned comment | same as description but `utm_medium=pinned_comment` | Splits description vs comment clicks |
| Trent / Coach T (bios, blurbs, descriptions) | `scoresensei.app/coacht` | His visits, separate from his COACHT purchase code |
| Said out loud / thumbnails / business cards | `scoresensei.app` | Easiest to say and remember; shows as direct traffic (acceptable) |

## Style guidance

- Short paths (`/ig`, `/yt`) look intentional, not messy — this is the standard pattern (nike.com/app etc.). Ship them without worry.
- The plain domain is only preferred where someone must *remember or type* it (spoken, printed).
- Never paste a raw `?utm_...` URL where the URL itself is visible and ugly; that's what the vanity paths are for.

## Adding a link for a new placement

Say the word (e.g. "add /tiktok") or see "Adding a new vanity link" in `ANALYTICS_TRACKING.md` — it's a 3-line `firebase.json` edit + `firebase deploy --only hosting`. Never repurpose an existing path (browsers cache the redirect permanently); add a new one.

## Where results show up

Dashboard → Traffic sources table (source / campaign / users):
`https://us-central1-turbo-disc-golf-v2.cloudfunctions.net/siteAnalyticsDashboard?apiKey=<ADMIN_API_KEY>` (key must be URL-encoded — see `ANALYTICS_TRACKING.md`).

Untagged clicks still get rough attribution from referrer headers (`youtube.com / referral`), but in-app browsers (especially Instagram) often strip referrers into `(direct)`. Tagged links are the ground truth.
