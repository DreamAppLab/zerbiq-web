// Readers for posts published through the admin screen (Firestore). They never throw
// and never hang a build: on any failure (or after a short timeout) they return
// nothing, and the file-based posts carry the blog on their own.
//
// `db` is null when Firebase is not configured (see lib/firebaseConfig.mjs); then no
// request is made at all. `fs` holds the firebase/firestore functions, passed in so
// tests can run the real readers without a network.

export const TIMEOUT_MS = 4000;

function withTimeout(promise, ms) {
  let timer;
  const timeout = new Promise((resolve) => {
    timer = setTimeout(() => resolve(null), ms);
  });
  return Promise.race([promise, timeout]).finally(() => clearTimeout(timer));
}

export function toIso(ts) {
  if (!ts) return '';
  const d = ts.toDate ? ts.toDate() : new Date(ts);
  return Number.isNaN(d.getTime()) ? '' : d.toISOString().slice(0, 10);
}

function toPost(d) {
  const data = d.data();
  return { id: d.id, ...data, publishedAt: toIso(data.publishedAt), source: 'firestore' };
}

export function createFirestoreReaders({ db, fs, logger = console, timeoutMs = TIMEOUT_MS }) {
  let warnedMissing = false;
  function skip() {
    if (!warnedMissing) {
      warnedMissing = true;
      logger.warn('Firestore is not configured (NEXT_PUBLIC_FIREBASE_* settings missing or malformed); showing file-based blog posts only.');
    }
  }

  async function getFirestorePosts() {
    if (!db) {
      skip();
      return [];
    }
    try {
      const q = fs.query(
        fs.collection(db, 'posts'),
        fs.where('status', '==', 'published'),
        fs.orderBy('publishedAt', 'desc'),
      );
      // From the server only: a failed connection is an error here, never an empty
      // cache that looks like "no posts".
      const snap = await withTimeout(fs.getDocsFromServer(q), timeoutMs);
      if (!snap) return [];
      return snap.docs.map(toPost);
    } catch (err) {
      logger.error('Failed to load posts:', err);
      return [];
    }
  }

  async function getFirestorePostBySlug(slug) {
    if (typeof slug !== 'string' || !slug) return null;
    if (!db) {
      skip();
      return null;
    }
    try {
      const q = fs.query(fs.collection(db, 'posts'), fs.where('slug', '==', slug), fs.limit(1));
      const snap = await withTimeout(fs.getDocsFromServer(q), timeoutMs);
      if (!snap || snap.empty) return null;
      return toPost(snap.docs[0]);
    } catch (err) {
      logger.error('Failed to fetch post:', err);
      return null;
    }
  }

  return { getFirestorePosts, getFirestorePostBySlug };
}
