import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroBackground from '@/components/HeroBackground';
import Link from 'next/link';

export const metadata = {
  title: 'Zerbiq vs HouseCall Pro — Compare Field Service Software (2026)',
  description:
    'See how Zerbiq stacks up against HouseCall Pro. Lower starting price, unlimited team members, payment plans, and analytics on every plan.',
};

// ── Comparison data ────────────────────────────────────────────────────────────

const ROWS = [
  // label, zerbiq, hcp, note
  { label: 'Starting price',                 z: '$49/mo',      h: '$65/mo*',     note: '*HouseCall Pro Basic plan' },
  { label: 'Unlimited team members',         z: true,          h: false,          note: 'HCP charges per user on most plans' },
  { label: 'Job scheduling & dispatch',      z: true,          h: true            },
  { label: 'Recurring jobs',                 z: true,          h: true            },
  { label: 'Route management',               z: true,          h: 'Limited'       },
  { label: 'Invoicing',                      z: true,          h: true            },
  { label: 'Online payment processing',      z: true,          h: true            },
  { label: 'Payment plans',                  z: true,          h: false           },
  { label: 'Transaction & bank register',    z: true,          h: false           },
  { label: 'Estimates & quotes',             z: true,          h: true            },
  { label: 'Customer CRM & portal',          z: true,          h: 'Limited'       },
  { label: 'Two-way SMS messaging',          z: true,          h: true            },
  { label: 'Automated notifications',        z: true,          h: true            },
  { label: 'Review request automation',      z: true,          h: true            },
  { label: 'Materials & inventory tracking', z: true,          h: 'Higher tier'   },
  { label: 'Subcontractor management',       z: true,          h: 'Limited'       },
  { label: 'Time tracking & timecards',      z: true,          h: 'Limited'       },
  { label: 'Analytics & reporting',          z: true,          h: 'Higher tier'   },
  { label: 'Automations & rules engine',     z: true,          h: 'MAX plan only' },
  { label: 'QuickBooks sync',                z: 'Coming soon', h: true            },
  { label: 'Performance reviews',            z: true,          h: false           },
  { label: 'Employee asset checkout',        z: true,          h: false           },
  { label: 'Mobile crew view',               z: true,          h: true            },
  { label: 'No setup fees',                  z: true,          h: 'Varies'        },
  { label: '14-day free trial',              z: true,          h: true            },
];

const CALLOUTS = [
  {
    icon: '💵',
    headline: '24% lower starting price',
    body: "HouseCall Pro's Basic plan starts at $65/mo. Zerbiq Core is $49/mo — and includes features HCP reserves for higher tiers.",
  },
  {
    icon: '👥',
    headline: 'No per-user pricing',
    body: "HouseCall Pro charges per user on most plans. Zerbiq's pricing is per account — add your entire field crew without your bill ballooning.",
  },
  {
    icon: '📊',
    headline: 'Full analytics on Core',
    body: "HouseCall Pro locks most reporting behind their MAX plan ($299/mo+). Zerbiq includes analytics and reporting on every plan from day one.",
  },
  {
    icon: '📆',
    headline: 'Payment plans built in',
    body: 'Zerbiq lets you set up instalment payment plans for customers right out of the box. HouseCall Pro doesn\'t offer this natively.',
  },
];

// ── Cell renderer ──────────────────────────────────────────────────────────────

function Cell({ value, highlight }) {
  if (value === true) {
    return (
      <span style={{ color: highlight ? '#3D5CFF' : '#4ade80', fontWeight: 700, fontSize: 18 }}>✓</span>
    );
  }
  if (value === false) {
    return <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: 18 }}>✗</span>;
  }
  return (
    <span style={{ fontSize: 13, color: highlight ? '#93c5fd' : 'rgba(255,255,255,0.5)', fontWeight: 500 }}>
      {value}
    </span>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

export default function VsHouseCallProPage() {
  return (
    <>
      <Navbar />
      <HeroBackground />

      {/* Hero */}
      <section style={{ padding: '100px 24px 64px', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <div style={{ display: 'inline-block', border: '1px solid var(--color-primary)', borderRadius: 20, padding: '5px 16px', fontSize: 12, fontWeight: 600, color: 'var(--color-primary)', letterSpacing: '0.04em', marginBottom: 28, textTransform: 'uppercase' }}>
            Head-to-Head Comparison
          </div>
          <h1 style={{ fontWeight: 900, fontSize: 'clamp(36px, 6vw, 64px)', letterSpacing: '-0.04em', lineHeight: 1.05, margin: '0 0 24px', color: '#fff' }}>
            Zerbiq vs HouseCall Pro
          </h1>
          <p style={{ color: 'var(--color-white-60)', fontSize: 18, lineHeight: 1.7, margin: '0 0 40px' }}>
            HouseCall Pro is a solid platform. Zerbiq starts $16/mo cheaper, includes unlimited
            team members, and gives you analytics and payment plans from day one.
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/signup" className="btn-primary" style={{ borderRadius: 10, padding: '14px 32px', fontWeight: 700, fontSize: 16, display: 'inline-block' }}>
              Try Zerbiq Free — 14 Days
            </Link>
            <Link href="/pricing" style={{ display: 'inline-block', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 10, padding: '14px 32px', fontWeight: 600, fontSize: 16, color: 'rgba(255,255,255,0.8)', textDecoration: 'none' }}>
              See Pricing
            </Link>
          </div>
        </div>
      </section>

      {/* Callout cards */}
      <section style={{ padding: '0 24px 64px', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20 }}>
          {CALLOUTS.map((c) => (
            <div key={c.headline} style={{ background: 'var(--color-raised)', border: '1px solid var(--color-white-10)', borderRadius: 12, padding: '24px 20px' }}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>{c.icon}</div>
              <h3 style={{ fontWeight: 800, fontSize: 16, margin: '0 0 8px', color: '#fff' }}>{c.headline}</h3>
              <p style={{ color: 'var(--color-white-60)', fontSize: 14, margin: 0, lineHeight: 1.65 }}>{c.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Comparison table */}
      <section style={{ padding: '0 24px 80px', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: 820, margin: '0 auto' }}>
          <h2 style={{ fontWeight: 900, fontSize: 'clamp(22px, 3vw, 32px)', letterSpacing: '-0.03em', textAlign: 'center', marginBottom: 40, color: '#fff' }}>
            Feature by feature
          </h2>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 520 }}>
              <thead>
                <tr>
                  <th style={{ textAlign: 'left', padding: '16px 20px', borderBottom: '2px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.5)', fontSize: 13, fontWeight: 600, width: '55%' }}>Feature</th>
                  <th style={{ textAlign: 'center', padding: '16px 20px', borderBottom: '2px solid #3D5CFF', background: 'rgba(61,92,255,0.08)', color: '#fff', fontSize: 16, fontWeight: 900 }}>
                    ZERBI<span style={{ color: '#3D5CFF' }}>Q</span>
                  </th>
                  <th style={{ textAlign: 'center', padding: '16px 20px', borderBottom: '2px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.4)', fontSize: 16, fontWeight: 700 }}>HouseCall Pro</th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map((row, i) => (
                  <tr key={row.label} style={{ background: i % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'transparent' }}>
                    <td style={{ padding: '13px 20px', fontSize: 14, color: 'rgba(255,255,255,0.8)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      {row.label}
                      {row.note && (
                        <span style={{ display: 'block', fontSize: 11, color: 'rgba(255,255,255,0.35)', marginTop: 2 }}>{row.note}</span>
                      )}
                    </td>
                    <td style={{ textAlign: 'center', padding: '13px 20px', borderBottom: '1px solid rgba(255,255,255,0.05)', background: i % 2 === 0 ? 'rgba(61,92,255,0.06)' : 'rgba(61,92,255,0.03)', borderLeft: '1px solid rgba(61,92,255,0.3)', borderRight: '1px solid rgba(61,92,255,0.3)' }}>
                      <Cell value={row.z} highlight />
                    </td>
                    <td style={{ textAlign: 'center', padding: '13px 20px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <Cell value={row.h} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '80px 24px', background: 'var(--color-surface)', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <h2 style={{ fontWeight: 900, fontSize: 'clamp(26px, 4vw, 40px)', letterSpacing: '-0.03em', margin: '0 0 16px', color: '#fff' }}>
            Ready to make the switch?
          </h2>
          <p style={{ color: 'var(--color-white-60)', fontSize: 16, lineHeight: 1.7, margin: '0 0 36px' }}>
            14-day free trial. No credit card. Import your data and be running in under an hour.
          </p>
          <Link href="/signup" className="btn-primary" style={{ borderRadius: 10, padding: '16px 40px', fontWeight: 700, fontSize: 17, display: 'inline-block' }}>
            Start Free Trial
          </Link>
        </div>
      </section>

      {/* Disclaimer */}
      <section style={{ padding: '32px 24px', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: 820, margin: '0 auto' }}>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', margin: 0, lineHeight: 1.7 }}>
            Competitor information is based on publicly available data as of September 2026. Pricing and features
            may have changed. Zerbiq makes no warranty regarding the accuracy of third-party information.
            HouseCall Pro® is a registered trademark of HouseCall Pro, Inc. and is not affiliated with Zerbiq.
          </p>
        </div>
      </section>

      <Footer />
    </>
  );
}
