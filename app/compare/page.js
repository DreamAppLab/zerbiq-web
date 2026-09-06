import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';

export const metadata = {
  title: 'Compare Plans — Zerbiq',
  description: 'Every feature, every plan — side by side. Compare Core, Field, Command, and Enterprise.',
};

const PLANS = [
  { name: 'Core', price: '$49', href: '/signup' },
  { name: 'Field', price: '$99', href: '/signup' },
  { name: 'Command', price: '$149', popular: true, href: '/signup' },
  { name: 'Enterprise', price: 'Custom', href: 'mailto:hello@zerbiq.com', isContact: true },
];

// true = included, false = not included, string = custom value
const FEATURE_GROUPS = [
  {
    group: 'Customer Limits',
    rows: [
      { label: 'Active customers', values: ['500', '1,500', '5,000', 'Unlimited'] },
      { label: 'Recurring customers', values: ['150', '400', '1,000', 'Unlimited'] },
      { label: 'Unlimited routes', values: [true, true, true, true] },
      { label: 'Unlimited team members', values: [true, true, true, true] },
    ],
  },
  {
    group: 'Jobs & Scheduling',
    rows: [
      { label: 'Job scheduling & tracking', values: [true, true, true, true] },
      { label: 'Recurring jobs', values: [true, true, true, true] },
      { label: 'Job cancellations with fees', values: [true, true, true, true] },
      { label: 'Schedule & dispatch board', values: [false, true, true, true] },
      { label: 'Drag-to-schedule calendar', values: [false, true, true, true] },
      { label: 'Missed stop tracking', values: [true, true, true, true] },
    ],
  },
  {
    group: 'Invoicing & Payments',
    rows: [
      { label: 'Invoicing & payments', values: [true, true, true, true] },
      { label: 'Estimates & quotes', values: [true, true, true, true] },
      { label: 'Credits & refunds', values: [true, true, true, true] },
      { label: 'Partial payments & payment plans', values: [false, true, true, true] },
      { label: 'Automated late fees', values: [false, false, true, true] },
      { label: 'QuickBooks sync', values: [false, false, true, true] },
    ],
  },
  {
    group: 'SMS & Communications',
    rows: [
      { label: 'Two-way SMS inbox', values: [true, true, true, true] },
      { label: 'Technician on the way SMS', values: [true, true, true, true] },
      { label: 'Job completion SMS', values: [true, true, true, true] },
      { label: 'Appointment reminders', values: [false, false, true, true] },
      { label: 'Automated invoice reminders', values: [false, false, true, true] },
      { label: 'Automated follow-up sequences', values: [false, true, true, true] },
      { label: 'Review request automation', values: [false, true, true, true] },
    ],
  },
  {
    group: 'Customers & CRM',
    rows: [
      { label: 'Customer CRM', values: [true, true, true, true] },
      { label: 'Customer portal', values: [true, true, true, true] },
      { label: 'Multiple service locations', values: [true, true, true, true] },
      { label: 'Custom fields', values: [true, true, true, true] },
      { label: 'Lead management (Kanban)', values: [true, true, true, true] },
      { label: 'Embeddable lead capture form', values: [true, true, true, true] },
      { label: 'Complaints tracking', values: [true, true, true, true] },
    ],
  },
  {
    group: 'Routes & Field Operations',
    rows: [
      { label: 'Route management', values: [true, true, true, true] },
      { label: 'Route sheet', values: [true, true, true, true] },
      { label: 'Mileage tracking (IRS rates)', values: [true, true, true, true] },
      { label: 'GPS tracking', values: [true, true, true, true] },
      { label: 'Job photos & digital signatures', values: [true, true, true, true] },
      { label: 'Chemical & material logs', values: [true, true, true, true] },
    ],
  },
  {
    group: 'Team & HR',
    rows: [
      { label: 'Unlimited team members', values: [true, true, true, true] },
      { label: 'Roles & permissions', values: [true, true, true, true] },
      { label: 'Timecards & attendance', values: [true, true, true, true] },
      { label: 'Time off & PTO tracking', values: [true, true, true, true] },
      { label: 'Performance reviews', values: [true, true, true, true] },
      { label: 'Incident tracking', values: [true, true, true, true] },
      { label: 'Employee termination workflow', values: [true, true, true, true] },
      { label: 'Subcontractor management', values: [false, true, true, true] },
    ],
  },
  {
    group: 'Inventory & Equipment',
    rows: [
      { label: 'Materials catalog', values: [false, true, true, true] },
      { label: 'Inventory management', values: [false, true, true, true] },
      { label: 'Purchase orders', values: [false, true, true, true] },
      { label: 'Equipment & asset tracking', values: [true, true, true, true] },
      { label: 'Maintenance calendar', values: [false, false, true, true] },
    ],
  },
  {
    group: 'Reporting & Analytics',
    rows: [
      { label: 'Dashboard (16 widgets)', values: [true, true, true, true] },
      { label: 'Revenue reports', values: [false, true, true, true] },
      { label: 'Job completion reports', values: [false, true, true, true] },
      { label: 'Tech performance reports', values: [false, true, true, true] },
      { label: 'Route profitability reports', values: [false, true, true, true] },
      { label: 'Customer retention reports', values: [false, true, true, true] },
      { label: 'Overdue invoice aging', values: [false, true, true, true] },
      { label: 'Data export (CSV/PDF/ZIP)', values: [true, true, true, true] },
    ],
  },
  {
    group: 'Platform & Support',
    rows: [
      { label: 'Mobile crew view (no app store)', values: [true, true, true, true] },
      { label: 'PWA (install on phone)', values: [true, true, true, true] },
      { label: 'Time tracking & job costing', values: [false, true, true, true] },
      { label: 'White-label option', values: [false, false, true, true] },
      { label: 'Priority support', values: [false, false, true, true] },
      { label: 'Dedicated onboarding', values: [false, false, false, true] },
      { label: 'Custom integrations', values: [false, false, false, true] },
    ],
  },
];

function CellValue({ value, isCommand }) {
  if (typeof value === 'boolean') {
    return (
      <span
        style={{
          fontSize: 18,
          fontWeight: 700,
          color: value ? '#3D5CFF' : 'rgba(255,255,255,0.25)',
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
        color: isCommand ? '#fff' : 'rgba(255,255,255,0.75)',
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

      {/* Hero */}
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
      <section style={{ padding: '0 24px 80px', background: 'var(--color-bg)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', overflowX: 'auto' }}>
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
                    padding: '20px 16px',
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
                      padding: '20px 16px',
                      position: 'sticky',
                      top: 64,
                      background: plan.popular ? 'rgba(61,92,255,0.08)' : 'var(--color-bg)',
                      zIndex: 10,
                      borderBottom: '2px solid rgba(255,255,255,0.1)',
                      borderLeft: plan.popular ? '1px solid rgba(61,92,255,0.4)' : 'none',
                      borderRight: plan.popular ? '1px solid rgba(61,92,255,0.4)' : 'none',
                      width: '16.25%',
                    }}
                  >
                    {plan.popular && (
                      <div
                        style={{
                          display: 'inline-block',
                          background: 'var(--color-primary)',
                          color: '#fff',
                          fontSize: 10,
                          fontWeight: 700,
                          letterSpacing: '0.06em',
                          textTransform: 'uppercase',
                          padding: '3px 10px',
                          borderRadius: 20,
                          marginBottom: 8,
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
                      }}
                    >
                      {plan.price}
                      {plan.price !== 'Custom' && (
                        <span style={{ fontSize: 12 }}>/mo</span>
                      )}
                    </div>
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
                            color: 'rgba(255,255,255,0.8)',
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
      </section>

      <Footer />
    </>
  );
}
