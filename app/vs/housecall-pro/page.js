import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroBackground from '@/components/HeroBackground';
import Link from 'next/link';
import ZerbiqBrand, { brandify } from '@/components/ZerbiqBrand';

export const metadata = {
  title: 'Zerbiq vs HouseCall Pro — Side-by-Side Comparison (2026)',
  description:
    'Compare Zerbiq and HouseCall Pro across all three plan tiers. See which platform gives you more at every price point.',
};

// ── Tier definitions ───────────────────────────────────────────────────────────

const TIERS = [
  {
    id: 'core',
    zLabel: 'Core',       zPrice: '$79/mo',
    cLabel: 'Basic',      cPrice: '$79/mo',
    cNote: 'HouseCall Pro Basic is limited to 1 user only — additional users require a higher-priced plan. Zerbiq Core includes unlimited users.',
    rows: [
      { label: 'Job scheduling & dispatch',        z: true,       c: true    },
      { label: 'Recurring jobs',                   z: true,       c: true    },
      { label: 'Route management',                 z: true,       c: 'Limited' },
      { label: 'Invoicing',                        z: true,       c: true    },
      { label: 'Transaction & bank register',      z: true,       c: false   },
      { label: 'Materials & inventory tracking',   z: true,       c: false   },
      { label: 'Unlimited team members',           z: true,       c: false, note: 'HCP Basic is single-user' },
      { label: 'Analytics & reporting dashboard',  z: true,       c: 'Limited' },
      { label: 'Automated SMS notifications',      z: true,       c: true    },
      { label: 'Review request automation',        z: true,       c: true    },
      { label: 'Vehicle & equipment tracking',     z: true,       c: false   },
      { label: 'Attendance & time off tracking',   z: true,       c: false   },
      { label: 'Time tracking & timecards',        z: true,       c: 'Limited' },
      { label: 'Mobile crew view',                 z: true,       c: true    },
      { label: '14-day free trial',                z: true,       c: true    },
    ],
  },
  {
    id: 'field',
    zLabel: 'Field',      zPrice: '$129/mo',
    cLabel: 'Essentials', cPrice: '$149/mo',
    cNote: 'HouseCall Pro Essentials has per-user seat pricing — your bill grows with every hire. Zerbiq Field includes unlimited users.',
    rows: [
      { label: 'Everything in Core tier',          z: true,       c: true    },
      { label: 'Leads & quote management',         z: true,       c: true    },
      { label: 'Estimates & quotes',               z: true,       c: true    },
      { label: 'Online payment processing',        z: true,       c: true    },
      { label: 'Customer portal',                  z: true,       c: 'Limited' },
      { label: 'Subcontractor management',         z: true,       c: false   },
      { label: 'Maintenance scheduling',           z: true,       c: false   },
      { label: 'Payment plans',                    z: true,       c: false   },
      { label: 'Unlimited team members',           z: true,       c: false, note: 'HCP Essentials has per-user pricing' },
      { label: 'Purchase orders',                  z: true,       c: false   },
    ],
  },
  {
    id: 'command',
    zLabel: 'Command',    zPrice: '$179/mo',
    cLabel: 'MAX',        cPrice: '$299/mo',
    cNote: 'HouseCall Pro MAX is limited to 8 users — $35/mo per additional user. Zerbiq Command includes unlimited users.',
    rows: [
      { label: 'Everything in Field tier',         z: true,       c: true    },
      { label: 'Automations & rules engine',       z: true,       c: true    },
      { label: 'In-app team messaging',            z: true,       c: false   },
      { label: 'QuickBooks sync',                  z: 'Coming soon', c: true },
      { label: 'AI support chatbot',               z: true,       c: false   },
      { label: 'Unlimited team members',           z: true,       c: true    },
      { label: 'Priority support',                 z: true,       c: true    },
    ],
  },
];

// ── Callouts ───────────────────────────────────────────────────────────────────

const CALLOUTS = [
  {
    icon: '👥',
    headline: 'One price, unlimited team members',
    body: "Add 20 technicians for the same price as 1. HouseCall Pro charges per seat — your bill grows every time you hire. Zerbiq pricing is per account, not per person.",
  },
  {
    icon: '🏦',
    headline: 'Bank register on Core',
    body: 'Zerbiq Core ($79) includes a full transaction and bank register. HouseCall Pro has no equivalent at any tier.',
  },
  {
    icon: '📊',
    headline: 'Full analytics from day one',
    body: 'Complete analytics and reporting dashboard included on every Zerbiq plan. HouseCall Pro reserves most reporting for MAX ($299/mo).',
  },
  {
    icon: '📆',
    headline: 'Payment plans on Field and above',
    body: 'From $129/mo, Zerbiq lets you set up instalment payment plans for customers. HouseCall Pro doesn\'t offer this at any price point.',
  },
];

// ── Sub-components ─────────────────────────────────────────────────────────────

function Cell({ value, isZ }) {
  if (value === true)  return <span style={{ color: isZ ? '#3D5CFF' : '#4ade80', fontWeight: 700, fontSize: 20 }}>✓</span>;
  if (value === false) return <span style={{ color: 'rgba(255,255,255,0.18)', fontSize: 20 }}>✗</span>;
  return <span style={{ fontSize: 12, color: isZ ? '#93c5fd' : 'rgba(255,255,255,0.45)', fontWeight: 500, lineHeight: 1.3, display: 'inline-block' }}>{value}</span>;
}

function TierTable({ tier }) {
  return (
    <div style={{ marginBottom: 64 }}>
      <h3 style={{ fontWeight: 900, fontSize: 'clamp(18px, 3vw, 24px)', letterSpacing: '-0.03em', margin: '0 0 12px', color: '#fff', textAlign: 'center' }}>
        Zerbiq {tier.zLabel}
        <span style={{ color: '#3D5CFF', fontWeight: 500, fontSize: '0.65em', marginLeft: 8 }}>{tier.zPrice}</span>
        <span style={{ color: 'rgba(255,255,255,0.3)', fontWeight: 400, margin: '0 10px' }}>vs</span>
        HCP {tier.cLabel}
        <span style={{ color: 'rgba(255,255,255,0.4)', fontWeight: 500, fontSize: '0.65em', marginLeft: 8 }}>{tier.cPrice}</span>
      </h3>
      {tier.cNote && (
        <p style={{ fontSize: 13, color: '#fbbf24', margin: '0 0 20px', padding: '10px 14px', background: 'rgba(251,191,36,0.07)', borderRadius: 8, border: '1px solid rgba(251,191,36,0.22)', lineHeight: 1.55, textAlign: 'left' }}>
          ⚠️ {brandify(tier.cNote)}
        </p>
      )}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 480 }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left', padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.4)', fontSize: 12, fontWeight: 600, width: '55%' }}>Feature</th>
              <th style={{ textAlign: 'center', padding: '12px 16px', borderBottom: '2px solid #3D5CFF', background: 'rgba(61,92,255,0.1)', color: '#fff', fontSize: 14, fontWeight: 800 }}>
                <ZerbiqBrand /> {tier.zLabel}
              </th>
              <th style={{ textAlign: 'center', padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.35)', fontSize: 14, fontWeight: 700 }}>
                HCP {tier.cLabel}
              </th>
            </tr>
          </thead>
          <tbody>
            {tier.rows.map((row, i) => (
              <tr key={row.label} style={{ background: i % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'transparent' }}>
                <td style={{ padding: '11px 16px', fontSize: 13, color: 'rgba(255,255,255,0.8)', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  {row.label}
                  {row.note && <span style={{ display: 'block', fontSize: 11, color: 'rgba(255,255,255,0.3)', marginTop: 2 }}>{row.note}</span>}
                </td>
                <td style={{ textAlign: 'center', padding: '11px 16px', borderBottom: '1px solid rgba(255,255,255,0.04)', background: i % 2 === 0 ? 'rgba(61,92,255,0.06)' : 'rgba(61,92,255,0.03)', borderLeft: '1px solid rgba(61,92,255,0.25)', borderRight: '1px solid rgba(61,92,255,0.25)' }}>
                  <Cell value={row.z} isZ />
                </td>
                <td style={{ textAlign: 'center', padding: '11px 16px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <Cell value={row.c} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────

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
            <ZerbiqBrand /> vs HouseCall Pro
          </h1>
          <p style={{ color: 'var(--color-white-60)', fontSize: 18, lineHeight: 1.7, margin: '0 0 40px' }}>
            Three tiers, side by side — at every price point. See exactly what you get
            from each platform before you commit.
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/signup" className="btn-primary" style={{ borderRadius: 10, padding: '14px 32px', fontWeight: 700, fontSize: 16, display: 'inline-block' }}>
              Try <ZerbiqBrand /> Free — 14 Days
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
              <p style={{ color: 'var(--color-white-60)', fontSize: 14, margin: 0, lineHeight: 1.65 }}>{brandify(c.body)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Three-tier comparison */}
      <section style={{ padding: '0 24px 80px', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: 820, margin: '0 auto' }}>
          <div style={{ background: 'rgba(61,92,255,0.06)', border: '1px solid rgba(61,92,255,0.2)', borderRadius: 8, padding: '10px 16px', marginBottom: 40, fontSize: 12, color: 'rgba(255,255,255,0.45)', lineHeight: 1.6 }}>
            ℹ️ Competitor pricing and features based on publicly available information as of September 2026. Subject to change.
          </div>
          {TIERS.map((tier) => <TierTable key={tier.id} tier={tier} />)}
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

      {/* Legal */}
      <section style={{ padding: '32px 24px', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: 820, margin: '0 auto' }}>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', margin: 0, lineHeight: 1.7 }}>
            Competitor information is based on publicly available data as of September 2026. Pricing and features
            may have changed. <ZerbiqBrand /> makes no warranty regarding the accuracy of third-party information.
            HouseCall Pro® is a registered trademark of HouseCall Pro, Inc. and is not affiliated with <ZerbiqBrand />.
          </p>
        </div>
      </section>

      <Footer />
    </>
  );
}
