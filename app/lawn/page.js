// /lawn — landing page for lawn care companies. A printed flyer's QR code opens it.
// One job: start the free trial. Server-rendered; only the setup code field and
// the sign-up links (which carry the code) are client components.
import Link from 'next/link';
import Footer from '@/components/Footer';
import ZIcon from '@/components/ZIcon';
import ZerbiqBrand, { brandify } from '@/components/ZerbiqBrand';
import { PLAN_METADATA } from '@/lib/planData.js';
import { pageMetadata } from '@/lib/seo.mjs';
import { FOUNDER_NAME, FOUNDER_PHONE, FOUNDER_PHONE_HREF, PRIMARY_CTA_LABEL, SUPPORT_EMAIL } from '@/lib/siteConfig.mjs';
import LawnSetupCodeForm from './LawnSetupCodeForm';
import LawnSignupLink from './LawnSignupLink';

export const metadata = pageMetadata({
  title: 'Zerbiq for Lawn Care Companies | Schedule, Invoice, Get Paid',
  description:
    'Lawn care software for owner-operators and growing crews. Schedule jobs, build routes, send invoices and track payments in one place. FREE setup, 14-day free trial, no credit card required.',
  path: '/lawn',
});

const plan = (name) => PLAN_METADATA.find((p) => p.name === name);

/** The two plans the flyer shows. Prices come from lib/planData.js (the site's one source). */
const LAWN_PLANS = [
  { id: 'solo', name: 'Solo', blurb: 'One user. Ideal for owner-operators.', price: plan('Solo').monthlyPrice },
  { id: 'core', name: 'Core', blurb: 'Unlimited users. Built for growing crews.', price: plan('Core').monthlyPrice },
];

const CHECKLIST = [
  'Schedule jobs',
  'Build routes',
  'Send invoices',
  'Track payments',
  'Manage your crew',
  'Customer history',
];

const STEPS = [
  'Look around and see what Zerbiq can do.',
  'Sign up and enter your setup code.',
  'Subscribe. We set up your account free.',
];

function PhoneIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
      <path
        d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1L6.6 10.8Z"
        fill="currentColor"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
      <path d="m4.5 12.5 5 5 10-11" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function LawnPage() {
  const soloPrice = plan('Solo').monthlyPrice;
  return (
    <>
      <div className="lawn-page">
        <header className="lawn-header lawn-on-green">
          <div className="lawn-wrap lawn-header-row">
            <Link href="/" className="lawn-logo">
              <ZIcon size={28} />
              <span className="lawn-logo-word">
                <ZerbiqBrand />
              </span>
            </Link>
            <div className="lawn-header-actions">
              <a href={FOUNDER_PHONE_HREF} className="lawn-header-phone" aria-label={`Call ${FOUNDER_PHONE}`}>
                <PhoneIcon />
                <span className="lawn-header-phone-text">{FOUNDER_PHONE}</span>
              </a>
              <LawnSignupLink plan="solo" className="lawn-btn lawn-btn-lime lawn-btn-small">
                Start free trial
              </LawnSignupLink>
            </div>
          </div>
        </header>

        <main>
          <section className="lawn-hero lawn-on-green" aria-labelledby="lawn-hero-title">
            <div className="lawn-wrap">
              <p className="lawn-eyebrow">Built for lawn care companies</p>
              <h1 id="lawn-hero-title" className="lawn-h1">
                Trim the paperwork. <span className="lawn-nowrap">Grow the business.</span>
              </h1>
              <p className="lawn-lead">
                Stop chasing paperwork. Schedule jobs, send invoices and track payments in one place.
              </p>
              <div className="lawn-offer">
                <p className="lawn-offer-title">FREE setup, from ${soloPrice}/mo</p>
                <p className="lawn-offer-note">14-day free trial. No credit card needed.</p>
              </div>
              <LawnSetupCodeForm />
            </div>
          </section>

          <section className="lawn-section" aria-labelledby="lawn-juggling-title">
            <div className="lawn-wrap">
              <h2 id="lawn-juggling-title" className="lawn-h2">
                Stop juggling apps.
              </h2>
              <p className="lawn-body">Notes, texts and paper invoices, all in one place. We help you get set up, free.</p>
              <ul className="lawn-checklist">
                {CHECKLIST.map((item) => (
                  <li key={item}>
                    <CheckIcon />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="lawn-section lawn-section-tight" aria-labelledby="lawn-pricing-title">
            <div className="lawn-wrap">
              <h2 id="lawn-pricing-title" className="lawn-h2 lawn-h2-small">
                Pricing
              </h2>
              <ul className="lawn-plans">
                {LAWN_PLANS.map((p) => (
                  <li key={p.id} className="lawn-plan">
                    <div className="lawn-plan-text">
                      <h3 className="lawn-plan-name">{p.name}</h3>
                      <p className="lawn-plan-blurb">{p.blurb}</p>
                    </div>
                    <p className="lawn-plan-price">${p.price}/mo</p>
                    <LawnSignupLink plan={p.id} className="lawn-btn lawn-btn-green lawn-plan-btn">
                      {PRIMARY_CTA_LABEL}
                      <span className="lawn-sr-only"> for {p.name}</span>
                    </LawnSignupLink>
                  </li>
                ))}
              </ul>
              <p className="lawn-more-plans">
                <Link href="/pricing">Larger plans available.</Link>
              </p>
            </div>
          </section>

          <section className="lawn-section lawn-section-tight" aria-label="Free setup">
            <div className="lawn-wrap">
              <div className="lawn-band-lime">
                <p className="lawn-band-title">FREE setup for lawn care companies</p>
                <p className="lawn-band-note">14-day free trial. No credit card required.</p>
              </div>
            </div>
          </section>

          <section className="lawn-section lawn-section-tight" aria-labelledby="lawn-start-title">
            <div className="lawn-wrap">
              <div className="lawn-start lawn-on-green">
                <h2 id="lawn-start-title" className="lawn-start-title">
                  How to start
                </h2>
                <ol className="lawn-steps">
                  {STEPS.map((s, i) => (
                    <li key={s}>
                      <span className="lawn-step-num">{i + 1}.</span> <span>{brandify(s)}</span>
                    </li>
                  ))}
                </ol>
                <LawnSignupLink plan="solo" className="lawn-btn lawn-btn-lime">
                  Start free trial
                </LawnSignupLink>
              </div>
            </div>
          </section>

          <section className="lawn-section lawn-contact" aria-labelledby="lawn-contact-title">
            <div className="lawn-wrap">
              <h2 id="lawn-contact-title" className="lawn-contact-title">
                Questions? Call {FOUNDER_NAME}, Founder
              </h2>
              <p className="lawn-contact-links">
                <a href={FOUNDER_PHONE_HREF}>{FOUNDER_PHONE}</a>
                <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>
              </p>
            </div>
          </section>
        </main>
      </div>
      <Footer />
    </>
  );
}
