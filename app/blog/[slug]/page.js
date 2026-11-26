import Link from 'next/link';
import { notFound } from 'next/navigation';
import { categoryStyle } from '@/lib/categories';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BlogInline from '@/components/BlogInline';
import {
  livePosts,
  isLive,
  BLOG_AUTHOR,
  getStaticPost,
  formatPostDate,
  readingMinutes,
} from '@/lib/blog/index.mjs';
import {
  postMetadata,
  postJsonLd,
  jsonLdString,
} from '@/lib/blog/seo.mjs';

// Posts are generated at build time. A scheduled post (not yet built) is rendered on
// demand once its date arrives and then cached for an hour.
export const revalidate = 3600;
export const dynamicParams = true;

const DEMO_URL = 'https://calendly.com/zerbiq-demos/30min';

export function generateStaticParams() {
  // Only posts whose date has arrived are built up front. A scheduled post is a 404 until
  // its date, then the hourly refresh (revalidate) publishes it with no redeploy.
  return livePosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const post = getStaticPost(params.slug);
  if (!post || !isLive(post)) return { title: 'Post Not Found — Zerbiq', robots: { index: false, follow: false } };
  return postMetadata(post);
}

const label = {
  color: 'var(--color-white-60)',
  fontSize: 13,
};

function JsonLd({ items }) {
  return items.map((obj, i) => (
    <script
      key={i}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonLdString(obj) }}
    />
  ));
}

function CtaBox() {
  return (
    <div
      style={{
        marginTop: 56,
        background: 'var(--color-raised)',
        border: '1px solid var(--color-white-10)',
        borderRadius: 14,
        padding: '36px 32px',
        textAlign: 'center',
      }}
    >
      <p style={{ fontWeight: 800, fontSize: 22, margin: '0 0 10px', letterSpacing: '-0.02em' }}>
        Ready to run your field service business smarter?
      </p>
      <p style={{ color: 'var(--color-white-60)', fontSize: 15, margin: '0 0 24px', lineHeight: 1.6 }}>
        Zerbiq brings routes, recurring jobs, invoicing, and your crew into one place. See it on
        your own routes in a 30-minute demo.
      </p>
      <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
        <a
          href={DEMO_URL}
          style={{
            display: 'inline-block',
            background: 'var(--color-primary)',
            color: '#fff',
            fontWeight: 700,
            fontSize: 15,
            padding: '12px 28px',
            borderRadius: 8,
            textDecoration: 'none',
          }}
        >
          Book a Demo
        </a>
        <Link
          href="/pricing"
          style={{
            display: 'inline-block',
            color: 'var(--color-primary)',
            border: '1px solid var(--color-primary)',
            fontWeight: 700,
            fontSize: 15,
            padding: '12px 28px',
            borderRadius: 8,
            textDecoration: 'none',
          }}
        >
          See Plans &amp; Pricing
        </Link>
      </div>
    </div>
  );
}

function CategoryBadge({ category }) {
  const colors = categoryStyle(category);
  return (
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
      {category}
    </span>
  );
}

function StaticPost({ post }) {
  const related = post.related.map((s) => getStaticPost(s)).filter((r) => r && isLive(r));
  return (
    <>
      <JsonLd items={postJsonLd(post)} />
      <article style={{ maxWidth: 760, margin: '0 auto', padding: '64px 24px 60px' }}>
        <nav aria-label="Breadcrumb" style={{ ...label, marginBottom: 24 }}>
          <Link href="/" style={{ color: 'inherit' }}>Home</Link> {' / '}
          <Link href="/blog" style={{ color: 'inherit' }}>Blog</Link>
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20, flexWrap: 'wrap' }}>
          <CategoryBadge category={post.category} />
          <span style={label}>{readingMinutes(post)} min read</span>
        </div>

        <h1
          style={{
            fontWeight: 900,
            fontSize: 'clamp(28px, 4vw, 44px)',
            letterSpacing: '-0.03em',
            lineHeight: 1.1,
            margin: '0 0 16px',
          }}
        >
          {post.title}
        </h1>

        <p style={{ ...label, margin: '0 0 32px' }}>
          By {BLOG_AUTHOR} · Published{' '}
          <time dateTime={post.publishedAt}>{formatPostDate(post.publishedAt)}</time> · Last updated{' '}
          <time dateTime={post.updatedAt}>{formatPostDate(post.updatedAt)}</time>
        </p>

        <div
          style={{
            background: 'var(--color-raised)',
            border: '1px solid var(--color-white-10)',
            borderLeft: '3px solid var(--color-primary)',
            borderRadius: 10,
            padding: '20px 24px',
            marginBottom: 32,
            fontSize: 17,
            lineHeight: 1.7,
            color: 'rgba(255,255,255,0.92)',
          }}
        >
          <BlogInline text={post.answer} />
        </div>

        <div
          style={{
            background: 'var(--color-surface)',
            border: '1px solid var(--color-white-10)',
            borderRadius: 10,
            padding: '20px 24px',
            marginBottom: 40,
          }}
        >
          <h2 style={{ fontSize: 18, fontWeight: 800, margin: '0 0 10px' }}>Key takeaways</h2>
          <ul style={{ margin: 0, paddingLeft: '1.3em', lineHeight: 1.7, color: 'rgba(255,255,255,0.85)' }}>
            {post.takeaways.map((t) => (
              <li key={t}>
                <BlogInline text={t} />
              </li>
            ))}
          </ul>
        </div>

        <div className="blog-body" style={{ color: 'rgba(255,255,255,0.85)', fontSize: 16, lineHeight: 1.8 }}>
          {post.sections.map((section) => (
            <section key={section.h}>
              <h2>{section.h}</h2>
              {section.body.map((block, i) => {
                if (typeof block === 'string') {
                  return (
                    <p key={i}>
                      <BlogInline text={block} />
                    </p>
                  );
                }
                if (block.h3) return <h3 key={i}>{block.h3}</h3>;
                const Tag = block.ol ? 'ol' : 'ul';
                return (
                  <Tag key={i}>
                    {(block.ol || block.ul).map((item) => (
                      <li key={item}>
                        <BlogInline text={item} />
                      </li>
                    ))}
                  </Tag>
                );
              })}
            </section>
          ))}

          <section>
            <h2>Frequently asked questions</h2>
            {post.faq.map((f) => (
              <div key={f.q}>
                <h3>{f.q}</h3>
                <p>
                  <BlogInline text={f.a} />
                </p>
              </div>
            ))}
          </section>

          <section>
            <h2>Related reading</h2>
            <ul>
              {related.map((r) => (
                <li key={r.slug}>
                  <Link href={`/blog/${r.slug}`}>{r.title}</Link>
                </li>
              ))}
              <li>
                <Link href="/pricing">Zerbiq plans and pricing</Link>
              </li>
              <li>
                <Link href="/features">Zerbiq features</Link>
              </li>
            </ul>
          </section>
        </div>

        <CtaBox />
      </article>
    </>
  );
}

export default function BlogPostPage({ params }) {
  const post = getStaticPost(params.slug);
  if (!post || !isLive(post)) notFound();

  return (
    <>
      <Navbar />
      <StaticPost post={post} />
      <Footer />
    </>
  );
}
