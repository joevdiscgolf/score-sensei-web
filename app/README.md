# Form Analysis React App

This is the React application for viewing form analysis history and details, built with Vite, React Router, and Firebase.

## Features

- **Form Analysis History**: Browse all your form analyses with infinite scroll
- **Analysis Detail View**: View detailed analysis with tabs for Video, Analysis, and Insights
- **Responsive Design**: Works on mobile, tablet, and desktop
- **Real-time Data**: Fetches data from Firebase Firestore
- **Optimistic Updates**: Instant UI feedback with rollback on errors

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Architecture

### File Structure
```
app/
├── src/
│   ├── components/      # Reusable UI components
│   ├── hooks/           # Custom React hooks
│   ├── routes/          # Page components
│   ├── services/        # Firebase and API services
│   ├── styles/          # Global CSS
│   ├── types/           # TypeScript type definitions
│   ├── utils/           # Utility functions
│   ├── App.tsx          # Main app component with routing
│   └── main.tsx         # Entry point
├── dist/                # Build output (in parent directory)
└── vite.config.ts       # Vite configuration
```

### Key Technologies

- **React 18**: UI library
- **TypeScript**: Type safety
- **React Router**: Client-side routing
- **Firebase SDK**: Firestore database and authentication
- **date-fns**: Date formatting
- **Vite**: Build tool and dev server

### Routes

- `/` - Form analysis history (list view)
- `/detail/:id` - Form analysis detail (tabs: Video, Analysis, Insights)

## Deployment

The app is configured to build to `../dist/` directory and is served at `/app/` path.

Vercel configuration handles SPA routing via `vercel.json`.

## Design System

The app uses a semantic color system that matches the Flutter mobile app:
- **Red**: 0-25% (poor)
- **Gold**: 25-50% (below average)
- **Teal**: 50-75% (good)
- **Green**: 75-100% (excellent)

All colors, spacing, and design patterns are consistent with the mobile app for a unified experience.
