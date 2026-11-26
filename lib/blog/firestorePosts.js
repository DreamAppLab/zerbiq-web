// Posts published through the admin screen live in Firestore. See firestoreReaders.mjs:
// these readers never throw, never hang a build, and make no request at all when
// Firebase is not configured.
import { collection, query, where, orderBy, limit, getDocsFromServer } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { createFirestoreReaders } from '@/lib/blog/firestoreReaders.mjs';

const readers = createFirestoreReaders({
  db,
  fs: { collection, query, where, orderBy, limit, getDocsFromServer },
});

export const { getFirestorePosts, getFirestorePostBySlug } = readers;
