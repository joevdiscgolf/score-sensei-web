# Firebase Authentication Setup Guide

Your website now has full authentication support with Google Sign-In and Email/Password login! Follow these steps to configure Firebase for the web app.

## Step 1: Add Web App to Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/project/turbo-disc-golf-v2)
2. Click the gear icon (⚙️) next to "Project Overview"
3. Select "Project settings"
4. Scroll down to "Your apps" section
5. Click the **Web icon** (`</>`) to add a new web app
6. Enter app nickname: **ScoreSensei Web**
7. Check "Also set up Firebase Hosting" (optional)
8. Click "Register app"

## Step 2: Copy Firebase Configuration

After registering, you'll see a configuration object that looks like this:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "turbo-disc-golf-v2.firebaseapp.com",
  projectId: "turbo-disc-golf-v2",
  storageBucket: "turbo-disc-golf-v2.firebasestorage.app",
  messagingSenderId: "866559849247",
  appId: "1:866559849247:web:..."
};
```

## Step 3: Update firebase-config.js

1. Open `/Users/joevanderveen/Development/score-sensei/score-sensei-web/firebase-config.js`
2. Replace the placeholder config at the top of the file with your actual configuration:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_ACTUAL_API_KEY",  // Replace this
  authDomain: "turbo-disc-golf-v2.firebaseapp.com",
  projectId: "turbo-disc-golf-v2",
  storageBucket: "turbo-disc-golf-v2.firebasestorage.app",
  messagingSenderId: "866559849247",
  appId: "YOUR_ACTUAL_APP_ID"  // Replace this
};
```

3. Save the file

## Step 4: Enable Authentication Methods

### Enable Google Sign-In:

1. In Firebase Console, go to **Authentication** → **Sign-in method**
2. Click on **Google** provider
3. Toggle "Enable"
4. Set a public-facing name: **ScoreSensei**
5. Choose a support email
6. Click "Save"

### Enable Email/Password:

1. In the same **Sign-in method** tab
2. Click on **Email/Password** provider
3. Toggle "Enable" for Email/Password (first option)
4. You can optionally enable "Email link (passwordless sign-in)"
5. Click "Save"

## Step 5: Configure Authorized Domains

1. In Firebase Console, go to **Authentication** → **Settings**
2. Click on **Authorized domains** tab
3. Add your domains:
   - `localhost` (for local development - should already be there)
   - Your production domain (e.g., `scoresensei.com`)
   - Your Vercel domain (e.g., `score-sensei-web.vercel.app`)
4. Click "Add domain" for each

## Step 6: Test Authentication

1. Start your local server:
   ```bash
   cd /Users/joevanderveen/Development/score-sensei/score-sensei-web
   python3 -m http.server 8000
   ```

2. Open http://localhost:8000

3. Click "Sign in" in the header

4. Try both authentication methods:
   - **Google Sign-In**: Click "Continue with Google"
   - **Email/Password**: Create an account with the sign-up form

## Verification Checklist

- [ ] Web app added to Firebase project
- [ ] `firebase-config.js` updated with correct API key and App ID
- [ ] Google Sign-In provider enabled
- [ ] Email/Password provider enabled
- [ ] Authorized domains configured (localhost + production domains)
- [ ] Tested Google Sign-In locally
- [ ] Tested Email/Password sign-up locally
- [ ] Tested sign-out functionality

## Features Enabled

✅ **Google Sign-In**: One-click authentication with Google account
✅ **Email/Password**: Traditional email registration and login
✅ **Password Reset**: Users can reset forgotten passwords
✅ **Auth State Persistence**: Users stay logged in across page refreshes
✅ **Protected Routes**: Dashboard page requires authentication
✅ **User Profile**: Display name and photo in header when logged in

## User Flow

### For New Users:
1. Visit homepage → Click "Sign in"
2. Click "Sign up" link
3. Choose Google or Email/Password
4. Redirected to dashboard after successful sign-up

### For Returning Users:
1. Visit homepage → Click "Sign in"
2. Enter credentials (Google or Email/Password)
3. Redirected to dashboard
4. User info shown in header with "Sign out" button

## Security Notes

- **Never commit `firebase-config.js` with real keys to public repositories**
- API keys in Firebase config are safe to expose (they're restricted by domain)
- Consider adding `.env` file for production deployments
- Firebase Security Rules will protect your data

## Shared Users with Mobile App

Since this uses the same Firebase project (`turbo-disc-golf-v2`), users who create accounts on the web can also sign in to your mobile app and vice versa. All authentication is shared across platforms.

## Troubleshooting

### "The specified token is not valid" error:
- Check that you've replaced the placeholder config in `firebase-config.js`
- Verify the API key and App ID are correct

### Google Sign-In popup blocked:
- Allow popups for localhost in browser settings
- Add your domain to authorized domains in Firebase Console

### "auth/unauthorized-domain" error:
- Add your domain to Authorized Domains in Firebase Console
- Wait a few minutes for changes to propagate

### Email link not working:
- Verify Email/Password provider is enabled
- Check spam folder for password reset emails

## Next Steps

After authentication is working:
1. Deploy to Vercel/Netlify
2. Add your production domain to Authorized Domains
3. Test authentication on production
4. Update App Store and Google Play button links when apps are published

Your web app now has the same authentication as your mobile app! 🎉
