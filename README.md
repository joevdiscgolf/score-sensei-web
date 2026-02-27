# ScoreSensei Web App

A unified React application for ScoreSensei with authentication and form analysis features.

## Features

- **Landing Page**: Public homepage with feature showcase
- **Authentication**: Google Sign-In and Email/Password authentication
- **Dashboard**: User dashboard with profile and app download links
- **Form Analysis**: Browse and view detailed form analysis with video, checkpoint breakdowns, and insights
- **Protected Routes**: All user-specific features require authentication

## Tech Stack

- **React 18** with TypeScript
- **React Router** for client-side routing
- **Firebase** for authentication and Firestore database
- **Vite** for build tooling
- **date-fns** for date formatting

## Development

```bash
# Navigate to the app directory
cd app

# Install dependencies
npm install

# Start development server (runs on http://localhost:5173)
npm run dev

# Build for production
npm run build
```

## Project Structure

```
score-sensei-web/
├── app/                    # React application
│   ├── src/
│   │   ├── components/     # Reusable components (AnalysisCard, Badges, etc.)
│   │   ├── contexts/       # React contexts (AuthContext)
│   │   ├── hooks/          # Custom hooks (useFormAnalyses, useInfiniteScroll)
│   │   ├── routes/         # Page components (Landing, Login, Dashboard, etc.)
│   │   ├── services/       # API services (Firebase, Firestore)
│   │   ├── styles/         # CSS files
│   │   ├── types/          # TypeScript type definitions
│   │   ├── utils/          # Utility functions (colors, dates)
│   │   ├── App.tsx         # Main app with routing
│   │   └── main.tsx        # Entry point
│   ├── public/             # Static assets (images, CSS)
│   └── dist/               # Build output
├── assets/                 # Original assets (copied to public/)
├── styles.css              # Landing page styles (copied to public/)
├── auth-styles.css         # Auth page styles (copied to public/)
└── vercel.json             # Vercel deployment config
```

## Routes

### Public Routes
- `/` - Landing page
- `/login` - Sign in page
- `/signup` - Create account page

### Protected Routes (Require Authentication)
- `/dashboard` - User dashboard
- `/form-analysis` - Form analysis history (list view)
- `/form-analysis/:id` - Form analysis detail (video, checkpoints, insights)

## Authentication Flow

1. User visits landing page
2. Clicks "Sign in" → redirected to `/login`
3. Signs in with Google or Email/Password
4. Redirected to `/dashboard`
5. Can navigate to Form Analysis from dashboard
6. All protected routes check for authentication
7. Unauthenticated users are redirected to `/login`

## Deployment

The app is configured for Vercel deployment with SPA routing:

```bash
# Build the app
cd app
npm run build

# The dist/ folder contains the production build
# Vercel will serve it with proper SPA routing via vercel.json
```

## Environment Variables

Firebase configuration is hardcoded in `src/services/firebase.ts`. For production, consider using environment variables:

```
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-auth-domain
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-storage-bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
```

## Design System

The app uses a consistent design system matching the mobile Flutter app:

- **Semantic Colors**: Red → Gold → Teal → Green gradient based on scores
- **Fonts**: Exo 2 for headings, Inter for body text
- **Animations**: Smooth transitions, shimmer loading, animated backgrounds
- **Responsive**: Works on mobile, tablet, and desktop

## Testing Locally

To test with the local server (previously on port 8000):

```bash
cd app
npm run dev
```

Visit `http://localhost:5173` in your browser.

The app will connect to Firebase for authentication and Firestore for data.

## Migration from HTML

This React app replaces the previous HTML files:
- `index.html` → `Landing.tsx`
- `login.html` → `Login.tsx`
- `signup.html` → `Signup.tsx`
- `dashboard.html` → `Dashboard.tsx`

The Form Analysis feature (previously at `/app/`) is now integrated at `/form-analysis`.
