import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Blog — Zerbiq',
  description:
    'Field service insights for owner-operators. Operations, business tips, and invoicing guides.',
};

// <!-- Blog posts will be added via MassBlogger workflow -->
const POSTS = [
  {
    title: '5 Ways Lawn Care Businesses Lose Money Without a CRM',
    date: 'June 2026',
    category: 'Business Tips',
    categoryColor: 'rgba(61,92,255,0.15)',
    categoryText: 'var(--color-primary)',
    excerpt:
      "Most lawn care operators don't realize how much revenue slips through the cracks. Missed follow-ups, forgotten recurring jobs, and disorganized customer records add up fast.",
  },
  {
    title: 'How to Build Efficient Routes for Your Pressure Washing Crew',
    date: 'July 2026',
    category: 'Operations',
    categoryColor: 'rgba(0,180,120,0.15)',
    categoryText: '#00c87a',
    excerpt:
      'Drive time is lost time. Learn how top pressure washing operators structure their routes to fit more jobs per day — without burning out their crews.',
  },
  {
    title: "The Owner-Operator's Guide to Getting Paid Faster",
    date: 'August 2026',
    category: 'Invoicing',
    categoryColor: 'rgba(255,160,0,0.15)',
    categoryText: '#ffb020',
    excerpt:
      'Getting the job done is half the battle. Getting paid on time is the other half. Here are the habits and tools that top operators use to keep cash flowing.',
  },
];

export default function BlogPage() {
  return (
    <>
      <Navbar />

      <section
        style={{ padding: '80px 24px 56px', textAlign: 'center', background: 'var(--color-bg)' }}
      >
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

      <section style={{ padding: '0 24px 100px', background: 'var(--color-bg)' }}>
        <div
          style={{
            maxWidth: 1100,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 24,
          }}
        >
          {POSTS.map((post) => (
            <article
              key={post.title}
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
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span
                  style={{
                    background: post.categoryColor,
                    color: post.categoryText,
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
                <span style={{ color: 'var(--color-white-60)', fontSize: 13 }}>{post.date}</span>
              </div>

              <h2 style={{ fontWeight: 800, fontSize: 18, margin: 0, lineHeight: 1.35 }}>
                {post.title}
              </h2>

              <p
                style={{
                  color: 'var(--color-white-60)',
                  fontSize: 14,
                  lineHeight: 1.65,
                  margin: 0,
                  flex: 1,
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}
              >
                {post.excerpt}
              </p>

              <span
                style={{
                  color: 'var(--color-primary)',
                  fontSize: 14,
                  fontWeight: 600,
                  marginTop: 4,
                }}
              >
                Read more →
              </span>
            </article>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}
