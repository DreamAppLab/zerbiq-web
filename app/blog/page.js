import Link from 'next/link';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { categoryStyle } from '@/lib/categories';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Blog — Zerbiq',
  description:
    'Field service insights for owner-operators. Operations, business tips, and invoicing guides.',
};

async function getPublishedPosts() {
  try {
    const q = query(
      collection(db, 'posts'),
      where('status', '==', 'published'),
      orderBy('publishedAt', 'desc'),
    );
    const snap = await getDocs(q);
    return snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (err) {
    console.error('Failed to load posts:', err);
    return [];
  }
}

function formatDate(ts) {
  if (!ts) return '';
  const d = ts.toDate ? ts.toDate() : new Date(ts);
  return d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
}

export default async function BlogPage() {
  const posts = await getPublishedPosts();

  return (
    <>
      <Navbar />

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
            Field service insights for owner-operators
          </h1>
          <p style={{ color: 'var(--color-white-60)', fontSize: 17, lineHeight: 1.7, margin: 0 }}>
            Practical guides on running routes, getting paid, and growing your field service
            business.
          </p>
        </div>
      </section>

      <section style={{ padding: '0 24px 100px' }}>
        {posts.length === 0 ? (
          <p
            style={{
              textAlign: 'center',
              color: 'var(--color-white-60)',
              fontSize: 16,
              padding: '40px 0',
            }}
          >
            No posts published yet. Check back soon.
          </p>
        ) : (
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
                  {/* Category + Date */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
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
                  <h2 style={{ fontWeight: 800, fontSize: 18, margin: 0, lineHeight: 1.35 }}>
                    {post.title}
                  </h2>

                  {/* Excerpt */}
                  <p
                    style={{
                      color: 'var(--color-white-60)',
                      fontSize: 14,
                      lineHeight: 1.65,
                      margin: 0,
                      flex: 1,
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {post.excerpt}
                  </p>

                  {/* Read more */}
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
        )}
      </section>

      <Footer />
    </>
  );
}
