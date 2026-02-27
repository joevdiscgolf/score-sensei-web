import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBbDlNCOthDT8Q4Y-6Kc0HeWDAb8nO9vT4",
  authDomain: "turbo-disc-golf-v2.firebaseapp.com",
  projectId: "turbo-disc-golf-v2",
  storageBucket: "turbo-disc-golf-v2.firebasestorage.app",
  messagingSenderId: "866559849247",
  appId: "1:866559849247:web:be76d958db896504a9362a",
  measurementId: "G-BD8J2BPQ0X"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
