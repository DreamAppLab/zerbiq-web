// Firebase web settings for the blog admin and the admin-published (Firestore) posts.
//
// Every value is trimmed, and blank values are dropped. Firestore is "configured" only
// when there is an API key and a well-formed project ID. Without this check a missing
// NEXT_PUBLIC_FIREBASE_PROJECT_ID still lets the SDK start (it only checks that the
// projectId key exists), it then asks for the database "projects//databases/(default)"
// and Google rejects every request with "3 INVALID_ARGUMENT: Invalid resource field
// value in the request".

// Google Cloud project IDs: 6 to 30 characters, lowercase letters, digits and hyphens,
// starting with a letter and not ending with a hyphen.
const PROJECT_ID = /^[a-z][a-z0-9-]{4,28}[a-z0-9]$/;

const KEYS = ['apiKey', 'authDomain', 'projectId', 'storageBucket', 'messagingSenderId', 'appId'];

export function readFirebaseConfig(values = {}) {
  const config = {};
  for (const key of KEYS) {
    const raw = values[key];
    const value = typeof raw === 'string' ? raw.trim() : '';
    if (value) config[key] = value;
  }
  const configured = Boolean(config.apiKey && config.projectId && PROJECT_ID.test(config.projectId));
  return { config, configured };
}

// Each process.env reference is written out in full so Next.js can inline the
// NEXT_PUBLIC_ values into the browser bundle.
const { config, configured } = readFirebaseConfig({
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
});

export const firebaseConfig = config;
export const firebaseConfigured = configured;
