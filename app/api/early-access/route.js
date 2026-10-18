import { handleEarlyAccess, createRateLimiter } from '@/lib/earlyAccess.mjs';

export const dynamic = 'force-dynamic';

// One limiter per server instance (see createRateLimiter).
const isLimited = createRateLimiter();

export function POST(request) {
  return handleEarlyAccess(request, { env: process.env, isLimited });
}
