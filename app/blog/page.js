import Link from 'next/link';
import { categoryStyle } from '@/lib/categories';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { POSTS, livePosts, formatPostDate, readingMinutes } from '@/lib/blog/index.mjs';
import { pageMetadata } from '@/lib/seo.mjs';
import {
  BLOG_META_TITLE,
  BLOG_DESCRIPTION,
  blogIndexJsonLd,
  jsonLdString,
} from '@/lib/blog/seo.mjs';
import { getFirestorePosts } from '@/lib/blog/firestorePosts';

// Generated at build time and refreshed hourly, so posts published from the admin
// screen show up without a redeploy.
export const revalidate = 3600;

async function getAllPosts() {
  const extra = (await getFirestorePosts()).filter((p) => p.slug && !POSTS.some((s) => s.slug === p.slug));
  const staticPosts = livePosts().map((p) => ({
    id: p.slug,
    slug: p.slug,
    title: p.title,
    excerpt: p.description,
    category: p.category,
    publishedAt: p.publishedAt,
    minutes: readingMinutes(p),
  }));
  const more = extra.map((p) => ({
    id: p.id,
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    category: p.category,
    publishedAt: p.publishedAt,
  }));
  return [...staticPosts, ...more].sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
}

// The static posts always exist, so the blog index is always indexable.
export async function generateMetadata() {
  const meta = pageMetadata({
    title: BLOG_META_TITLE,
    description: BLOG_DESCRIPTION,
    path: '/blog',
  });
  meta.alternates.types = { 'application/atom+xml': '/blog/feed.xml' };
  return meta;
}

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <>
      <Navbar />

      {blogIndexJsonLd(livePosts()).map((obj, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdString(obj) }}
        />
      ))}

      <section style={{ padding: '80px 24px 56px', textAlign: 'center' }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <h1
            style={{
              fontWeight: 900,
              fontSize: 'clamp(32px, 5vw, 52px)',
              letterSpacing: '-0.04em',
              margin: '0 0 20px',
              lineHeight: 1.05,
            }}
          >
            Field service guides for owners
          </h1>
          <p style={{ color: 'var(--color-white-60)', fontSize: 17, lineHeight: 1.7, margin: 0 }}>
            Practical, plain-English guides on routes, recurring jobs, invoicing, pricing, crews,
            and keeping customers, written for owners of small and mid-size service companies.
          </p>
        </div>
      </section>

      <section style={{ padding: '0 24px 100px' }}>
        <div
          style={{
            maxWidth: 1100,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 24,
          }}
        >
          {posts.map((post) => {
            const colors = categoryStyle(post.category);
            return (
              <article
                key={post.id}
                className="blog-card"
                style={{
                  background: 'var(--color-raised)',
                  border: '1px solid var(--color-white-10)',
                  borderRadius: 12,
                  padding: 28,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                  <span
                    style={{
                      background: colors.bg,
                      color: colors.text,
                      borderRadius: 6,
                      padding: '3px 10px',
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: '0.04em',
                      textTransform: 'uppercase',
                    }}
                  >
                    {post.category}
                  </span>
                  <time
                    dateTime={post.publishedAt}
                    style={{ color: 'var(--color-white-60)', fontSize: 13 }}
                  >
                    {post.publishedAt ? formatPostDate(post.publishedAt) : ''}
                  </time>
                  {post.minutes ? (
                    <span style={{ color: 'var(--color-white-60)', fontSize: 13 }}>
                      {post.minutes} min read
                    </span>
                  ) : null}
                </div>

                <h2 style={{ fontWeight: 800, fontSize: 18, margin: 0, lineHeight: 1.35 }}>
                  <Link
                    href={`/blog/${post.slug}`}
                    style={{ color: 'inherit', textDecoration: 'none' }}
                  >
                    {post.title}
                  </Link>
                </h2>

                <p
                  style={{
                    color: 'var(--color-white-60)',
                    fontSize: 14,
                    lineHeight: 1.65,
                    margin: 0,
                    flex: 1,
                  }}
                >
                  {post.excerpt}
                </p>

                <Link
                  href={`/blog/${post.slug}`}
                  style={{
                    color: 'var(--color-primary)',
                    fontSize: 14,
                    fontWeight: 600,
                    marginTop: 4,
                    textDecoration: 'none',
                  }}
                >
                  Read more →
                </Link>
              </article>
            );
          })}
        </div>
      </section>

      <Footer />
    </>
  );
}
