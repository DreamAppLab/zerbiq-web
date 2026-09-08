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

export const dynamic = 'force-dynamic';

export async function GET(request) {
  // Protect cron endpoint — Vercel sets this header automatically for cron jobs.
  // Also allow requests with the correct secret for manual triggering.
  const authHeader = request.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;

  const isVercelCron = request.headers.get('x-vercel-cron') === '1';
  const hasSecret = cronSecret && authHeader === `Bearer ${cronSecret}`;

  if (!isVercelCron && !hasSecret) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
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
