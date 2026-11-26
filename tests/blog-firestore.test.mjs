// The /blog Firestore error: with the NEXT_PUBLIC_FIREBASE_* settings missing, the SDK
// still started and asked Google for "projects//databases/(default)", which failed on
// every /blog render with "3 INVALID_ARGUMENT: Invalid resource field value in the
// request". These tests run the REAL config reader and the REAL post readers.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFirebaseConfig } from '../lib/firebaseConfig.mjs';
import { createFirestoreReaders, toIso } from '../lib/blog/firestoreReaders.mjs';
import { livePosts, POSTS, isLive } from '../lib/blog/index.mjs';

const GOOD = {
  apiKey: 'test-api-key',
  authDomain: 'zerbiq-test.firebaseapp.com',
  projectId: 'zerbiq-test',
  storageBucket: 'zerbiq-test.appspot.com',
  messagingSenderId: '1234',
  appId: '1:1234:web:abcd',
};

const silent = () => {
  const calls = { warn: [], error: [] };
  return { calls, logger: { warn: (...a) => calls.warn.push(a), error: (...a) => calls.error.push(a) } };
};

// Fake firebase/firestore functions that record what the readers ask for.
function fakeFs(result) {
  const seen = [];
  return {
    seen,
    fs: {
      collection: (db, name) => ({ collection: name }),
      query: (...parts) => ({ query: parts }),
      where: (field, op, value) => ({ where: [field, op, value] }),
      orderBy: (field, dir) => ({ orderBy: [field, dir] }),
      limit: (n) => ({ limit: n }),
      getDocsFromServer: (q) => {
        seen.push(q);
        return typeof result === 'function' ? result(q) : Promise.resolve(result);
      },
    },
  };
}

const doc = (id, data) => ({ id, data: () => data });

test('missing Firebase settings (the production state) mean "not configured"', () => {
  const env = Object.fromEntries(Object.keys(GOOD).map((k) => [k, undefined]));
  const { config, configured } = readFirebaseConfig(env);
  assert.equal(configured, false);
  assert.equal(Object.hasOwn(config, 'projectId'), false, 'no projectId key, so nothing can build projects//databases');
});

test('blank, padded or malformed project IDs are handled', () => {
  assert.equal(readFirebaseConfig({ ...GOOD, projectId: '' }).configured, false);
  assert.equal(readFirebaseConfig({ ...GOOD, projectId: '   ' }).configured, false);
  assert.equal(readFirebaseConfig({ ...GOOD, projectId: 'Bad Project' }).configured, false);
  assert.equal(readFirebaseConfig({ ...GOOD, projectId: 'undefined"' }).configured, false);
  assert.equal(readFirebaseConfig({ ...GOOD, apiKey: undefined }).configured, false);
  const padded = readFirebaseConfig({ ...GOOD, projectId: 'zerbiq-test\n' });
  assert.equal(padded.configured, true);
  assert.equal(padded.config.projectId, 'zerbiq-test', 'a trailing newline from a pasted value is trimmed');
  assert.deepEqual(readFirebaseConfig(GOOD).config, GOOD);
});

test('with no db, the readers make no request and return nothing', async () => {
  const { fs, seen } = fakeFs({ docs: [] });
  const { calls, logger } = silent();
  const r = createFirestoreReaders({ db: null, fs, logger });
  assert.deepEqual(await r.getFirestorePosts(), []);
  assert.equal(await r.getFirestorePostBySlug('some-post'), null);
  assert.equal(seen.length, 0);
  assert.equal(calls.warn.length, 1, 'one warning per process, not one per request');
  assert.equal(calls.error.length, 0);
});

test('a Firestore failure never breaks /blog: readers return nothing', async () => {
  const err = Object.assign(new Error('3 INVALID_ARGUMENT: Invalid resource field value in the request.'), {
    code: 'invalid-argument',
  });
  const { fs } = fakeFs(() => Promise.reject(err));
  const { calls, logger } = silent();
  const r = createFirestoreReaders({ db: {}, fs, logger });
  assert.deepEqual(await r.getFirestorePosts(), []);
  assert.equal(await r.getFirestorePostBySlug('x'), null);
  assert.equal(calls.error.length, 2);
});

test('a Firestore request that never answers times out instead of hanging', async () => {
  const { fs } = fakeFs(() => new Promise(() => {}));
  const r = createFirestoreReaders({ db: {}, fs, logger: silent().logger, timeoutMs: 20 });
  assert.deepEqual(await r.getFirestorePosts(), []);
  assert.equal(await r.getFirestorePostBySlug('x'), null);
});

test('the posts query uses only defined values and reads from the server', async () => {
  const ts = { toDate: () => new Date('2026-11-20T15:00:00Z') };
  const { fs, seen } = fakeFs({ docs: [doc('a1', { slug: 'admin-post', title: 'T', publishedAt: ts })] });
  const r = createFirestoreReaders({ db: {}, fs, logger: silent().logger });
  const posts = await r.getFirestorePosts();
  assert.deepEqual(posts, [
    { id: 'a1', slug: 'admin-post', title: 'T', publishedAt: '2026-11-20', source: 'firestore' },
  ]);
  const parts = JSON.stringify(seen[0]);
  assert.ok(!parts.includes('null'), 'no undefined/null value reaches the query');
  assert.match(parts, /"status","==","published"/);
});

test('a missing or empty slug never becomes a query', async () => {
  const { fs, seen } = fakeFs({ empty: true, docs: [] });
  const r = createFirestoreReaders({ db: {}, fs, logger: silent().logger });
  assert.equal(await r.getFirestorePostBySlug(undefined), null);
  assert.equal(await r.getFirestorePostBySlug(''), null);
  assert.equal(seen.length, 0);
});

test('toIso handles Timestamps, strings and bad values', () => {
  assert.equal(toIso({ toDate: () => new Date('2026-01-02T00:00:00Z') }), '2026-01-02');
  assert.equal(toIso('2026-03-04T10:00:00Z'), '2026-03-04');
  assert.equal(toIso('not a date'), '');
  assert.equal(toIso(undefined), '');
});

test('file-based posts still carry the blog, and scheduled posts stay hidden', () => {
  assert.ok(livePosts().length > 0);
  for (const p of POSTS.filter((p) => !isLive(p))) {
    assert.ok(!livePosts().includes(p), `${p.slug} is scheduled and must not be listed`);
  }
});
