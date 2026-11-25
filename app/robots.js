import { SITE_URL } from '@/lib/seo.mjs';

export const dynamic = 'force-static';

// Everything public is crawlable (search and AI answer engines alike); only the
// API routes and the admin screens are off limits.
export default function robots() {
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/api/', '/admin/'] }],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
