# Score Sensei Web - Claude Code Guidelines

## Landing Page

**IMPORTANT**: The landing page is the static `index.html` file at the root, NOT the React app in `app/`.

- Always deploy the static HTML site (firebase.json `"public": "."`)
- The React app in `app/` is for authenticated features (dashboard, etc.)
- Do not change firebase.json to deploy the React app as the landing page

## Deployment

```bash
firebase deploy --only hosting
```

This deploys the static HTML files from the root directory.

## Structure

- `index.html` - Landing page (static HTML)
- `login.html`, `signup.html` - Auth pages (static HTML)
- `app/` - React app for authenticated features
- `firebase.json` - Hosting config (public: ".")
