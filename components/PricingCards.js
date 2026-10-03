'use client';

import { useState } from 'react';
import Link from 'next/link';
import { PLAN_METADATA } from '@/lib/planData';

const ACTIVE_CUSTOMER_DEF =
  'Active customers are customers currently managed in your account. Archive any customer at any time to free up a slot — their complete history, invoices, and job records are always retained.';

// Feature lists for each plan (human-readable labels shown on pricing cards).
// Plan gates (which plan first unlocks a feature) live in lib/planData.js.
const PLAN_INCLUDED = {
  Solo: [
    'Job scheduling & tracking',
    'Recurring jobs',
    'Route management',
    'Invoicing & payments',
    'Estimates & quotes',
    'Quote approval in customer portal',
    'Partial payments',
    'Online payments (card & ACH)',
    'Customer portal',
    'Lead management (Kanban)',
    'Embeddable lead capture form',
    'Transaction & bank register',
    'Credits & refunds',
    'Automated customer notifications',
    'Appointment reminders',
    'Review requests',
    'Customer CRM & custom fields',
    'Route sheet & job photos',
    'Mileage tracking',
    'Materials catalog & inventory',
    'Analytics & reporting dashboard',
    'Data export',
    'Custom branding',
    'Light mode and dark mode',
    'Personalized shortcuts bar',
  ],
  Core: [
    'Everything in Solo',
    'Unlimited team members',
    'Job scheduling & tracking',
    'Recurring jobs',
    'Invoicing & payments',
    'Online payments (card & ACH)',
    'Customer portal',
    'Transaction & bank register',
    'Materials catalog & inventory',
    'Analytics & reporting dashboard',
    'Automated customer notifications',
    'Review requests',
    'Vehicle & equipment tracking',
    'Attendance & time off',
    'Time tracking & timecards',
    'Mileage tracking',
    'Mobile team view',
    'Data export',
    'Route management',
    'Credits & refunds',
    'Performance reviews',
    'Incident tracking',
    'Holiday Management',
    'Billing Cycles',
    'GPS field tracking (phone-based, no hardware)',
    'Daily truck inspection and checklists',
    'Employee ID and PIN login',
    'Parts on order',
    'Purchase orders',
    'Custom branding',
    'Light mode and dark mode',
    'Personalized shortcuts bar',
  ],
  Field: [
    'Everything in Core',
    'Leads & quote management',
    'Estimates & quotes',
    'Quote approval in customer portal',
    'Subcontractor management',
    'Maintenance scheduling',
    'Partial payments',
    'Structured payment plans',
    'Embeddable lead capture form',
    'Employee termination workflow',
    'Route Intelligence',
    'Employee asset checkout',
    'Multiple service locations (+$59/mo per location)',
  ],
  Command: [
    'Everything in Field',
    'Automations & rules engine',
    'In-app messaging',
    'Messaging in customer portal',
    'QuickBooks sync',
    'AI support chatbot',
    'Automated follow-up sequences',
    'Priority support',
    'Multiple service locations (+$79/mo per location)',
  ],
  Enterprise: [
    'Everything in Command',
    'No active customer limit',
    'White-glove onboarding',
    'Direct support',
    'Custom pricing',
  ],
};

// Build the PLANS array from the canonical PLAN_METADATA + feature lists above.
const PLANS = PLAN_METADATA.map((meta) => ({
  ...meta,
  included: PLAN_INCLUDED[meta.name] ?? [],
  excluded: [],
}));

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
        stroke="rgba(255,255,255,0.6)"
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
              2 months free
            </span>
          )}
        </button>
        {!annual && (
          <span style={{ color: 'var(--color-white-60)', fontSize: 13 }}>
            → Switch to Annual &amp; get 2 months free
          </span>
        )}
      </div>

      {/* Active customer info box */}
      <div
        style={{
          maxWidth: 680,
          margin: '0 auto 20px',
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

      {/* Portal & payments callout */}
      <div
        style={{
          maxWidth: 680,
          margin: '0 auto 40px',
          background: 'rgba(61,92,255,0.08)',
          border: '1px solid rgba(61,92,255,0.35)',
          borderRadius: 8,
          padding: '14px 18px',
          display: 'flex',
          gap: 10,
          alignItems: 'flex-start',
        }}
      >
        <span style={{ fontSize: 16 }}>🌐</span>
        <p
          style={{
            margin: 0,
            fontSize: 13,
            color: 'rgba(255,255,255,0.8)',
            lineHeight: 1.6,
          }}
        >
          <strong style={{ color: '#fff' }}>Every plan includes a customer portal and online payments.</strong>{' '}
          No add-ons, no upcharges. Customers sign in by secure link or one-time code — no password required.
          Online invoice payment (card &amp; ACH) requires connecting a supported payment processor (Stripe, Square, or PayPal).
        </p>
      </div>

      {/* Cards grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
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

            {/* Users / banner callout */}
            <div
              style={{
                marginBottom: 14,
                background: 'rgba(61,92,255,0.12)',
                border: '1px solid rgba(61,92,255,0.4)',
                borderRadius: 8,
                padding: '12px 14px',
              }}
            >
              {plan.usersLabel ? (
                <>
                  <p style={{ fontSize: 13, fontWeight: 700, color: '#fff', margin: '0 0 4px', lineHeight: 1.55 }}>
                    {plan.usersLabel}
                  </p>
                  <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.65)', margin: 0, lineHeight: 1.5 }}>
                    {plan.banner}
                  </p>
                </>
              ) : (
                <p style={{ fontSize: 13, fontWeight: 700, color: '#fff', margin: 0, lineHeight: 1.55 }}>
                  {plan.banner}
                </p>
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
              {/* Active customers row */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'nowrap',
                  gap: 8,
                  marginBottom: 8,
                }}
              >
                <span style={{ color: 'var(--color-white-60)', whiteSpace: 'nowrap' }}>Active customers:</span>
                <span style={{ fontWeight: 600, whiteSpace: 'nowrap' }}>{plan.activeCustomers}</span>
              </div>

              {/* Texts included row */}
              <div
                style={{
                  paddingTop: 8,
                  borderTop: '1px solid rgba(255,255,255,0.07)',
                  color: 'var(--color-white-60)',
                  fontSize: 12,
                  lineHeight: 1.55,
                }}
              >
                {plan.textsIncluded === 'Custom' ? (
                  <span>Custom text volume.</span>
                ) : (
                  <span>
                    <strong style={{ color: '#fff' }}>
                      {typeof plan.textsIncluded === 'number'
                        ? plan.textsIncluded.toLocaleString()
                        : plan.textsIncluded}{' '}
                      texts/month included.
                    </strong>{' '}
                    Occasional overages are on us. Regularly over? We&apos;ll reach out about a text package that fits — no surprise bills.
                  </span>
                )}
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
