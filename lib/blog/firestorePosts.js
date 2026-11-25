// Posts published through the admin screen live in Firestore. These readers never
// throw and never hang a build: on any failure (or after a short timeout) they
// return nothing, and the static posts carry the blog on their own.
import { collection, query, where, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

const TIMEOUT_MS = 4000;

function withTimeout(promise) {
  return Promise.race([
    promise,
    new Promise((resolve) => setTimeout(() => resolve(null), TIMEOUT_MS)),
  ]);
}

function toIso(ts) {
  if (!ts) return '';
  const d = ts.toDate ? ts.toDate() : new Date(ts);
  return Number.isNaN(d.getTime()) ? '' : d.toISOString().slice(0, 10);
}

export async function getFirestorePosts() {
  try {
    const q = query(
      collection(db, 'posts'),
      where('status', '==', 'published'),
      orderBy('publishedAt', 'desc'),
    );
    const snap = await withTimeout(getDocs(q));
    if (!snap) return [];
    return snap.docs.map((d) => {
      const data = d.data();
      return { id: d.id, ...data, publishedAt: toIso(data.publishedAt), source: 'firestore' };
    });
  } catch (err) {
    console.error('Failed to load posts:', err);
    return [];
  }
}

export async function getFirestorePostBySlug(slug) {
  try {
    const q = query(collection(db, 'posts'), where('slug', '==', slug), limit(1));
    const snap = await withTimeout(getDocs(q));
    if (!snap || snap.empty) return null;
    const d = snap.docs[0];
    const data = d.data();
    return { id: d.id, ...data, publishedAt: toIso(data.publishedAt), source: 'firestore' };
  } catch (err) {
    console.error('Failed to fetch post:', err);
    return null;
  }
}
