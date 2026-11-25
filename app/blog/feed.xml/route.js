import { atomFeed } from '@/lib/blog/seo.mjs';

export const dynamic = 'force-static';

export function GET() {
  return new Response(atomFeed(), {
    headers: { 'Content-Type': 'application/atom+xml; charset=utf-8' },
  });
}
