import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import ZerbiqBrand from '@/components/ZerbiqBrand';

export const metadata = {
  title: 'Compare Plans — Zerbiq',
  description: 'Every feature, every plan — side by side. Compare Core, Field, Command, and Enterprise.',
};

const PLANS = [
  { name: 'Core',       price: '$99',    href: '/signup',               subtitle: '500 active customers' },
  { name: 'Field',      price: '$149',   href: '/signup',               subtitle: '1,000 active customers' },
  { name: 'Command',    price: '$199',   href: '/signup',  popular: true, subtitle: '2,500 active customers' },
  { name: 'Enterprise', price: 'Custom', href: 'mailto:hello@zerbiq.com', isContact: true, subtitle: '2,500+ customers' },
];

// true = included, false = not included, string = custom value
// Plan gates per confirmed structure (Sep 2026):
//   Core ($49):    customer DB, scheduling, routes, invoicing, transactions, inventory,
//                  team, analytics, SMS/reviews, vehicles, attendance, timecards
//   Field ($99):   Core + leads, online payments, subcontractors, maintenance, portal
//   Command ($149): Field + automations, in-app messaging, QuickBooks, AI chatbot
const FEATURE_GROUPS = [
  {
    group: 'Customer Limits',
    rows: [
      { label: 'Users included',          values: ['Unlimited', 'Unlimited', 'Unlimited', 'Unlimited'] },
      { label: 'Active customers',        values: ['500', '1,000', '2,500', 'Unlimited'] },
      { label: 'Unlimited routes',        values: [true, true, true, true] },
      { label: 'Unlimited team members',  values: [true, true, true, true] },
    ],
  },
  {
    group: 'Jobs & Scheduling',
    rows: [
      { label: 'Job scheduling & tracking',    values: [true, true, true, true] },
      { label: 'Recurring jobs',               values: [true, true, true, true] },
      { label: 'Route management',             values: [true, true, true, true] },
      { label: 'Schedule & dispatch board',    values: [true, true, true, true] },
      { label: 'Drag-to-schedule calendar',    values: [true, true, true, true] },
      { label: 'Job cancellations with fees',  values: [true, true, true, true] },
      { label: 'Missed stop tracking',         values: [true, true, true, true] },
      { label: 'Holiday Management',                       values: [true, true, true, true] },
      { label: 'Billing Cycles',                           values: [true, true, true, true] },
      { label: 'Daily Truck Inspection and Checklists',    values: [true, true, true, true] },
    ],
  },
  {
    group: 'Invoicing & Payments',
    rows: [
      { label: 'Invoicing',                            values: [true,  true,  true,  true] },
      { label: 'Transaction & bank register',           values: [true,  true,  true,  true] },
      { label: 'Credits & refunds',                     values: [true,  true,  true,  true] },
      { label: 'Partial payments and payment plans',          values: [false, true,  true,  true] },
      { label: 'Estimates & quotes',                    values: [false, true,  true,  true] },
      { label: 'Online payment processing (card/ACH)',  values: [true,  true,  true,  true] },
      { label: 'Purchase orders',                            values: [true,  true,  true,  true] },
      { label: 'QuickBooks sync',                          values: [false, false, true,  true] },
    ],
  },
  {
    group: 'SMS & Communications',
    rows: [
      { label: 'Technician on the way SMS',     values: [true,  true,  true,  true] },
      { label: 'Job completion SMS',            values: [true,  true,  true,  true] },
      { label: 'Appointment reminders',         values: [true,  true,  true,  true] },
      { label: 'Automated invoice reminders',   values: [true,  true,  true,  true] },
      { label: 'Review request automation',     values: [true,  true,  true,  true] },
      { label: 'Automated follow-up sequences', values: [false, false, true,  true] },
      { label: 'In-app messaging',              values: [false, false, true,  true] },
    ],
  },
  {
    group: 'Customers & CRM',
    rows: [
      { label: 'Customer CRM',                          values: [true,  true, true, true] },
      { label: 'Custom fields',                         values: [true,  true, true, true] },
      { label: 'Complaints tracking',                   values: [true,  true, true, true] },
      { label: 'Customer portal',                       values: [false, true, true, true] },
      { label: 'Lead management (Kanban)',               values: [false, true, true, true] },
      { label: 'Embeddable lead capture form',          values: [false, true, true, true] },
      { label: 'Multiple service locations ¹',          values: [false, true, true, true] },
    ],
  },
  {
    group: 'Routes & Field Operations',
    rows: [
      { label: 'Route sheet',                                   values: [true, true, true, true] },
      { label: 'Mileage tracking (IRS rates)',                  values: [true, true, true, true] },
      { label: 'Job photos & digital signatures',               values: [true, true, true, true] },
      { label: 'Chemical & material logs',                      values: [true, true, true, true] },
      { label: 'GPS Field Tracking (phone-based, no hardware)', values: [true,  true,  true,  true] },
      { label: 'Route Intelligence (AI stop optimization)',      values: [false, true,  true,  true] },
      { label: 'Parts on Order',                                values: [true,  true,  true,  true] },
    ],
  },
  {
    group: 'Team & HR',
    rows: [
      { label: 'Roles & permissions',              values: [true,  true,  true,  true] },
      { label: 'Timecards & time tracking',         values: [true,  true,  true,  true] },
      { label: 'Attendance tracking',               values: [true,  true,  true,  true] },
      { label: 'Time off & PTO tracking',           values: [true,  true,  true,  true] },
      { label: 'Performance reviews',               values: [true,  true,  true,  true] },
      { label: 'Incident tracking',                 values: [true,  true,  true,  true] },
      { label: 'Vehicle & equipment tracking',      values: [true,  true,  true,  true] },
      { label: 'Employee termination workflow',     values: [false, true,  true,  true] },
      { label: 'Subcontractor management',          values: [false, true,  true,  true] },
      { label: 'Employee ID and PIN Login',         values: [true,  true,  true,  true] },
      { label: 'Employee Asset Checkout',           values: [false, true,  true,  true] },
    ],
  },
  {
    group: 'Inventory & Equipment',
    rows: [
      { label: 'Materials catalog & inventory', values: [true,  true,  true, true] },
      { label: 'Equipment & asset tracking',    values: [true,  true,  true, true] },
      { label: 'Maintenance scheduling',        values: [false, true,  true, true] },
    ],
  },
  {
    group: 'Reporting & Analytics',
    rows: [
      { label: 'Dashboard (16+ widgets)',         values: [true, true, true, true] },
      { label: 'Revenue reports',                 values: [true, true, true, true] },
      { label: 'Job completion reports',          values: [true, true, true, true] },
      { label: 'Tech performance reports',        values: [true, true, true, true] },
      { label: 'Route profitability reports',     values: [true, true, true, true] },
      { label: 'Customer retention reports',      values: [true, true, true, true] },
      { label: 'Overdue invoice aging',           values: [true, true, true, true] },
      { label: 'Data export (CSV/PDF/ZIP)',        values: [true, true, true, true] },
    ],
  },
  {
    group: 'Platform & Support',
    rows: [
      { label: 'Mobile team view (iOS, Android & browser)', values: [true,  true,  true,  true]  },
      { label: 'PWA (install from browser, no download required)', values: [true,  true,  true,  true]  },
      { label: 'Light Mode and Dark Mode',         values: [true,  true,  true,  true]  },
      { label: 'Personalized Shortcuts Bar',       values: [true,  true,  true,  true]  },
      { label: 'Custom Branding',                  values: [true,  true,  true,  true]  },
      { label: 'Automations & rules engine',       values: [false, false, true,  true]  },
      { label: 'AI support chatbot',               values: [false, false, true,  true]  },
      { label: 'Priority support',                 values: [false, false, true,  true]  },
      { label: 'Dedicated onboarding',             values: [false, false, false, true]  },
      { label: 'Custom integrations',              values: [false, false, false, true]  },
    ],
  },
];

const PYRAMID_TIERS = [
  {
    name: 'Enterprise',
    label: '— adds',
    bg: '#26215C',
    color: '#CECBF6',
    labelColor: '#AFA9EC',
    price: 'Custom',
    customers: 'Unlimited active',
    width: '100%',
    features: ['Custom integrations', 'Dedicated onboarding', 'Direct support', 'Unlimited customers'],
  },
  {
    name: 'Command',
    label: '— adds',
    bg: '#085041',
    color: '#9FE1CB',
    labelColor: '#5DCAA5',
    price: '$199/mo',
    customers: '2,500 active',
    width: '88%',
    features: ['AI support chatbot', 'Automated late fees', 'Automations engine', 'Follow-up sequences', 'In-app messaging', 'Priority support', 'QuickBooks sync'],
  },
  {
    name: 'Field',
    label: '— adds',
    bg: '#0C447C',
    color: '#B5D4F4',
    labelColor: '#85B7EB',
    price: '$149/mo',
    customers: '1,000 active',
    width: '76%',
    features: ['Customer portal', 'Employee asset checkout', 'Estimates and quotes', 'Lead capture form', 'Lead management', 'Maintenance calendar', 'Multiple service locations', 'Online payments', 'Payment plans', 'Route intelligence', 'Subcontractor mgmt', 'Termination workflow'],
  },
  {
    name: 'Core',
    label: '— foundation',
    bg: '#712B13',
    color: '#F5C4B3',
    labelColor: '#F0997B',
    price: '$99/mo',
    customers: '500 active',
    width: '64%',
    features: ['Appointment reminders', 'Attendance and time off', 'Billing cycles', 'Credits and refunds', 'Custom branding', 'Customer CRM', 'Daily truck inspection', 'Data export', 'Equipment tracking', 'GPS field tracking', 'Holiday management', 'Incident tracking', 'Invoicing and payments', 'Job scheduling', 'Light and dark mode', 'Materials and inventory', 'Mileage tracking', 'Mobile team view', 'Online payment processing', 'Parts on order', 'Performance reviews', 'Personalized shortcuts bar', 'PIN login', 'Purchase orders', 'Reporting and analytics', 'Review requests', 'Route management', 'Schedule and dispatch', 'SMS notifications', 'Team management', 'Time tracking', 'Two-way SMS'],
  },
];

function CellValue({ value, isCommand }) {
  if (typeof value === 'boolean') {
    return (
      <span
        style={{
          fontSize: 18,
          fontWeight: 700,
          color: value ? '#3D5CFF' : '#fff',
        }}
      >
        {value ? '✓' : '✗'}
      </span>
    );
  }
  return (
    <span
      style={{
        fontSize: 13,
        fontWeight: 600,
        color: '#fff',
      }}
    >
      {value}
    </span>
  );
}

export default function ComparePage() {
  return (
    <>
      <Navbar />

      <style>{`
        @keyframes hint-nudge-right {
          0%, 100% { opacity: 0.6; transform: translateX(0); }
          50%       { opacity: 1;   transform: translateX(4px); }
        }
        @keyframes hint-nudge-left {
          0%, 100% { opacity: 0.6; transform: translateX(0); }
          50%       { opacity: 1;   transform: translateX(-4px); }
        }
        .compare-scroll-hint-outer {
          display: none;
          text-align: center;
          color: #ffffff;
          font-size: 13px;
          padding: 8px 0 12px;
          align-items: center;
          justify-content: center;
          gap: 8px;
          letter-spacing: 0.02em;
        }
        .hint-arrow-left  { display: inline-block; animation: hint-nudge-left  1.6s ease-in-out infinite; }
        .hint-arrow-right { display: inline-block; animation: hint-nudge-right 1.6s ease-in-out infinite; }
        .pyramid-pills {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 4px 8px;
          align-content: start;
        }
        @media (max-width: 768px) {
          .compare-scroll-hint-outer { display: flex; }
          .pyramid-container { overflow: hidden; }
          .pyramid-tier  { width: 100% !important; max-width: 100% !important; box-sizing: border-box; }
          .pyramid-inner { flex-direction: column !important; }
          .pyramid-left  {
            width: 100% !important; min-width: unset !important;
            border-right: none !important; border-bottom: 1px solid rgba(255,255,255,0.15) !important;
            padding-right: 0 !important; margin-right: 0 !important;
            padding-bottom: 12px !important; margin-bottom: 12px !important;
          }
          .pyramid-pills { grid-template-columns: repeat(2, 1fr) !important; font-size: 12px !important; }
        }
      `}</style>

      {/* Hero */}
      <section
        style={{
          padding: '80px 24px 60px',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <h1
            style={{
              fontWeight: 900,
              fontSize: 'clamp(32px, 5vw, 56px)',
              letterSpacing: '-0.04em',
              margin: '0 0 16px',
              lineHeight: 1.05,
            }}
          >
            Compare plans
          </h1>
          <p
            style={{
              color: 'var(--color-white-60)',
              fontSize: 17,
              lineHeight: 1.7,
              margin: '0 0 32px',
            }}
          >
            Every feature, every plan — side by side.
          </p>

          {/* Active customer info box */}
          <div
            style={{
              background: 'rgba(61,92,255,0.1)',
              border: '1px solid rgba(61,92,255,0.35)',
              borderRadius: 8,
              padding: '16px 20px',
              textAlign: 'left',
              maxWidth: 600,
              margin: '0 auto',
            }}
          >
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 14, margin: 0, lineHeight: 1.65 }}>
              <strong style={{ color: '#fff' }}>What is an active customer?</strong>{' '}
              An active customer is any customer currently managed in your account. Archive customers
              you&apos;re no longer serving to free up your slot count — all their history stays saved.
            </p>
          </div>
        </div>
      </section>

      {/* Table */}
      <section style={{ padding: '48px 24px 80px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div className="compare-scroll-hint-outer">
            <span className="hint-arrow-left">‹</span>
            Scroll to see all plans
            <span className="hint-arrow-right">›</span>
          </div>
          <div style={{ overflowX: 'auto' }}>
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              minWidth: 640,
            }}
          >
            {/* Sticky header */}
            <thead>
              <tr>
                <th
                  style={{
                    textAlign: 'left',
                    padding: '40px 16px 20px',
                    position: 'sticky',
                    top: 64,
                    background: 'var(--color-bg)',
                    zIndex: 10,
                    borderBottom: '2px solid rgba(255,255,255,0.1)',
                    width: '35%',
                  }}
                />
                {PLANS.map((plan) => (
                  <th
                    key={plan.name}
                    style={{
                      textAlign: 'center',
                      padding: '40px 16px 20px',
                      position: 'sticky',
                      top: 64,
                      background: plan.popular ? 'rgba(61,92,255,0.08)' : 'var(--color-bg)',
                      zIndex: 10,
                      borderTop: plan.popular ? '2px solid rgba(61,92,255,0.4)' : 'none',
                      borderBottom: '2px solid rgba(255,255,255,0.1)',
                      borderLeft: plan.popular ? '1px solid rgba(61,92,255,0.4)' : 'none',
                      borderRight: plan.popular ? '1px solid rgba(61,92,255,0.4)' : 'none',
                      width: '16.25%',
                    }}
                  >
                    {plan.popular && (
                      <div
                        style={{
                          position: 'absolute',
                          top: 10,
                          left: '50%',
                          transform: 'translateX(-50%)',
                          background: 'var(--color-primary)',
                          color: '#fff',
                          fontSize: 10,
                          fontWeight: 700,
                          letterSpacing: '0.06em',
                          textTransform: 'uppercase',
                          padding: '3px 10px',
                          borderRadius: 20,
                          whiteSpace: 'nowrap',
                        }}
                      >
                        Most Popular
                      </div>
                    )}
                    <div
                      style={{
                        fontWeight: 900,
                        fontSize: 18,
                        color: '#fff',
                        marginBottom: 4,
                      }}
                    >
                      {plan.name}
                    </div>
                    <div
                      style={{
                        color: 'var(--color-white-60)',
                        fontSize: 14,
                        fontWeight: 500,
                        marginBottom: plan.subtitle ? 4 : 0,
                      }}
                    >
                      {plan.price}
                      {plan.price !== 'Custom' && (
                        <span style={{ fontSize: 12 }}>/mo</span>
                      )}
                    </div>
                    {plan.subtitle && (
                      <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.65)', fontWeight: 400 }}>
                        {plan.subtitle}
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {FEATURE_GROUPS.map((group, gi) => (
                <>
                  {/* Group header */}
                  <tr key={`group-${gi}`}>
                    <td
                      colSpan={5}
                      style={{
                        padding: '24px 16px 10px',
                        fontWeight: 800,
                        fontSize: 12,
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        color: 'var(--color-primary)',
                      }}
                    >
                      {group.group}
                    </td>
                  </tr>

                  {/* Feature rows */}
                  {group.rows.map((row, ri) => {
                    const isAlt = ri % 2 === 0;
                    return (
                      <tr
                        key={`${gi}-${ri}`}
                        style={{
                          background: isAlt
                            ? 'rgba(255,255,255,0.02)'
                            : 'transparent',
                        }}
                      >
                        <td
                          style={{
                            padding: '14px 16px',
                            fontSize: 14,
                            color: '#fff',
                            borderBottom: '1px solid rgba(255,255,255,0.05)',
                          }}
                        >
                          {row.label}
                        </td>
                        {row.values.map((val, pi) => {
                          const isCommand = PLANS[pi].popular;
                          return (
                            <td
                              key={pi}
                              style={{
                                textAlign: 'center',
                                padding: '14px 16px',
                                borderBottom: '1px solid rgba(255,255,255,0.05)',
                                background: isCommand
                                  ? isAlt
                                    ? 'rgba(61,92,255,0.07)'
                                    : 'rgba(61,92,255,0.04)'
                                  : 'transparent',
                                borderLeft: isCommand
                                  ? '1px solid rgba(61,92,255,0.4)'
                                  : 'none',
                                borderRight: isCommand
                                  ? '1px solid rgba(61,92,255,0.4)'
                                  : 'none',
                              }}
                            >
                              <CellValue value={val} isCommand={isCommand} />
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </>
              ))}

              {/* CTA row */}
              <tr>
                <td style={{ padding: '32px 16px' }} />
                {PLANS.map((plan) => (
                  <td
                    key={plan.name}
                    style={{
                      textAlign: 'center',
                      padding: '32px 16px',
                      background: plan.popular ? 'rgba(61,92,255,0.08)' : 'transparent',
                      borderLeft: plan.popular ? '1px solid rgba(61,92,255,0.4)' : 'none',
                      borderRight: plan.popular ? '1px solid rgba(61,92,255,0.4)' : 'none',
                      borderBottom: plan.popular ? '1px solid rgba(61,92,255,0.4)' : 'none',
                    }}
                  >
                    {plan.isContact ? (
                      <>
                        <a
                          href={plan.href}
                          style={{
                            display: 'inline-block',
                            background: 'transparent',
                            border: '1px solid rgba(255,255,255,0.3)',
                            color: '#fff',
                            borderRadius: 8,
                            padding: '11px 20px',
                            fontWeight: 700,
                            fontSize: 14,
                            textDecoration: 'none',
                            whiteSpace: 'nowrap',
                            transition: 'border-color 0.2s',
                          }}
                        >
                          Contact Us
                        </a>
                        <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', lineHeight: 1.55, margin: '12px 0 0', padding: '0 4px' }}>
                          Managing 2,500+ customers?{' '}
                          <a href="mailto:hello@zerbiq.com" style={{ color: '#93c5fd', textDecoration: 'none', fontWeight: 600 }}>Contact us</a>
                          {' '}for custom pricing.
                        </p>
                      </>
                    ) : (
                      <Link
                        href={plan.href}
                        className="btn-primary"
                        style={{
                          display: 'inline-block',
                          borderRadius: 8,
                          padding: '11px 20px',
                          fontWeight: 700,
                          fontSize: 14,
                          whiteSpace: 'nowrap',
                        }}
                      >
                        Start Free Trial
                      </Link>
                    )}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
          </div>
        </div>
      </section>

      {/* Footnotes */}
      <section style={{ padding: '0 24px 56px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', margin: 0, lineHeight: 1.75 }}>
            ¹ Multiple service locations available on Field and above.
            Field plans: +$59/mo per additional location.
            Command plans: +$79/mo per additional location.
          </p>
        </div>
      </section>

      {/* Plan Pyramid */}
      <section style={{ padding: '72px 24px 40px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <h2
            style={{
              fontWeight: 900,
              fontSize: 'clamp(22px, 3.5vw, 36px)',
              letterSpacing: '-0.03em',
              textAlign: 'center',
              margin: '0 0 40px',
              lineHeight: 1.1,
            }}
          >
            How the plans build on each other
          </h2>
          <div className="pyramid-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            {PYRAMID_TIERS.map((tier) => (
              <div
                key={tier.name}
                className="pyramid-tier"
                style={{
                  width: tier.width,
                  background: tier.bg,
                  borderRadius: 12,
                  padding: '20px 24px',
                }}
              >
                <div
                  className="pyramid-inner"
                  style={{ display: 'flex', gap: 0, alignItems: 'stretch' }}
                >
                  {/* Left: plan identity */}
                  <div
                    className="pyramid-left"
                    style={{
                      width: 180,
                      minWidth: 180,
                      paddingRight: 20,
                      marginRight: 20,
                      borderRight: '1px solid rgba(255,255,255,0.15)',
                      flexShrink: 0,
                    }}
                  >
                    <div style={{ marginBottom: 10 }}>
                      <div style={{ fontWeight: 900, fontSize: 17, color: tier.color }}>{tier.name}</div>
                      <div style={{ color: tier.labelColor, fontSize: 12, fontWeight: 500, marginTop: 2 }}>{tier.label}</div>
                    </div>
                    <div style={{ fontWeight: 900, fontSize: 22, color: tier.color, lineHeight: 1 }}>{tier.price}</div>
                    <div style={{ fontSize: 12, color: tier.labelColor, marginTop: 4 }}>{tier.customers}</div>
                  </div>
                  {/* Right: feature grid */}
                  <div className="pyramid-pills" style={{ flex: 1, minWidth: 0 }}>
                    {tier.features.map((f) => (
                      <span key={f} style={{ fontSize: 13, color: '#fff', fontWeight: 400 }}>{f}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.3)', fontSize: 13, margin: '24px 0 0' }}>
            No per-seat fees · 14-day free trial · Cancel anytime
          </p>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Competitor Disclaimer                                              */}
      {/* ------------------------------------------------------------------ */}
      <section style={{ padding: '0 24px 80px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          {/* Section heading */}
          <h2
            style={{
              fontWeight: 900,
              fontSize: 'clamp(22px, 3vw, 32px)',
              letterSpacing: '-0.03em',
              margin: '0 0 32px',
              lineHeight: 1.15,
            }}
          >
            A note on Jobber and Housecall Pro
          </h2>

          {/* Two cards */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: 24,
            }}
          >
            {/* Jobber card */}
            <div
              style={{
                background: 'var(--color-surface)',
                border: '1px solid var(--color-white-10)',
                borderRadius: 14,
                padding: '32px 28px',
              }}
            >
              <h3
                style={{
                  fontWeight: 800,
                  fontSize: 18,
                  margin: '0 0 20px',
                  color: '#fff',
                  letterSpacing: '-0.02em',
                }}
              >
                Jobber
              </h3>
              <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: 15, lineHeight: 1.75, margin: '0 0 16px' }}>
                Jobber charges per user seat — meaning your monthly cost goes up every time you add a
                technician. For a team of 5–10 people, that adds up fast. We know because we lived it.{' '}
                <ZerbiqBrand /> includes unlimited team members on every plan, always, with no per-seat fees.
              </p>
              <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: 15, lineHeight: 1.75, margin: '0 0 16px' }}>
                Jobber does offer data export on certain plans, but we cannot independently verify exactly
                what data is exportable, in what formats, or whether that changes by plan tier. If data
                portability matters to you — and it should — ask them directly before you commit. With{' '}
                <ZerbiqBrand />, your full export (customers, jobs, invoices, timecards, inventory) is always
                available to every plan, in CSV, PDF, and ZIP, at no charge.
              </p>
              <p
                style={{
                  color: 'rgba(255,255,255,0.4)',
                  fontSize: 13,
                  lineHeight: 1.65,
                  margin: 0,
                  borderTop: '1px solid rgba(255,255,255,0.08)',
                  paddingTop: 16,
                  fontStyle: 'italic',
                }}
              >
                Pricing and features are based on publicly available information and our own experience as
                former Jobber customers. Always verify current pricing at jobber.com.
              </p>
            </div>

            {/* Housecall Pro card */}
            <div
              style={{
                background: 'var(--color-surface)',
                border: '1px solid var(--color-white-10)',
                borderRadius: 14,
                padding: '32px 28px',
              }}
            >
              <h3
                style={{
                  fontWeight: 800,
                  fontSize: 18,
                  margin: '0 0 20px',
                  color: '#fff',
                  letterSpacing: '-0.02em',
                }}
              >
                Housecall Pro
              </h3>
              <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: 15, lineHeight: 1.75, margin: '0 0 16px' }}>
                Housecall Pro is a capable platform, and we respect what they&apos;ve built. Where we
                differ: <ZerbiqBrand /> was designed from the ground up specifically for recurring
                route-based field service — lawn care, pool service, pest control, and similar businesses.
                Housecall Pro serves a much broader range of trades, which means some of the workflow depth
                that matters most to route-based operators isn&apos;t there.
              </p>
              <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: 15, lineHeight: 1.75, margin: '0 0 16px' }}>
                Like Jobber, we cannot independently verify Housecall Pro&apos;s current data export
                capabilities, import options, or how those vary by plan. What we can tell you is that{' '}
                <ZerbiqBrand /> gives you full data portability on every plan — no plan upgrade required to
                take your own data with you.
              </p>
              <p
                style={{
                  color: 'rgba(255,255,255,0.4)',
                  fontSize: 13,
                  lineHeight: 1.65,
                  margin: 0,
                  borderTop: '1px solid rgba(255,255,255,0.08)',
                  paddingTop: 16,
                  fontStyle: 'italic',
                }}
              >
                Pricing and features are based on publicly available information. Always verify current
                pricing at housecallpro.com.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
