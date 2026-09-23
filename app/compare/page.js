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

const PLAN_CARDS = [
  {
    name: 'Core',
    label: '— foundation',
    color: '#f97316',
    price: '$99/mo',
    customers: '500 active customers',
    features: ['Route management', 'Job scheduling', 'Invoicing & payments', 'Online payment processing', 'Customer CRM', 'Team management', 'GPS field tracking', 'SMS notifications', 'Appointment reminders', 'Holiday management', 'Billing cycles', 'Truck inspection', 'PIN login', 'Custom branding', 'Reports & analytics', 'Data export', 'Mileage tracking', 'Time tracking', 'Attendance & time off', 'Purchase orders', 'Parts on order', 'Performance reviews', 'Incident tracking', 'Equipment tracking', 'Credits & refunds', 'Materials & inventory', 'Schedule & dispatch', 'Two-way SMS', 'Light & dark mode', 'Personalized shortcuts bar', 'Mobile team view'],
  },
  {
    name: 'Field',
    label: '— everything in Core, plus',
    color: '#3b82f6',
    price: '$149/mo',
    customers: '1,000 active customers',
    features: ['Estimates & quotes', 'Customer portal', 'Route intelligence', 'Lead management', 'Payment plans', 'Employee asset checkout', 'Subcontractor management', 'Maintenance calendar', 'Multiple service locations (+$59/mo per location)', 'Lead capture form', 'Employee termination workflow'],
  },
  {
    name: 'Command',
    label: '— everything in Field, plus',
    color: '#10b981',
    price: '$199/mo',
    customers: '2,500 active customers',
    features: ['AI support chatbot', 'Automations engine', 'QuickBooks sync', 'Follow-up sequences', 'In-app messaging', 'Automated late fees', 'Priority support'],
  },
  {
    name: 'Enterprise',
    label: '— everything in Command, plus',
    color: '#8b5cf6',
    price: 'Custom',
    customers: 'Unlimited active customers',
    features: ['Unlimited customers', 'Dedicated onboarding', 'Custom integrations', 'Direct support'],
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
        @keyframes shimmer {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(500%); }
        }
        @keyframes strike-draw {
          0%   { width: 0; }
          100% { width: 100%; }
        }
        @keyframes hint-nudge-right {
          0%, 100% { opacity: 0.6; transform: translateX(0); }
          50%       { opacity: 1;   transform: translateX(4px); }
        }
        @keyframes hint-nudge-left {
          0%, 100% { opacity: 0.6; transform: translateX(0); }
          50%       { opacity: 1;   transform: translateX(-4px); }
        }
        .banner-shimmer {
          position: absolute;
          top: 0; left: 0;
          width: 20%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(61,92,255,0.1), transparent);
          animation: shimmer 3s ease-in-out infinite;
          pointer-events: none;
        }
        .plan-cards-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
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
        @media (max-width: 768px) {
          .compare-scroll-hint-outer { display: flex; }
          .plan-cards-grid { grid-template-columns: 1fr; gap: 12px; }
          /* Banner mobile */
          .pricing-banner-card    { padding: 16px !important; }
          .pricing-banner-heading { font-size: 20px !important; }
          .pricing-banner-subtitle{ font-size: 13px !important; }
          .strike-badges-row      { flex-direction: column !important; }
          .strike-badge           { width: 100%; max-width: 100%; box-sizing: border-box; font-size: 14px !important; }
          .confirm-badge          { width: 100%; box-sizing: border-box; display: block !important; font-size: 12px !important; }
          .banner-bottom-text     { font-size: 12px !important; }
          /* Plan cards mobile */
          .plan-card-name    { font-size: 14px !important; }
          .plan-card-price   { font-size: 20px !important; }
          .plan-feature-item { font-size: 12px !important; }
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

      {/* Animated Pricing Banner */}
      <section style={{ padding: '0 24px 32px', overflowX: 'hidden' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', boxSizing: 'border-box' }}>
          <div className="pricing-banner-card" style={{ position: 'relative', overflow: 'hidden', background: '#0A0A14', border: '2px solid #3D5CFF', borderRadius: 16, padding: '36px 40px', boxSizing: 'border-box', textAlign: 'center' }}>
            <div className="banner-shimmer" />
            <h2 className="pricing-banner-heading" style={{ fontWeight: 900, fontSize: 'clamp(22px, 3.5vw, 40px)', letterSpacing: '-0.03em', margin: '0 0 12px', lineHeight: 1.2, position: 'relative' }}>
              <span style={{ display: 'block', textDecoration: 'underline', textDecorationColor: '#fff' }}>Priced per company.</span>
              <span style={{ display: 'block' }}>
                <span style={{ color: '#3D5CFF' }}>Not per person</span>
                <span style={{ background: 'linear-gradient(to bottom, #ffffff 50%, #3D5CFF 50%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>!</span>
              </span>
            </h2>
            <p className="pricing-banner-subtitle" style={{ color: 'rgba(255,255,255,0.7)', fontSize: 16, lineHeight: 1.65, margin: '0 auto 24px', maxWidth: 560, position: 'relative', textAlign: 'center' }}>
              One flat price for your entire operation — no matter how many people you add.
            </p>
            <div className="strike-badges-row" style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 16, position: 'relative', justifyContent: 'center' }}>
              {[
                { text: '❌ $29/user/month extra techs', delay: '0.5s' },
                { text: '❌ $29/seat office staff',       delay: '0.8s' },
                { text: '❌ Extra license seasonal workers', delay: '1.1s' },
              ].map(({ text, delay }) => (
                <div key={text} className="strike-badge" style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', padding: '6px 14px', background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: 6, fontSize: 16, color: 'rgba(255,255,255,0.65)', overflow: 'hidden', boxSizing: 'border-box' }}>
                  {text}
                  <div style={{ position: 'absolute', top: '50%', left: 0, height: 2, background: '#ef4444', width: 0, animationName: 'strike-draw', animationDuration: '0.5s', animationDelay: delay, animationFillMode: 'forwards', animationTimingFunction: 'ease-out' }} />
                </div>
              ))}
            </div>
            <div className="confirm-badge" style={{ display: 'inline-block', background: 'rgba(61,92,255,0.15)', border: '1px solid rgba(61,92,255,0.4)', borderRadius: 8, padding: '8px 16px', fontSize: 14, fontWeight: 600, color: '#fff', marginBottom: 20, position: 'relative', boxSizing: 'border-box' }}>
              ✓ Unlimited owners, office staff, techs, and seasonal workers — one price
            </div>
            <p className="banner-bottom-text" style={{ color: 'rgba(255,255,255,0.45)', fontSize: 14, margin: 0, lineHeight: 1.7, position: 'relative' }}>
              Add your whole team on day one. No per-seat math. No surprise charges. No licenses to cancel when someone leaves.
            </p>
          </div>
        </div>
      </section>

      {/* Plan Cards */}
      <section style={{ padding: '0 24px 48px', overflowX: 'hidden' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', boxSizing: 'border-box' }}>
          <div className="plan-cards-grid">
            {PLAN_CARDS.map((plan) => (
              <div
                key={plan.name}
                style={{
                  background: 'var(--color-raised)',
                  border: `1px solid ${plan.color}33`,
                  borderRadius: 12,
                  padding: '24px 20px',
                  display: 'flex',
                  flexDirection: 'column',
                  boxSizing: 'border-box',
                  maxWidth: '100%',
                }}
              >
                <div className="plan-card-name" style={{ fontWeight: 900, fontSize: 20, color: plan.color, marginBottom: 2 }}>{plan.name}</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginBottom: 14, lineHeight: 1.4 }}>{plan.label}</div>
                <div className="plan-card-price" style={{ fontWeight: 900, fontSize: 26, color: '#fff', letterSpacing: '-0.02em', marginBottom: 4 }}>{plan.price}</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', paddingBottom: 14, marginBottom: 14, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>{plan.customers}</div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {plan.features.map((f) => (
                    <li key={f} className="plan-feature-item" style={{ fontSize: 13, color: '#fff', display: 'flex', gap: 6, alignItems: 'flex-start', lineHeight: 1.45 }}>
                      <span style={{ color: plan.color, fontWeight: 700, flexShrink: 0 }}>+</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
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
                Jobber is a well-established platform and a legitimate choice for many field service businesses. Where we differ: Jobber charges per user seat — meaning your monthly cost goes up every time you add a
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
                Housecall Pro is a capable platform, and we respect what they&apos;ve built.{' '}
                <ZerbiqBrand /> was designed from the ground up for field service businesses of all types — whether you run recurring routes, one-time jobs, or a mix of both. Where we differ: Housecall Pro serves a much broader range of trades, which means some of the workflow depth that matters most to field service operators isn&apos;t there.
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
