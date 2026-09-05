import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PricingCards from '@/components/PricingCards';
import Link from 'next/link';

const DEMO_URL = 'YOUR_CALENDLY_LINK';

const FEATURES = [
  {
    icon: '🗺️',
    title: 'Route Management',
    desc: 'Build routes, assign crews, drag to reorder stops. Your whole territory organized in minutes.',
  },
  {
    icon: '📋',
    title: 'Job Tracking',
    desc: 'Schedule, dispatch, and close jobs from one screen. Every status update in real time.',
  },
  {
    icon: '💰',
    title: 'Invoicing & Payments',
    desc: 'Generate invoices from completed jobs. Send, collect, and track payments without switching apps.',
  },
  {
    icon: '👥',
    title: 'Crew Management',
    desc: 'Timecards, roles, permissions, attendance. Run your team without the back-and-forth texts.',
  },
  {
    icon: '📊',
    title: 'Customer CRM',
    desc: 'Every customer, every job history, every note — in one place. Never lose track of a relationship.',
  },
  {
    icon: '📱',
    title: 'Mobile Crew View',
    desc: 'Your techs clock in, log jobs, and report issues from their phone. No training required.',
  },
];

const MARQUEE_ROW_1 = [
  'Lawn Care', 'Pressure Washing', 'Pool Service', 'HVAC', 'Landscaping', 'Pest Control',
  'Plumbing', 'Electrical', 'Painting', 'Janitorial', 'Snow Removal', 'Irrigation',
  'Tree Service', 'Window Cleaning', 'Gutter Cleaning', 'Carpet Cleaning', 'Handyman',
  'Roofing', 'Siding', 'Fencing',
];

const MARQUEE_ROW_2 = [
  'Property Management', 'General Contractors', 'Restoration', 'Concrete', 'Flooring',
  'Tile & Grout', 'Chimney Sweep', 'Solar Installation', 'Security Systems', 'Appliance Repair',
  'Garage Door', 'Locksmith', 'Moving Services', 'Junk Removal', 'Septic Service',
  'Waterproofing', 'Masonry', 'Drywall', 'Insulation', 'Painting',
];

function MarqueeRow({ items, direction = 'left' }) {
  const doubled = [...items, ...items];
  return (
    <div className="marquee-wrapper" style={{ width: '100%', marginBottom: 12 }}>
      <div className={direction === 'left' ? 'marquee-track-left' : 'marquee-track-right'}>
        {doubled.map((item, i) => (
          <span
            key={i}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 12,
              whiteSpace: 'nowrap',
              fontSize: 14,
              fontWeight: 500,
              color: 'var(--color-white-60)',
              padding: '0 12px',
            }}
          >
            {item}
            <span style={{ color: 'var(--color-primary)', userSelect: 'none' }}>·</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      <Navbar />

      {/* HERO */}
      <section
        style={{
          background: 'var(--color-bg)',
          padding: '100px 24px 80px',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          {/* Eyebrow pill */}
          <div
            style={{
              display: 'inline-block',
              border: '1px solid var(--color-primary)',
              borderRadius: 20,
              padding: '5px 16px',
              fontSize: 12,
              fontWeight: 600,
              color: 'var(--color-primary)',
              letterSpacing: '0.04em',
              marginBottom: 28,
              textTransform: 'uppercase',
            }}
          >
            Field Service Operations Platform
          </div>

          <h1
            style={{
              fontWeight: 900,
              fontSize: 'clamp(48px, 7vw, 72px)',
              letterSpacing: '-0.04em',
              lineHeight: 1.05,
              margin: '0 0 24px',
              color: '#fff',
            }}
          >
            Run every crew.<br />
            Own every job.
          </h1>

          <p
            style={{
              color: 'var(--color-white-60)',
              fontSize: 18,
              lineHeight: 1.7,
              maxWidth: 560,
              margin: '0 auto 36px',
            }}
          >
            Zerbiq replaces the whiteboard, the spreadsheet, and the group text. Your crews know
            where to be. Your customers know when to expect them. You know what&apos;s happening —
            from anywhere.
          </p>

          {/* CTAs */}
          <div
            style={{
              display: 'flex',
              gap: 14,
              justifyContent: 'center',
              flexWrap: 'wrap',
              marginBottom: 20,
            }}
          >
            <Link
              href="/signup"
              className="btn-primary"
              style={{
                borderRadius: 10,
                padding: '16px 32px',
                fontWeight: 700,
                fontSize: 16,
                display: 'inline-block',
              }}
            >
              Start Free Trial — It&apos;s Free
            </Link>
            <a
              href={DEMO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
              style={{
                borderRadius: 10,
                padding: '16px 32px',
                fontWeight: 700,
                fontSize: 16,
                display: 'inline-block',
              }}
            >
              Book a Demo
            </a>
          </div>

          <p style={{ color: 'var(--color-white-60)', fontSize: 13, margin: '0 0 56px' }}>
            No credit card required · 7-day free trial · Cancel anytime
          </p>

          {/* App screenshot placeholder */}
          {/* Replace with real app screenshot */}
          <div
            style={{
              background: 'var(--color-raised)',
              border: '1px solid var(--color-white-10)',
              borderRadius: 14,
              aspectRatio: '16/10',
              maxWidth: 900,
              margin: '0 auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 16, fontWeight: 500 }}>
              App Screenshot Coming Soon
            </span>
          </div>
        </div>
      </section>

      {/* INDUSTRY MARQUEE */}
      <section style={{ padding: '60px 0 48px', overflow: 'hidden' }}>
        <p
          style={{
            textAlign: 'center',
            color: 'var(--color-white-60)',
            fontSize: 13,
            fontWeight: 500,
            letterSpacing: '0.02em',
            marginBottom: 28,
            padding: '0 24px',
          }}
        >
          Built for field service businesses across every trade
        </p>
        <MarqueeRow items={MARQUEE_ROW_1} direction="left" />
        <MarqueeRow items={MARQUEE_ROW_2} direction="right" />
      </section>

      {/* FEATURES */}
      <section id="features" style={{ padding: '80px 24px', background: 'var(--color-surface)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <p
            style={{
              color: 'var(--color-primary)',
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginBottom: 16,
              textAlign: 'center',
            }}
          >
            Features
          </p>
          <h2
            style={{
              fontWeight: 900,
              fontSize: 'clamp(28px, 4vw, 44px)',
              letterSpacing: '-0.03em',
              textAlign: 'center',
              maxWidth: 640,
              margin: '0 auto 56px',
              lineHeight: 1.1,
            }}
          >
            Everything your operation needs. Nothing it doesn&apos;t.
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: 20,
            }}
          >
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="feature-card"
                style={{
                  background: 'var(--color-raised)',
                  border: '1px solid var(--color-white-10)',
                  borderRadius: 8,
                  padding: 28,
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <div style={{ fontSize: 28, marginBottom: 14 }}>{f.icon}</div>
                <h3 style={{ fontWeight: 700, fontSize: 17, margin: '0 0 10px' }}>{f.title}</h3>
                <p style={{ color: 'var(--color-white-60)', fontSize: 14, margin: '0 0 20px', lineHeight: 1.65, flex: 1 }}>
                  {f.desc}
                </p>
                <div>
                  <Link
                    href="/signup"
                    className="btn-primary"
                    style={{
                      display: 'inline-block',
                      borderRadius: 8,
                      padding: '10px 20px',
                      fontWeight: 700,
                      fontSize: 13,
                    }}
                  >
                    Try it free →
                  </Link>
                  <div
                    style={{
                      fontSize: 11,
                      color: 'rgba(255,255,255,0.4)',
                      marginTop: 6,
                    }}
                  >
                    Included with all plans
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" style={{ padding: '80px 24px', background: 'var(--color-bg)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <p
            style={{
              color: 'var(--color-primary)',
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginBottom: 16,
              textAlign: 'center',
            }}
          >
            Pricing
          </p>
          <h2
            style={{
              fontWeight: 900,
              fontSize: 'clamp(28px, 4vw, 44px)',
              letterSpacing: '-0.03em',
              textAlign: 'center',
              margin: '0 auto 12px',
              lineHeight: 1.1,
            }}
          >
            Simple pricing. No surprises.
          </h2>
          <p
            style={{
              color: 'var(--color-white-60)',
              textAlign: 'center',
              fontSize: 16,
              marginBottom: 48,
            }}
          >
            Start free. Scale when you&apos;re ready. Cancel anytime.
          </p>
          <PricingCards />
        </div>
      </section>

      {/* TWO WAYS TO GET STARTED */}
      <section
        style={{
          padding: '80px 24px',
          background: 'var(--color-surface)',
        }}
      >
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <h2
            style={{
              fontWeight: 900,
              fontSize: 'clamp(28px, 4vw, 44px)',
              letterSpacing: '-0.03em',
              textAlign: 'center',
              margin: '0 0 16px',
              lineHeight: 1.1,
            }}
          >
            Two ways to get started
          </h2>
          <p
            style={{
              color: 'var(--color-white-60)',
              textAlign: 'center',
              fontSize: 17,
              lineHeight: 1.7,
              margin: '0 0 48px',
              maxWidth: 600,
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            Whether you set it up yourself or have us handle everything — you&apos;ll be live
            before your next job runs.
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: 24,
            }}
          >
            {/* DIY Card */}
            <div
              style={{
                background: '#1E1E2A',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 8,
                padding: 32,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div style={{ fontSize: 36, marginBottom: 16 }}>📥</div>
              <h3
                style={{
                  fontWeight: 800,
                  fontSize: 20,
                  margin: '0 0 14px',
                  lineHeight: 1.3,
                }}
              >
                Set it up yourself — in under an hour.
              </h3>
              <p
                style={{
                  color: 'var(--color-white-60)',
                  fontSize: 15,
                  lineHeight: 1.7,
                  margin: '0 0 28px',
                  flex: 1,
                }}
              >
                Download our simple spreadsheet templates for customers, routes, and team members.
                Fill them in, upload, and you&apos;re live. No tech skills required. Most owners
                are fully set up in under an hour.
              </p>
              <div>
                <Link
                  href="/signup"
                  style={{
                    display: 'inline-block',
                    background: 'transparent',
                    border: '1px solid var(--color-primary)',
                    color: 'var(--color-primary)',
                    borderRadius: 8,
                    padding: '12px 24px',
                    fontWeight: 700,
                    fontSize: 14,
                    textDecoration: 'none',
                    transition: 'background 0.2s, color 0.2s',
                  }}
                >
                  Start Free Trial
                </Link>
                <div
                  style={{
                    fontSize: 12,
                    color: 'rgba(255,255,255,0.4)',
                    marginTop: 8,
                  }}
                >
                  Free with every plan
                </div>
              </div>
            </div>

            {/* White-Glove Card */}
            <div
              style={{
                background: '#1E1E2A',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 8,
                padding: 32,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div style={{ fontSize: 36, marginBottom: 16 }}>🤝</div>
              <h3
                style={{
                  fontWeight: 800,
                  fontSize: 20,
                  margin: '0 0 14px',
                  lineHeight: 1.3,
                }}
              >
                Want us to handle everything?
              </h3>
              <p
                style={{
                  color: 'var(--color-white-60)',
                  fontSize: 15,
                  lineHeight: 1.7,
                  margin: '0 0 28px',
                  flex: 1,
                }}
              >
                Our White-Glove Onboarding is a one-time $599 add-on. We Zoom with you for
                60–90 minutes, import your customer list, build your routes, add your team, and
                configure everything — guaranteed live before the call ends.
              </p>
              <div>
                <a
                  href="mailto:hello@zerbiq.com"
                  className="btn-primary"
                  style={{
                    display: 'inline-block',
                    borderRadius: 8,
                    padding: '12px 24px',
                    fontWeight: 700,
                    fontSize: 14,
                    textDecoration: 'none',
                  }}
                >
                  Book White-Glove Setup
                </a>
                <div
                  style={{
                    fontSize: 12,
                    color: 'rgba(255,255,255,0.4)',
                    marginTop: 8,
                  }}
                >
                  One-time $599 · Available for all plans
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DEMO SECTION */}
      <section
        style={{
          padding: '80px 24px',
          background: 'var(--color-bg)',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <h2
            style={{
              fontWeight: 900,
              fontSize: 'clamp(28px, 4vw, 44px)',
              letterSpacing: '-0.03em',
              marginBottom: 20,
              lineHeight: 1.1,
            }}
          >
            See Zerbiq in action.
          </h2>
          <p
            style={{
              color: 'var(--color-white-60)',
              fontSize: 17,
              lineHeight: 1.7,
              marginBottom: 36,
            }}
          >
            Book a 30-minute demo. We&apos;ll walk through the platform live, answer your
            questions, and get you set up for your free trial.
          </p>
          <a
            href={DEMO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            style={{
              display: 'inline-block',
              borderRadius: 10,
              padding: '16px 40px',
              fontWeight: 700,
              fontSize: 16,
              marginBottom: 24,
            }}
          >
            Book a Demo
          </a>
          <p style={{ color: 'var(--color-white-60)', fontSize: 14, margin: 0 }}>
            Prefer to explore on your own?{' '}
            <Link
              href="/signup"
              style={{ color: '#fff', fontWeight: 600, textDecoration: 'none' }}
            >
              Start your free trial →
            </Link>
          </p>
        </div>
      </section>

      <Footer />
    </>
  );
}
