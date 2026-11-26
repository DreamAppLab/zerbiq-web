// Who may run the hourly /api/publish-scheduled cron. Vercel sends
// "Authorization: Bearer <CRON_SECRET>" on cron invocations when the CRON_SECRET
// environment variable is set, so that bearer secret is the ONLY proof accepted.
// The x-vercel-cron header is never trusted: any caller can send it.
// Fails closed: with CRON_SECRET unset, every request is refused.
import { timingSafeEqual } from 'node:crypto';

// Constant-time string comparison that never throws on length differences.
export function safeEqual(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string') return false;
  const left = Buffer.from(a, 'utf8');
  const right = Buffer.from(b, 'utf8');
  if (left.length !== right.length) {
    // Still do one comparison of equal-length buffers so the time spent does not
    // depend on where the strings differ.
    timingSafeEqual(right, right);
    return false;
  }
  return timingSafeEqual(left, right);
}

// headers: anything with get(name) (a Request's Headers). secret: process.env.CRON_SECRET.
export function isAuthorizedCron(headers, secret) {
  if (typeof secret !== 'string' || secret.length === 0) return false;
  const auth = headers?.get?.('authorization');
  if (typeof auth !== 'string') return false;
  return safeEqual(auth, `Bearer ${secret}`);
}
