'use client';

import { useState } from 'react';
import Link from 'next/link';

const ACTIVE_CUSTOMER_DEF =
  'Active customers are customers currently managed in your account. Archive any customer at any time to free up a slot — their complete history, invoices, and job records are always retained.';

const PLANS = [
  {
    name: 'Core',
    monthlyPrice: 79,
    annualPrice: 869,
    subtitle: 'For solo operators just getting started',
    activeCustomers: '500',
    recurringCustomers: '250',
    cta: 'Start Free Trial',
    ctaHref: '/signup',
    ctaExternal: false,
    popular: false,
    included: [
      'Unlimited routes',
      'Unlimited team members',
      'Job scheduling & tracking',
      'Recurring jobs',
      'Invoicing & payments',
      'Transaction & bank register',
      'Materials catalog & inventory',
      'Analytics & reporting dashboard',
      'Automated customer notifications',
      'Review requests',
      'Vehicle & equipment tracking',
      'Attendance & time off',
      'Time tracking & timecards',
      'Mileage tracking',
      'Mobile crew view',
      'Data export',
      'Route management',
      'Credits & refunds',
      'Partial payments',
      'Performance reviews',
      'Employee asset checkout',
      'Incident tracking',
    ],
    excluded: [],
  },
  {
    name: 'Field',
    monthlyPrice: 129,
    annualPrice: 1419,
    subtitle: 'For growing operations with multiple crews',
    activeCustomers: '1,000',
    recurringCustomers: '750',
    cta: 'Start Free Trial',
    ctaHref: '/signup',
    ctaExternal: false,
    popular: false,
    included: [
      'Everything in Core',
      'Leads & quote management',
      'Estimates & quotes',
      'Online payment processing (card/ACH)',
      'Customer portal',
      'Subcontractor management',
      'Maintenance scheduling',
      'Payment plans',
      'Purchase orders',
      'Embeddable lead capture form',
      'Employee termination workflow',
    ],
    excluded: [
      'Automations & rules engine',
      'In-app messaging',
      'QuickBooks sync (coming soon)',
      'AI support chatbot',
    ],
  },
  {
    name: 'Command',
    monthlyPrice: 179,
    annualPrice: 1969,
    subtitle: 'For established businesses running at scale',
    activeCustomers: '2,500',
    recurringCustomers: '1,500',
    badge: 'Most Popular',
    popular: true,
    cta: 'Start Free Trial',
    ctaHref: '/signup',
    ctaExternal: false,
    included: [
      'Everything in Field',
      'Automations & rules engine',
      'In-app messaging',
      'QuickBooks sync (coming soon)',
      'AI support chatbot',
      'Priority support',
    ],
    excluded: [],
  },
  {
    name: 'Enterprise',
    monthlyPrice: null,
    annualPrice: null,
    subtitle: 'For operations managing 2,500+ customers',
    activeCustomers: 'Unlimited',
    recurringCustomers: 'Unlimited',
    popular: false,
    cta: 'Contact Us',
    ctaHref: 'mailto:hello@zerbiq.com',
    ctaExternal: true,
    included: [
      'Everything in Command',
      'No active customer limit',
      'White-glove onboarding',
      'Direct support',
      'Custom pricing',
    ],
    excluded: [],
  },
];

function CheckIcon({ included }) {
  return included ? (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      style={{ flexShrink: 0, marginTop: 2 }}
    >
      <circle cx="8" cy="8" r="8" fill="rgba(61,92,255,0.15)" />
      <path
        d="M5 8l2 2 4-4"
        stroke="#3D5CFF"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ) : (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      style={{ flexShrink: 0, marginTop: 2 }}
    >
      <circle cx="8" cy="8" r="8" fill="rgba(255,255,255,0.05)" />
      <path
        d="M10 6L6 10M6 6l4 4"
        stroke="rgba(255,255,255,0.25)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function PricingCards() {
  const [annual, setAnnual] = useState(false);

  return (
    <div>
      {/* Toggle */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: 24,
          gap: 12,
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
      >
        <button
          onClick={() => setAnnual(false)}
          style={{
            background: !annual ? 'var(--color-primary)' : 'var(--color-raised)',
            color: '#fff',
            border: 'none',
            borderRadius: 6,
            padding: '8px 20px',
            fontWeight: 600,
            fontSize: 14,
            cursor: 'pointer',
            transition: 'background 0.2s',
          }}
        >
          Monthly
        </button>
        <button
          onClick={() => setAnnual(true)}
          style={{
            background: annual ? 'var(--color-primary)' : 'var(--color-raised)',
            color: '#fff',
            border: 'none',
            borderRadius: 6,
            padding: '8px 20px',
            fontWeight: 600,
            fontSize: 14,
            cursor: 'pointer',
            transition: 'background 0.2s',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          Annual
          {annual && (
            <span
              style={{
                background: 'rgba(255,255,255,0.2)',
                borderRadius: 4,
                padding: '2px 6px',
                fontSize: 11,
                fontWeight: 700,
              }}
            >
              Save 1 month
            </span>
          )}
        </button>
        {!annual && (
          <span style={{ color: 'var(--color-white-60)', fontSize: 13 }}>
            → Switch to Annual &amp; save one month&apos;s cost
          </span>
        )}
      </div>

      {/* Active customer info box */}
      <div
        style={{
          maxWidth: 680,
          margin: '0 auto 40px',
          background: 'var(--color-raised)',
          border: '1px solid var(--color-white-10)',
          borderRadius: 8,
          padding: '14px 18px',
          display: 'flex',
          gap: 10,
          alignItems: 'flex-start',
        }}
      >
        <span style={{ fontSize: 16 }}>💡</span>
        <p
          style={{
            margin: 0,
            fontSize: 13,
            color: 'var(--color-white-60)',
            lineHeight: 1.6,
          }}
        >
          {ACTIVE_CUSTOMER_DEF}
        </p>
      </div>

      {/* Cards grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: 20,
          alignItems: 'start',
        }}
      >
        {PLANS.map((plan) => (
          <div
            key={plan.name}
            className={plan.popular ? 'card-popular' : ''}
            style={{
              background: 'var(--color-raised)',
              border: plan.popular
                ? '2px solid var(--color-primary)'
                : '1px solid var(--color-white-10)',
              borderRadius: 12,
              padding: 28,
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {plan.badge && (
              <div
                style={{
                  position: 'absolute',
                  top: -13,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: 'var(--color-primary)',
                  color: '#fff',
                  borderRadius: 20,
                  padding: '4px 14px',
                  fontSize: 12,
                  fontWeight: 700,
                  whiteSpace: 'nowrap',
                }}
              >
                {plan.badge}
              </div>
            )}

            <h3 style={{ fontWeight: 800, fontSize: 20, margin: '0 0 4px' }}>{plan.name}</h3>
            <p
              style={{
                color: 'var(--color-white-60)',
                fontSize: 13,
                margin: '0 0 20px',
                lineHeight: 1.5,
              }}
            >
              {plan.subtitle}
            </p>

            {/* Price */}
            <div style={{ marginBottom: 20 }}>
              {plan.monthlyPrice ? (
                <>
                  <span style={{ fontSize: 40, fontWeight: 900, letterSpacing: '-0.03em' }}>
                    ${annual ? plan.annualPrice.toLocaleString() : plan.monthlyPrice}
                  </span>
                  <span
                    style={{ color: 'var(--color-white-60)', fontSize: 14, marginLeft: 4 }}
                  >
                    /{annual ? 'yr' : 'mo'}
                  </span>
                  {annual && (
                    <div
                      style={{
                        color: 'var(--color-white-60)',
                        fontSize: 12,
                        marginTop: 4,
                      }}
                    >
                      ~${Math.round(plan.annualPrice / 12)}/mo billed annually
                    </div>
                  )}
                </>
              ) : (
                <span style={{ fontSize: 40, fontWeight: 900, letterSpacing: '-0.03em' }}>Custom</span>
              )}
            </div>

            {/* Unlimited users callout */}
            <div style={{ marginBottom: 14 }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-primary)' }}>
                Unlimited users included — no per-seat fees.
              </span>
            </div>

            {/* Limits */}
            <div
              style={{
                background: 'var(--color-surface)',
                borderRadius: 8,
                padding: '12px 14px',
                marginBottom: 24,
                fontSize: 13,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'nowrap',
                  gap: 8,
                  marginBottom: 6,
                }}
              >
                <span style={{ color: 'var(--color-white-60)', whiteSpace: 'nowrap' }}>Active customers:</span>
                <span style={{ fontWeight: 600, whiteSpace: 'nowrap' }}>{plan.activeCustomers}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'nowrap', gap: 8 }}>
                <span style={{ color: 'var(--color-white-60)', whiteSpace: 'nowrap' }}>Recurring customers:</span>
                <span style={{ fontWeight: 600, whiteSpace: 'nowrap' }}>{plan.recurringCustomers}</span>
              </div>
            </div>

            {/* CTA */}
            {plan.ctaExternal ? (
              <a
                href={plan.ctaHref}
                className={plan.popular ? 'btn-cta-filled' : 'btn-cta-ghost'}
              >
                {plan.cta}
              </a>
            ) : (
              <Link
                href={plan.ctaHref}
                className={plan.popular ? 'btn-cta-filled' : 'btn-cta-ghost'}
              >
                {plan.cta}
              </Link>
            )}

            {/* Features */}
            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
              }}
            >
              {plan.included.map((f) => (
                <li
                  key={f}
                  style={{
                    display: 'flex',
                    gap: 10,
                    fontSize: 13,
                    lineHeight: 1.4,
                    color: '#fff',
                  }}
                >
                  <CheckIcon included={true} />
                  {f}
                </li>
              ))}
              {plan.excluded.map((f) => (
                <li
                  key={f}
                  style={{
                    display: 'flex',
                    gap: 10,
                    fontSize: 13,
                    lineHeight: 1.4,
                    color: 'var(--color-white-30)',
                  }}
                >
                  <CheckIcon included={false} />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

    </div>
  );
}
