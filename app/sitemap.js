import { sitemapEntries } from '@/lib/blog/seo.mjs';

export const dynamic = 'force-static';

export default function sitemap() {
  return sitemapEntries();
}
