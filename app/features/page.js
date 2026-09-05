import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';

export const metadata = {
  title: 'Features — Zerbiq',
  description:
    'Route management, job tracking, invoicing, crew management, CRM, and mobile crew view — all in one platform.',
};

const FEATURES = [
  {
    icon: '🗺️',
    title: 'Route Management',
    desc: [
      "Build optimized routes for your crews in minutes — not hours. Assign stops, drag to reorder, and push routes directly to your team's phones.",
      'See your entire territory at a glance. Know which crew is closest to an urgent job. Reroute on the fly without making a single phone call.',
    ],
  },
  {
    icon: '📋',
    title: 'Job Tracking',
    desc: [
      'Schedule one-time and recurring jobs from a single screen. Set it once — Zerbiq handles the rest for weekly, biweekly, monthly, and quarterly jobs.',
      'Every job moves through a clear status flow: Scheduled → Dispatched → In Progress → Completed. See where every job stands in real time, from any device.',
    ],
  },
  {
    icon: '💰',
    title: 'Invoicing & Payments',
    desc: [
      "Generate invoices the moment a job is marked complete. Send via email or SMS with one click. Collect card payments, ACH, or cash — your choice.",
      "Track what's paid, what's outstanding, and what's overdue. Automated late fees and reminders keep revenue flowing without manual follow-up.",
    ],
  },
  {
    icon: '👥',
    title: 'Crew Management',
    desc: [
      'Add every team member to Zerbiq with a role and permission level. Field techs see only what they need. Admins see everything.',
      'Track time automatically when crews check in and out of jobs. Review timecards, approve hours, and calculate job costs — without spreadsheets.',
    ],
  },
  {
    icon: '📊',
    title: 'Customer CRM',
    desc: [
      'Every customer gets a complete profile: contact info, service history, invoices, notes, photos, and equipment logs — all in one place.',
      'The customer portal lets your clients view their upcoming jobs, pay invoices online, and leave notes. Fewer calls. Happier customers.',
    ],
  },
  {
    icon: '📱',
    title: 'Mobile Crew View',
    desc: [
      'Your techs get a simple, clean view of their day: where to go, what to do, and how to log it. Works on any smartphone. No app store required.',
      'Crews can snap job photos, log materials used, report issues, and collect digital signatures — all from the field, synced instantly to your dashboard.',
    ],
  },
];

function Placeholder({ label }) {
  return (
    /* Replace with screenshot */
    <div
      style={{
        background: 'var(--color-raised)',
        border: '1px solid var(--color-white-10)',
        borderRadius: 14,
        aspectRatio: '16/10',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 220,
      }}
    >
      <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 14, fontWeight: 500 }}>
        {label} — Screenshot Coming Soon
      </span>
    </div>
  );
}

export default function FeaturesPage() {
  return (
    <>
      <Navbar />

      <section
        style={{
          padding: '80px 24px 60px',
          textAlign: 'center',
          background: 'var(--color-bg)',
        }}
      >
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <h1
            style={{
              fontWeight: 900,
              fontSize: 'clamp(32px, 5vw, 56px)',
              letterSpacing: '-0.04em',
              margin: '0 0 20px',
              lineHeight: 1.05,
            }}
          >
            Built for the owner. Trusted by the crew.
          </h1>
          <p
            style={{
              color: 'var(--color-white-60)',
              fontSize: 17,
              lineHeight: 1.7,
              margin: 0,
            }}
          >
            Every feature in Zerbiq is designed for one purpose: helping field service businesses
            run cleaner, get paid faster, and grow without chaos.
          </p>
        </div>
      </section>

      {FEATURES.map((feature, i) => {
        const isEven = i % 2 === 0;
        return (
          <section
            key={feature.title}
            style={{
              padding: '60px 24px',
              background: isEven ? 'var(--color-surface)' : 'var(--color-bg)',
            }}
          >
            <div
              style={{
                maxWidth: 1100,
                margin: '0 auto',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: 48,
                alignItems: 'center',
              }}
            >
              {/* Text side */}
              <div style={{ order: isEven ? 0 : 1 }}>
                <div style={{ fontSize: 36, marginBottom: 16 }}>{feature.icon}</div>
                <h2
                  style={{
                    fontWeight: 900,
                    fontSize: 'clamp(24px, 3vw, 36px)',
                    letterSpacing: '-0.03em',
                    margin: '0 0 20px',
                    lineHeight: 1.15,
                  }}
                >
                  {feature.title}
                </h2>
                {feature.desc.map((p, j) => (
                  <p
                    key={j}
                    style={{
                      color: 'var(--color-white-60)',
                      fontSize: 16,
                      lineHeight: 1.75,
                      margin: j < feature.desc.length - 1 ? '0 0 16px' : '0 0 28px',
                    }}
                  >
                    {p}
                  </p>
                ))}
                <Link
                  href="/signup"
                  className="btn-primary"
                  style={{
                    display: 'inline-block',
                    borderRadius: 8,
                    padding: '12px 24px',
                    fontWeight: 700,
                    fontSize: 14,
                  }}
                >
                  Try it free →
                </Link>
              </div>

              {/* Screenshot placeholder side */}
              <div style={{ order: isEven ? 1 : 0 }}>
                <Placeholder label={feature.title} />
              </div>
            </div>
          </section>
        );
      })}

      <Footer />
    </>
  );
}
