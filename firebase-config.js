// Firebase Configuration
// TODO: Get your web config from Firebase Console:
// 1. Go to https://console.firebase.google.com/project/turbo-disc-golf-v2
// 2. Click the gear icon → Project settings
// 3. Scroll down to "Your apps" section
// 4. Click "Add app" → Web (</>) icon
// 5. Register app name: "ScoreSensei Web"
// 6. Copy the firebaseConfig object and replace the config below

const firebaseConfig = {
  apiKey: "AIzaSyBbDlNCOthDT8Q4Y-6Kc0HeWDAb8nO9vT4",
  authDomain: "turbo-disc-golf-v2.firebaseapp.com",
  projectId: "turbo-disc-golf-v2",
  storageBucket: "turbo-disc-golf-v2.firebasestorage.app",
  messagingSenderId: "866559849247",
  appId: "1:866559849247:web:be76d958db896504a9362a",
  measurementId: "G-BD8J2BPQ0X"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firebase Auth
const auth = firebase.auth();

// Configure Google Auth Provider
const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

// Auth state observer
let currentUser = null;

auth.onAuthStateChanged((user) => {
  currentUser = user;
  updateAuthUI(user);
});

function updateAuthUI(user) {
  const loginBtn = document.getElementById('login-btn');
  const userInfo = document.getElementById('user-info');
  const logoutBtn = document.getElementById('logout-btn');

  if (user) {
    // User is signed in
    if (loginBtn) loginBtn.style.display = 'none';
    if (userInfo) {
      userInfo.style.display = 'flex';
      userInfo.innerHTML = `
        <a href="dashboard.html" class="nav-user-email" title="Manage account">${user.email}</a>
      `;
    }
    if (logoutBtn) logoutBtn.style.display = 'block';

    // Redirect to dashboard if on login page
    if (window.location.pathname.includes('login.html')) {
      window.location.href = 'dashboard.html';
    }
  } else {
    // User is signed out
    if (loginBtn) loginBtn.style.display = 'block';
    if (userInfo) userInfo.style.display = 'none';
    if (logoutBtn) logoutBtn.style.display = 'none';

    // Redirect to login if on protected page
    if (window.location.pathname.includes('dashboard.html')) {
      window.location.href = 'login.html';
    }
  }
}

// Sign in with Google
async function signInWithGoogle() {
  try {
    const result = await auth.signInWithPopup(googleProvider);
    console.log('Signed in with Google:', result.user.email);
    return result.user;
  } catch (error) {
    console.error('Google sign-in error:', error);
    throw error;
  }
}

// Sign in with Email/Password
async function signInWithEmail(email, password) {
  try {
    const result = await auth.signInWithEmailAndPassword(email, password);
    console.log('Signed in with email:', result.user.email);
    return result.user;
  } catch (error) {
    console.error('Email sign-in error:', error);
    throw error;
  }
}

// Sign up with Email/Password
async function signUpWithEmail(email, password, displayName) {
  try {
    const result = await auth.createUserWithEmailAndPassword(email, password);

    // Update profile with display name
    if (displayName) {
      await result.user.updateProfile({
        displayName: displayName
      });
    }

    console.log('Signed up with email:', result.user.email);
    return result.user;
  } catch (error) {
    console.error('Email sign-up error:', error);
    throw error;
  }
}

// Sign out
async function signOut() {
  try {
    await auth.signOut();
    console.log('Signed out successfully');
  } catch (error) {
    console.error('Sign-out error:', error);
    throw error;
  }
}

// Password reset
async function sendPasswordReset(email) {
  try {
    await auth.sendPasswordResetEmail(email);
    console.log('Password reset email sent to:', email);
  } catch (error) {
    console.error('Password reset error:', error);
    throw error;
  }
}

// Get current user
function getCurrentUser() {
  return currentUser;
}

// Check if user is authenticated
function isAuthenticated() {
  return currentUser !== null;
}
