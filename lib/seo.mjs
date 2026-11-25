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
 * @param {'website'|'article'} [opts.type]  Open Graph type (default 'website')
 * @param {Array<{url:string,width?:number,height?:number,alt?:string}>} [opts.images]  Replaces the default share image
 * @param {string} [opts.publishedTime]  Articles: ISO date first published
 * @param {string} [opts.modifiedTime]   Articles: ISO date last updated
 * @param {string[]} [opts.authors]      Articles: author names
 * @param {string} [opts.section]        Articles: category
 */
export function pageMetadata({
  title,
  description,
  path,
  noindex = false,
  type = 'website',
  images,
  publishedTime,
  modifiedTime,
  authors,
  section,
}) {
  const shareImages = images && images.length ? images : [{ url: OG_IMAGE }];
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      type,
      siteName: 'Zerbiq',
      images: shareImages,
      ...(type === 'article'
        ? {
            ...(publishedTime ? { publishedTime } : {}),
            ...(modifiedTime ? { modifiedTime } : {}),
            ...(authors ? { authors } : {}),
            ...(section ? { section } : {}),
          }
        : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: shareImages.map((i) => i.url),
    },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}
