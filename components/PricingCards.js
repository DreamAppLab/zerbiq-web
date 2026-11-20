'use client';

import { useState } from 'react';
import Link from 'next/link';
import { brandify } from '@/components/ZerbiqBrand';
import { PLAN_METADATA, MULTI_LOCATION_FEE, WEEKLY_VISITS_EXPLAINER, ANNUAL_SAVINGS_LABEL, enterprisePriceLabel, formatPlanPrice, formatAnnualMonthlyEquivalent, PAYMENT_PROCESSORS_NOTE, weeklyVisitsLabel, planStorageLabel, planCapacityShortLabel, assistantQuestionsFeatureLabel } from '@/lib/planData';

// Feature lists for each plan (human-readable labels shown on pricing cards).
// Plan gates (which plan first unlocks a feature) live in lib/planData.js.
const PLAN_INCLUDED = {
  Solo: [
    'Unlimited routes (route management)',
    'Job scheduling & tracking',
    'Recurring jobs',
    'Estimates & quotes',
    'Quote approval in customer portal',
    'Invoicing & payments',
    'Online payments (card & ACH)',
    'QuickBooks Online sync',
    'Customer portal',
    'Transaction & bank register',
    'Materials catalog & inventory',
    'Analytics & reporting dashboard',
    'Automated customer notifications (email; texting is an optional add-on)',
    'Review requests (by email)',
    'Mobile team view (any smartphone browser)',
    'Data export',
    'Credits & refunds',
    'Partial payments and payment plans',
    'Automated late fees',
    'Purchase orders',
    'Roles & permissions',
    'Time tracking & timecards',
    'Attendance & time off',
    'GPS field tracking (phone-based, no hardware)',
    'Employee ID and PIN login',
    'Employee termination workflow',
    'Holiday Management',
    'Billing Cycles',
    'Parts on order',
    'Custom branding',
    'Light mode and dark mode',
    'Personalized shortcuts bar',
    assistantQuestionsFeatureLabel('Solo'),
  ],
  Core: [
    'Everything in Solo',
    'Unlimited team members',
    'Team messaging (staff-to-staff)',
    assistantQuestionsFeatureLabel('Core'),
  ],
  Field: [
    'Everything in Core',
    'Route optimization & Rebalance all routes (Route Intelligence)',
    'Vehicles, trailers, equipment, tools & mileage',
    'Daily truck inspections and checklists',
    'Commissions & per-job team pay',
    'Leads inbox & pipeline',
    'Subcontractor management',
    'Maintenance scheduling',
    'Embeddable lead capture form',
    'Employee asset checkout',
    `Multiple service locations (+$${MULTI_LOCATION_FEE.Field}/mo per location)`,
    assistantQuestionsFeatureLabel('Field'),
  ],
  Command: [
    'Everything in Field',
    'Performance reviews',
    'Incident tracking',
    'Tech performance reports',
    'Advanced reports & job costing',
    'Automations & rules engine',
    'In-app messaging',
    'Messaging in customer portal',
    'Automated follow-up sequences',
    'Priority support',
    `Multiple service locations (+$${MULTI_LOCATION_FEE.Command}/mo per location)`,
    assistantQuestionsFeatureLabel('Command'),
  ],
  Enterprise: [
    'Everything in Command',
    'Open to smaller teams that want its extra features',
    'Direct support',
    'Quoted pricing and allowances',
    assistantQuestionsFeatureLabel('Enterprise'),
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
      aria-hidden="true"
      focusable="false"
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
      aria-hidden="true"
      focusable="false"
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
          type="button"
          aria-pressed={!annual}
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
          type="button"
          aria-pressed={annual}
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
          {(
            <span
              style={{
                background: 'rgba(255,255,255,0.2)',
                borderRadius: 4,
                padding: '2px 6px',
                fontSize: 11,
                fontWeight: 700,
              }}
            >
              {ANNUAL_SAVINGS_LABEL}
            </span>
          )}
        </button>
        <span style={{ color: 'var(--color-white-60)', fontSize: 13 }}>
          {annual ? `Annual billing: ${ANNUAL_SAVINGS_LABEL}` : `Switch to Annual and get ${ANNUAL_SAVINGS_LABEL}`}
        </span>
      </div>

      {/* Weekly visits info box */}
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
        <span aria-hidden="true" style={{ fontSize: 16 }}>💡</span>
        <p
          style={{
            margin: 0,
            fontSize: 13,
            color: 'var(--color-white-60)',
            lineHeight: 1.6,
          }}
        >
          <strong style={{ color: '#fff' }}>No customer limit on any plan.</strong>{' '}
          Your plan is sized by the completed visits you do each week. {WEEKLY_VISITS_EXPLAINER}
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
        <span aria-hidden="true" style={{ fontSize: 16 }}>🌐</span>
        <p
          style={{
            margin: 0,
            fontSize: 13,
            color: 'rgba(255,255,255,0.8)',
            lineHeight: 1.6,
          }}
        >
          <strong style={{ color: '#fff' }}>Every plan includes a customer portal and online payments.</strong>{' '}
          The portal has no add-ons and no upcharges. Customers sign in by secure link or one-time code — no password required.
          Online invoice payment (card &amp; ACH) requires connecting a payment processor account of your own ({PAYMENT_PROCESSORS_NOTE}).
        </p>
      </div>

      {/* Cards grid — 5 across on desktop, stacked on mobile */}
      <style>{`
        .pricing-cards-grid {
          display: grid;
          grid-template-columns: repeat(5, minmax(0, 1fr));
          gap: 14px;
          align-items: start;
        }
        @media (max-width: 1100px) {
          .pricing-cards-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        }
        @media (max-width: 700px) {
          .pricing-cards-grid { grid-template-columns: 1fr; }
        }
      `}</style>
      <div className="pricing-cards-grid">
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
              padding: '22px 16px',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              minWidth: 0,
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
              {plan.monthlyPrice != null ? (
                <>
                  <span style={{ fontSize: 'clamp(28px, 2vw, 36px)', fontWeight: 900, letterSpacing: '-0.03em' }}>
                    ${annual ? formatPlanPrice(plan.annualPrice) : formatPlanPrice(plan.monthlyPrice)}
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
                      ~${formatAnnualMonthlyEquivalent(plan.monthlyPrice, plan.annualPrice)}/mo billed annually
                    </div>
                  )}
                </>
              ) : (
                <span style={{ fontSize: 'clamp(20px, 1.6vw, 26px)', fontWeight: 900, letterSpacing: '-0.03em' }}>{enterprisePriceLabel()}</span>
              )}
            </div>

            {/* Limits, in this order: weekly visits, users, storage, approximate capacity */}
            <div
              style={{
                background: 'var(--color-surface)',
                borderRadius: 8,
                padding: '12px 14px',
                marginBottom: 24,
                fontSize: 13,
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
              }}
            >
              <div>
                <div style={{ color: 'var(--color-white-60)' }}>Completed visits:</div>
                <div style={{ fontWeight: 600 }}>{weeklyVisitsLabel(plan.name)}</div>
              </div>
              <div>
                <div style={{ color: 'var(--color-white-60)' }}>Users:</div>
                <div style={{ fontWeight: 600 }}>
                  {plan.users === 1 ? '1 user' : 'Unlimited users, no per-seat fees'}
                </div>
              </div>
              <div>
                <div style={{ color: 'var(--color-white-60)' }}>Storage:</div>
                <div style={{ fontWeight: 600 }}>{planStorageLabel(plan.name)}</div>
                {planCapacityShortLabel(plan.name) && (
                  <div style={{ color: 'var(--color-white-60)', fontSize: 12, marginTop: 2 }}>{planCapacityShortLabel(plan.name)}</div>
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
                  {brandify(f)}
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
