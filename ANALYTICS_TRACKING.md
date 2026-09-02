# Website analytics & link attribution

How scoresensei.app traffic is tracked, end to end. Set up 2026-09-02.

## Overview

```
Visitor taps a link (clean vanity URL or UTM URL)
  → Firebase Hosting 301-redirects vanity paths, attaching UTM params
  → GA4 snippet on every page records the visit + source
  → Store button taps fire app_store_click / play_store_click events
  → siteAnalyticsDashboard renders it all (visitors, CTR, sources, live view)
```

## GA4 tracking

- Property `508011404`, web stream measurement ID `G-BD8J2BPQ0X` (same Firebase project: turbo-disc-golf-v2).
- The gtag snippet is in the `<head>` of all 7 public pages: `index.html`, `login.html`, `signup.html`, `account.html`, `privacy.html`, `terms.html`, `support/index.html`.
- A delegated click listener fires custom events on store links:
  - `app_store_click` — any `apps.apple.com` link
  - `play_store_click` — any `play.google.com` link
- Unique visitors, sessions, page views, geography etc. are automatic GA4 behavior.
- View raw data: [analytics.google.com](https://analytics.google.com) → ScoreSensei property. Realtime tab is instant; standard reports lag a few hours.

## Dashboard

Custom Cloud Function (in `score-sensei-cloud-functions`, `functions/src/http/admin/site_analytics_dashboard.ts`):

```
https://us-central1-turbo-disc-golf-v2.cloudfunctions.net/siteAnalyticsDashboard?apiKey=<ADMIN_API_KEY>
```

- Key lives in Secret Manager: `gcloud secrets versions access latest --secret=ADMIN_API_KEY --project=turbo-disc-golf-v2`
- **The key must be URL-encoded in the browser** (`+` → `%2B`, `=` → `%3D`) or the function returns 403.
- Ranges: Today (hourly, auto-refreshes every 60s), 7 / 28 / 90 days. Realtime per-minute chart always shown.
- The functions service account (`866559849247-compute@developer.gserviceaccount.com`) has GA4 property Viewer access, granted manually in GA4 Admin → Property access management. If the dashboard ever returns a GA4 403, re-check that grant.

## Vanity links (clean attribution URLs)

Short paths that 301-redirect to `/` with UTM params attached — visitors see a clean URL, GA4 gets full attribution. Defined in `firebase.json` → `hosting.redirects`.

| Link | Placement | GA4 source / campaign |
|---|---|---|
| `scoresensei.app/ig` | Instagram bio | instagram / ig_bio |
| `scoresensei.app/yt` | YouTube descriptions, pinned comments | youtube / yt_description |
| `scoresensei.app/coacht` | Coach T (Trent) blurbs and bios | coacht / coacht |

### Adding a new vanity link

1. Add an entry to `firebase.json` redirects (keep it above the `/dashboard` entries):
   ```json
   {
     "source": "/tiktok",
     "destination": "/?utm_source=tiktok&utm_medium=bio&utm_campaign=tiktok_bio",
     "type": 301
   }
   ```
2. Deploy: `firebase deploy --only hosting` (from this repo's root).
3. Verify: `curl -s -o /dev/null -w "%{redirect_url}\n" https://scoresensei.app/tiktok`

Caveat: browsers cache 301s, so never *repurpose* an existing path — add a new one instead.

### Per-campaign UTM links

For granularity beyond a placement (e.g. one specific video), use a full UTM URL with a unique campaign:

```
https://scoresensei.app/?utm_source=youtube&utm_medium=description&utm_campaign=mcbeth_video
```

Convention: `utm_source` = platform or partner (`youtube`, `instagram`, `coacht`), `utm_medium` = placement type (`description`, `bio`, `pinned_comment`, `partner`), `utm_campaign` = specific push (`mcbeth_video`, `ig_bio`).

## Attribution vs the COACHT code

Two separate signals for partner traffic — both matter:
- **Link** (`/coacht` vanity URL) → site visits attributed in GA4
- **In-app code** (`COACHT`) → purchases attributed for payouts (RevenueCat `$campaign` + Firestore, see the creator program docs in `score-sensei-backend/docs/`)
