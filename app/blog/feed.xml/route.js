import { atomFeed } from '@/lib/blog/seo.mjs';

export const dynamic = 'force-static';
// Refreshed hourly so a scheduled post appears in the sitemap and feed on its date.
export const revalidate = 3600;

export function GET() {
  return new Response(atomFeed(), {
    headers: { 'Content-Type': 'application/atom+xml; charset=utf-8' },
  });
}
