'use client';

import { useState } from 'react';
import Link from 'next/link';

const ACTIVE_CUSTOMER_DEF =
  'Active customers are customers currently managed in your account. Archive any customer at any time to free up a slot — their complete history, invoices, and job records are always retained.';

const PLANS = [
  {
    name: 'Core',
    monthlyPrice: 49,
    annualPrice: 539,
    subtitle: 'For solo operators just getting started',
    activeCustomers: 'Up to 500',
    recurringCustomers: 'Up to 150',
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
      'Estimates & quotes',
      'Customer CRM & portal',
      'Credits & refunds',
      'Multiple service locations',
      'Chemical & material logs',
      'Job photos & expenses',
      'GPS & mileage tracking',
      'Complaints tracking',
      'Employee management',
      'Tax configuration',
      'Mobile crew view',
    ],
    excluded: [
      'Partial payments & payment plans',
      'Materials catalog & inventory',
      'Purchase orders',
      'Time tracking & job costing',
      'Advanced reporting',
      'Automated late fees',
      'Maintenance calendar',
      'QuickBooks sync',
    ],
  },
  {
    name: 'Field',
    monthlyPrice: 99,
    annualPrice: 1089,
    subtitle: 'For growing operations with multiple crews',
    activeCustomers: 'Up to 1,500',
    recurringCustomers: 'Up to 400',
    cta: 'Start Free Trial',
    ctaHref: '/signup',
    ctaExternal: false,
    popular: false,
    included: [
      'Everything in Core',
      'Partial payments & payment plans',
      'Job cancellations with optional fees',
      'Subcontractor management',
      'Materials catalog & inventory',
      'Purchase orders',
      'Time tracking & job costing',
      'Advanced reporting',
      'Dispatch board',
    ],
    excluded: [
      'Automated late fees',
      'Automated reminders',
      'Maintenance calendar',
      'QuickBooks sync',
      'White-label option',
    ],
  },
  {
    name: 'Command',
    monthlyPrice: 149,
    annualPrice: 1639,
    subtitle: 'For established businesses running at scale',
    activeCustomers: 'Up to 5,000',
    recurringCustomers: 'Up to 1,000',
    badge: 'Most Popular',
    popular: true,
    cta: 'Start Free Trial',
    ctaHref: '/signup',
    ctaExternal: false,
    included: [
      'Everything in Field',
      'Automated late fees',
      'Automated reminders',
      'Maintenance calendar',
      'QuickBooks sync',
      'White-label option',
      'Priority support',
    ],
    excluded: [],
  },
  {
    name: 'Enterprise',
    monthlyPrice: null,
    annualPrice: null,
    subtitle: 'For large operations that need more',
    activeCustomers: 'Unlimited',
    recurringCustomers: 'Unlimited',
    popular: false,
    cta: 'Contact Us',
    ctaHref: 'mailto:hello@zerbiq.com',
    ctaExternal: true,
    included: [
      'Everything in Command',
      'Dedicated onboarding',
      'Custom integrations',
      'SLA guarantee',
      'Assigned account manager',
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
            → Switch to Annual &amp; save 1 month
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
                <span style={{ fontSize: 36, fontWeight: 900 }}>Custom</span>
              )}
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
                  marginBottom: 6,
                }}
              >
                <span style={{ color: 'var(--color-white-60)' }}>Active customers</span>
                <span style={{ fontWeight: 600 }}>{plan.activeCustomers}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--color-white-60)' }}>Recurring customers</span>
                <span style={{ fontWeight: 600 }}>{plan.recurringCustomers}</span>
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

      {/* White-glove callout */}
      <div
        style={{
          marginTop: 40,
          background: 'var(--color-surface)',
          border: '1px solid var(--color-white-10)',
          borderRadius: 12,
          padding: '24px 28px',
          textAlign: 'center',
        }}
      >
        <p
          style={{
            fontSize: 15,
            color: '#fff',
            margin: '0 0 8px',
            fontWeight: 600,
          }}
        >
          Need help getting set up fast?
        </p>
        <p
          style={{
            fontSize: 14,
            color: 'var(--color-white-60)',
            margin: 0,
            lineHeight: 1.7,
          }}
        >
          Our <strong style={{ color: '#fff' }}>White-Glove Onboarding</strong> is a one-time{' '}
          <strong style={{ color: '#fff' }}>$599</strong> add-on. We Zoom with you for 60–90
          minutes, import your customer list, build your routes, add your team, configure your
          settings — and guarantee you&apos;re live before the call ends.
        </p>
      </div>
    </div>
  );
}
