/**
 * Firebase Configuration
 * Initializes Firebase app and exports Firestore instance
 */

import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getAnalytics, Analytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase only once
let app: FirebaseApp;
let db: Firestore;
let analytics: Analytics | null = null;

if (typeof window !== 'undefined' && !getApps().length) {
  console.log('🔥 Initializing Firebase...');
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);

  // Initialize Analytics (only in browser)
  try {
    analytics = getAnalytics(app);
    console.log('📊 Firebase Analytics initialized');
  } catch (error) {
    console.warn('⚠️ Firebase Analytics not available:', error);
  }
} else if (getApps().length > 0) {
  app = getApps()[0];
  db = getFirestore(app);
}

export { db, analytics };
export default app;
