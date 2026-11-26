import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { firebaseConfig, firebaseConfigured } from '@/lib/firebaseConfig.mjs';

// When the Firebase settings are missing or malformed, nothing is started: app and db
// are null, and every caller skips Firestore instead of sending requests Google rejects.
const app = firebaseConfigured
  ? getApps().length === 0
    ? initializeApp(firebaseConfig)
    : getApps()[0]
  : null;

export const db = app ? getFirestore(app) : null;
export { app, firebaseConfigured };
