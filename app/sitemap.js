import { sitemapEntries } from '@/lib/blog/seo.mjs';

export const dynamic = 'force-static';
// Refreshed hourly so a scheduled post appears in the sitemap and feed on its date.
export const revalidate = 3600;

export default function sitemap() {
  return sitemapEntries();
}
