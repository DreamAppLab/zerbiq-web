// ─────────────────────────────────────────────────────────────────────────────
// lib/blog/seo.mjs — structured data (JSON-LD), metadata, sitemap and feed
// builders for the blog. Pure functions, so tests load the real code.
// ─────────────────────────────────────────────────────────────────────────────
import { SITE_URL, pageMetadata } from '../seo.mjs';
import { POSTS, BLOG_AUTHOR, plainText, readingMinutes } from './index.mjs';

export const BLOG_TITLE = 'Zerbiq Blog: Field Service Guides for Owners';
export const BLOG_DESCRIPTION =
  'Practical guides for field service owners: routes, recurring jobs, invoicing, pricing, crews, and customer retention, in plain English.';

export const postPath = (slug) => `/blog/${slug}`;
export const postUrl = (slug) => `${SITE_URL}${postPath(slug)}`;
/** Generated cover image (app/blog/og/[slug]/route.js). */
export const postImageUrl = (slug) => `${SITE_URL}/blog/og/${slug}`;

const PUBLISHER = { '@type': 'Organization', name: 'Zerbiq', url: SITE_URL };

export function articleJsonLd(post) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: { '@type': 'Organization', name: 'Zerbiq', url: SITE_URL },
    publisher: PUBLISHER,
    image: [postImageUrl(post.slug)],
    articleSection: post.category,
    inLanguage: 'en-US',
    mainEntityOfPage: { '@type': 'WebPage', '@id': postUrl(post.slug) },
    url: postUrl(post.slug),
  };
}

/** Matches the visible FAQ exactly (same questions, same answer text). */
export function faqJsonLd(post) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: post.faq.map((f) => ({
      '@type': 'Question',
      name: plainText(f.q),
      acceptedAnswer: { '@type': 'Answer', text: plainText(f.a) },
    })),
  };
}

export function breadcrumbJsonLd(post) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
      { '@type': 'ListItem', position: 3, name: post.title, item: postUrl(post.slug) },
    ],
  };
}

export function blogIndexJsonLd(posts = POSTS) {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      name: BLOG_TITLE,
      description: BLOG_DESCRIPTION,
      url: `${SITE_URL}/blog`,
      inLanguage: 'en-US',
      publisher: PUBLISHER,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: BLOG_TITLE,
      url: `${SITE_URL}/blog`,
      mainEntity: {
        '@type': 'ItemList',
        itemListElement: posts.map((p, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          url: postUrl(p.slug),
          name: p.title,
        })),
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
      ],
    },
  ];
}

export function postJsonLd(post) {
  return [articleJsonLd(post), faqJsonLd(post), breadcrumbJsonLd(post)];
}

/** JSON for a <script type="application/ld+json">: "<" escaped so the tag cannot be closed early. */
export function jsonLdString(obj) {
  return JSON.stringify(obj).replace(/</g, '\\u003c');
}

export function postMetadata(post) {
  const meta = pageMetadata({
    title: post.metaTitle,
    description: post.description,
    path: postPath(post.slug),
    type: 'article',
    images: [{ url: postImageUrl(post.slug), width: 1200, height: 630, alt: `${post.title} cover` }],
    publishedTime: post.publishedAt,
    modifiedTime: post.updatedAt,
    authors: [BLOG_AUTHOR],
    section: post.category,
  });
  meta.authors = [{ name: BLOG_AUTHOR }];
  meta.alternates.types = { 'application/atom+xml': '/blog/feed.xml' };
  return meta;
}

export const BLOG_META_TITLE = 'Blog: Field Service Guides for Owners | Zerbiq';

/** Public, indexable routes outside the blog (no lastmod: none is tracked for them). */
export const STATIC_ROUTES = [
  '/',
  '/features',
  '/pricing',
  '/compare',
  '/texting',
  '/about',
  '/support',
  '/legal/privacy',
  '/legal/tos',
];

/** Sitemap entries: static pages, the blog index and every post, each with an absolute URL. */
export function sitemapEntries(posts = POSTS) {
  const newest = posts.map((p) => p.updatedAt).sort().pop();
  return [
    ...STATIC_ROUTES.map((r) => ({ url: `${SITE_URL}${r}` })),
    { url: `${SITE_URL}/blog`, lastModified: newest },
    ...posts.map((p) => ({ url: postUrl(p.slug), lastModified: p.updatedAt })),
  ];
}

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Atom feed for /blog/feed.xml. */
export function atomFeed(posts = POSTS) {
  const updated = posts.map((p) => p.updatedAt).sort().pop();
  const entries = posts
    .map(
      (p) => `  <entry>
    <title>${esc(p.title)}</title>
    <link href="${postUrl(p.slug)}" rel="alternate" type="text/html"/>
    <id>${postUrl(p.slug)}</id>
    <published>${p.publishedAt}T09:00:00Z</published>
    <updated>${p.updatedAt}T09:00:00Z</updated>
    <author><name>${esc(BLOG_AUTHOR)}</name></author>
    <category term="${esc(p.category)}"/>
    <summary>${esc(p.description)}</summary>
  </entry>`,
    )
    .join('\n');
  return `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>${esc(BLOG_TITLE)}</title>
  <subtitle>${esc(BLOG_DESCRIPTION)}</subtitle>
  <link href="${SITE_URL}/blog/feed.xml" rel="self" type="application/atom+xml"/>
  <link href="${SITE_URL}/blog" rel="alternate" type="text/html"/>
  <id>${SITE_URL}/blog</id>
  <updated>${updated}T09:00:00Z</updated>
${entries}
</feed>
`;
}

export { readingMinutes };
