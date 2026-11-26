import { NextResponse } from 'next/server';
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { isAuthorizedCron } from '@/lib/blog/cronAuth.mjs';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  // Only Vercel's cron (or a manual call) carrying "Authorization: Bearer <CRON_SECRET>"
  // may run this. The x-vercel-cron header is spoofable and is never accepted; with
  // CRON_SECRET unset every request is refused.
  if (!isAuthorizedCron(request.headers, process.env.CRON_SECRET)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!db) {
    return NextResponse.json({ error: 'Firestore is not configured' }, { status: 503 });
  }

  try {
    const now = Timestamp.now();

    const q = query(
      collection(db, 'posts'),
      where('status', '==', 'scheduled'),
      where('scheduledFor', '<=', now),
    );

    const snap = await getDocs(q);

    if (snap.empty) {
      return NextResponse.json({ ok: true, published: 0 });
    }

    const updates = snap.docs.map((d) =>
      updateDoc(doc(db, 'posts', d.id), {
        status: 'published',
        publishedAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      }),
    );

    await Promise.all(updates);

    console.log(`[publish-scheduled] Published ${snap.size} post(s)`);
    return NextResponse.json({ ok: true, published: snap.size });
  } catch (err) {
    console.error('[publish-scheduled] Error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
