import { notFound } from 'next/navigation';
import { collection, query, where, limit, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { categoryStyle } from '@/lib/categories';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const dynamic = 'force-dynamic';

async function getPostBySlug(slug) {
  try {
    const q = query(collection(db, 'posts'), where('slug', '==', slug), limit(1));
    const snap = await getDocs(q);
    if (snap.empty) return null;
    const doc = snap.docs[0];
    return { id: doc.id, ...doc.data() };
  } catch (err) {
    console.error('Failed to fetch post:', err);
    return null;
  }
}

function formatDate(ts) {
  if (!ts) return '';
  const d = ts.toDate ? ts.toDate() : new Date(ts);
  return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

export async function generateMetadata({ params }) {
  const post = await getPostBySlug(params.slug);
  if (!post) return { title: 'Post Not Found — Zerbiq' };
  return {
    title: post.metaTitle || `${post.title} — Zerbiq`,
    description: post.metaDescription || post.excerpt || '',
    openGraph: {
      title: post.metaTitle || post.title,
      description: post.metaDescription || post.excerpt || '',
      images: post.featuredImage ? [{ url: post.featuredImage }] : [],
    },
  };
}

export default async function BlogPostPage({ params }) {
  const post = await getPostBySlug(params.slug);
  if (!post) notFound();

  const colors = categoryStyle(post.category);

  return (
    <>
      <Navbar />

      <article style={{ maxWidth: 760, margin: '0 auto', padding: '80px 24px 60px' }}>
        {/* Category + Date */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
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
          <span style={{ color: 'var(--color-white-60)', fontSize: 13 }}>
            {formatDate(post.publishedAt)}
          </span>
        </div>

        {/* Title */}
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

        {/* Author */}
        {post.author && (
          <p style={{ color: 'var(--color-white-60)', fontSize: 14, margin: '0 0 32px' }}>
            By {post.author}
          </p>
        )}

        {/* Featured Image */}
        {post.featuredImage && (
          <img
            src={post.featuredImage}
            alt={post.title}
            style={{
              width: '100%',
              borderRadius: 12,
              marginBottom: 40,
              objectFit: 'cover',
              maxHeight: 420,
            }}
          />
        )}

        {/* Body HTML */}
        <div
          className="blog-body"
          dangerouslySetInnerHTML={{ __html: post.body || '' }}
          style={{
            color: 'rgba(255,255,255,0.85)',
            fontSize: 16,
            lineHeight: 1.8,
          }}
        />

        {/* Tags */}
        {post.tags?.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 40 }}>
            {post.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  background: 'var(--color-raised)',
                  border: '1px solid var(--color-white-10)',
                  borderRadius: 20,
                  padding: '4px 12px',
                  fontSize: 12,
                  color: 'var(--color-white-60)',
                }}
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* CTA */}
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
          <p
            style={{
              fontWeight: 800,
              fontSize: 22,
              margin: '0 0 10px',
              letterSpacing: '-0.02em',
            }}
          >
            Ready to run your field service business smarter?
          </p>
          <p
            style={{
              color: 'var(--color-white-60)',
              fontSize: 15,
              margin: '0 0 24px',
              lineHeight: 1.6,
            }}
          >
            Zerbiq gives owner-operators everything they need to schedule crews, collect payments,
            and grow — all in one place.
          </p>
          <a
            href="https://zerbiq.com/pricing"
            style={{
              display: 'inline-block',
              background: 'var(--color-primary)',
              color: '#fff',
              fontWeight: 700,
              fontSize: 15,
              padding: '12px 28px',
              borderRadius: 8,
              textDecoration: 'none',
              letterSpacing: '-0.01em',
            }}
          >
            See Plans &amp; Pricing →
          </a>
        </div>
      </article>

      <Footer />
    </>
  );
}
