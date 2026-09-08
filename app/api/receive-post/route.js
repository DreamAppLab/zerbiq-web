import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { collection, addDoc, query, where, getDocs, updateDoc, doc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export const dynamic = 'force-dynamic';

// ── Signature validation ────────────────────────────────────────────────────

function verifySignature(payload, signatureHeader) {
  const secret = process.env.MASSBLOGGER_WEBHOOK_SECRET;
  if (!secret) {
    console.warn('MASSBLOGGER_WEBHOOK_SECRET not set — skipping signature check');
    return true;
  }
  const expected = `sha256=${crypto.createHmac('sha256', secret).update(payload).digest('hex')}`;
  try {
    return crypto.timingSafeEqual(Buffer.from(signatureHeader ?? ''), Buffer.from(expected));
  } catch {
    return false;
  }
}

// ── Helpers ─────────────────────────────────────────────────────────────────

function slugify(text = '') {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

async function findPostBySlug(slug) {
  const q = query(collection(db, 'posts'), where('slug', '==', slug));
  const snap = await getDocs(q);
  if (snap.empty) return null;
  return { id: snap.docs[0].id, ...snap.docs[0].data() };
}

// ── Handler ──────────────────────────────────────────────────────────────────

export async function POST(request) {
  const rawBody = await request.text();
  const signature = request.headers.get('x-massblogger-signature') || '';

  if (!verifySignature(rawBody, signature)) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
  }

  let payload;
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const { event, post } = payload;

  if (!['post.created', 'post.updated'].includes(event)) {
    return NextResponse.json({ ok: true, ignored: true });
  }

  if (!post) {
    return NextResponse.json({ error: 'Missing post data' }, { status: 400 });
  }

  const slug = post.slug || slugify(post.title || '');
  const tagsArray = Array.isArray(post.tags)
    ? post.tags
    : typeof post.tags === 'string'
    ? post.tags.split(',').map((t) => t.trim()).filter(Boolean)
    : [];

  const postData = {
    title: post.title || '',
    slug,
    body: post.body || post.content || '',
    excerpt: post.excerpt || '',
    author: post.author || '',
    category: post.category || '',
    tags: tagsArray,
    featuredImage: post.featuredImage || post.featured_image || '',
    metaTitle: post.metaTitle || post.meta_title || '',
    metaDescription: post.metaDescription || post.meta_description || '',
    status: 'draft',
    source: 'massblogger',
    updatedAt: serverTimestamp(),
  };

  try {
    if (event === 'post.updated') {
      const existing = await findPostBySlug(slug);
      if (existing) {
        await updateDoc(doc(db, 'posts', existing.id), postData);
        return NextResponse.json({ ok: true, action: 'updated', id: existing.id });
      }
    }

    // Create (for post.created, or post.updated if not found)
    postData.createdAt = serverTimestamp();
    const ref = await addDoc(collection(db, 'posts'), postData);
    return NextResponse.json({ ok: true, action: 'created', id: ref.id });
  } catch (err) {
    console.error('Firestore error:', err);
    return NextResponse.json({ error: 'Firestore write failed', detail: err.message }, { status: 500 });
  }
}
