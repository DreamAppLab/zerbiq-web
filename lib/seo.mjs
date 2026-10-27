// ─────────────────────────────────────────────────────────────────────────────
// lib/seo.mjs — per-page metadata. Every page calls pageMetadata() with its own
// title, description and path, so each page gets its own og:title,
// og:description and canonical URL instead of inheriting the home page's.
// ─────────────────────────────────────────────────────────────────────────────

/** Public origin. The apex domain serves the site directly. */
export const SITE_URL = 'https://zerbiq.com';

const OG_IMAGE = '/og-image.png';

/**
 * @param {object} opts
 * @param {string} opts.title        Page title (also used as og:title)
 * @param {string} opts.description  Page description (also used as og:description)
 * @param {string} opts.path         Route path, e.g. '/pricing' (canonical is SITE_URL + path)
 * @param {boolean} [opts.noindex]   Keep the page out of search results
 */
export function pageMetadata({ title, description, path, noindex = false }) {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      type: 'website',
      siteName: 'Zerbiq',
      images: [{ url: OG_IMAGE }],
    },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}
