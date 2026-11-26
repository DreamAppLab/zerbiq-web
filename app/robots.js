import { SITE_URL } from '@/lib/seo.mjs';

export const dynamic = 'force-static';

// Everything is crawlable (search and AI answer engines alike). The site has no
// API routes or admin screens, so nothing is disallowed.
export default function robots() {
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
