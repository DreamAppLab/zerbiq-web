import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PricingCards from '@/components/PricingCards';
import { brandify } from '@/components/ZerbiqBrand';

const FAQ = [
  {
    q: 'Is there really no credit card required for the trial?',
    a: "Correct. Start your 14-day free trial with just your email. No card until you decide to subscribe.",
  },
  {
    q: 'What is an active customer?',
    a: "An active customer is any customer currently managed in your account. Archive customers you're no longer serving to free up your slot count — all their history stays saved.",
  },
  {
    q: 'What happens when my trial ends?',
    a: "Your account pauses. Your data is saved for 30 days. Subscribe anytime to reactivate instantly.",
  },
  {
    q: 'Can I change plans later?',
    a: 'Yes — upgrade or downgrade anytime. Changes take effect immediately and are prorated automatically.',
  },
  {
    q: 'What is the DIY setup option?',
    a: 'Every plan includes downloadable spreadsheet templates for customers, routes, and team members. Fill in your information and upload — most owners are fully set up in under an hour. No tech skills required.',
  },
  {
    q: 'What is White-Glove Onboarding?',
    a: 'Our White-Glove Onboarding is a one-time add-on — $299 for Core, $499 for Field, $699 for Command. We Zoom with you for 60–90 minutes, import your customer list, build your routes, add your team, and configure everything — guaranteed live before the call ends.',
  },
  {
    q: 'Do you offer annual billing?',
    a: 'Yes — annual billing saves you two full months. Get 12 months for the price of 10.',
  },
  {
    q: 'Do I need to download an app?',
    a: 'Zerbiq is available as a native app on iOS and Android — download it from the App Store or Google Play. It also runs in any browser and installs as a PWA directly from your phone without going through an app store. Your techs can be up and running in minutes on any device.',
  },
  {
    q: 'Can I import my existing customers?',
    a: 'Yes. Every plan includes DIY spreadsheet import — download our template, fill in your customers, routes, and team, and upload. Most owners are fully set up in under an hour. White-Glove Onboarding includes full data migration handled by our team.',
  },
  {
    q: 'What payment processors do you support?',
    a: 'Zerbiq supports Stripe, Square, and PayPal/Venmo for online payments. You can also accept cash, check, and onsite card payments on any plan without connecting a processor.',
  },
  {
    q: 'Is my data secure?',
    a: 'Yes. All data is encrypted in transit and at rest. Zerbiq uses enterprise-grade database hosting with row-level security — meaning each account\'s data is isolated and never accessible to other users.',
  },
  {
    q: 'What happens to my data if I cancel?',
    a: 'Your data is saved for 30 days after cancellation. You can export everything — customers, jobs, invoices, timecards, inventory — at any time before or after cancelling. Your data always belongs to you.',
  },
];

export const metadata = {
  title: 'Pricing — Zerbiq',
  description: 'Simple pricing for field service operators. Start free. Scale when ready.',
};

export default function PricingPage() {
  return (
    <>
      <Navbar />

      <section style={{ padding: '80px 24px 40px', textAlign: 'center' }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <h1
            style={{
              fontWeight: 900,
              fontSize: 'clamp(32px, 5vw, 56px)',
              letterSpacing: '-0.04em',
              margin: '0 0 20px',
              lineHeight: 1.05,
            }}
          >
            Simple pricing for serious operators
          </h1>
          <p style={{ color: 'var(--color-white-60)', fontSize: 17, lineHeight: 1.7, margin: 0 }}>
            No hidden fees. No confusing tiers. Start free and scale when you&apos;re ready.
          </p>
        </div>
      </section>

      <section style={{ padding: '0 24px 80px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <PricingCards />
        </div>
      </section>

      {/* Animated Pricing Banner */}
      <section
        style={{
          padding: '0 24px 64px',
          overflowX: 'hidden',
        }}
      >
        <style>{`
          @keyframes shimmer-pricing {
            0%   { transform: translateX(-100%); }
            100% { transform: translateX(500%); }
          }
          @keyframes strike-draw-pricing {
            0%   { width: 0; }
            100% { width: 100%; }
          }
          .banner-shimmer-pricing {
            position: absolute; top: 0; left: 0;
            width: 20%; height: 100%;
            background: linear-gradient(90deg, transparent, rgba(61,92,255,0.1), transparent);
            animation: shimmer-pricing 3s ease-in-out infinite;
            pointer-events: none;
          }
          @media (max-width: 768px) {
            .pricing-page-banner-card     { padding: 16px !important; }
            .pricing-page-banner-heading  { font-size: 20px !important; }
            .pricing-page-banner-subtitle { font-size: 13px !important; }
            .pricing-page-strike-row      { flex-direction: column !important; }
            .pricing-page-strike-badge    { width: 100%; max-width: 100%; box-sizing: border-box; font-size: 14px !important; }
            .pricing-page-confirm-badge   { width: 100%; box-sizing: border-box; display: block !important; font-size: 12px !important; }
            .pricing-page-banner-bottom   { font-size: 12px !important; }
          }
        `}</style>
        <div style={{ maxWidth: 1200, margin: '0 auto', boxSizing: 'border-box' }}>
          <div
            className="pricing-page-banner-card"
            style={{ position: 'relative', overflow: 'hidden', background: '#0A0A14', border: '2px solid #3D5CFF', borderRadius: 16, padding: '36px 40px', boxSizing: 'border-box', textAlign: 'center' }}
          >
            <div className="banner-shimmer-pricing" />
            <h2
              className="pricing-page-banner-heading"
              style={{ fontWeight: 900, fontSize: 'clamp(22px, 3.5vw, 40px)', letterSpacing: '-0.03em', margin: '0 0 12px', lineHeight: 1.2, position: 'relative' }}
            >
              <span style={{ display: 'block', textDecoration: 'underline', textDecorationColor: '#fff' }}>Priced per company.</span>
              <span style={{ display: 'block' }}>
                <span style={{ color: '#3D5CFF' }}>Not per person</span>
                <span style={{ background: 'linear-gradient(to bottom, #ffffff 50%, #3D5CFF 50%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>!</span>
              </span>
            </h2>
            <p
              className="pricing-page-banner-subtitle"
              style={{ color: 'rgba(255,255,255,0.7)', fontSize: 16, lineHeight: 1.65, margin: '0 0 24px', maxWidth: 560, position: 'relative' }}
            >
              One flat price for your entire operation — no matter how many people you add.
            </p>
            <div className="pricing-page-strike-row" style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 16, position: 'relative', justifyContent: 'center' }}>
              {[
                { text: '❌ $29/user/month extra techs',      delay: '0.5s' },
                { text: '❌ $29/seat office staff',            delay: '0.8s' },
                { text: '❌ Extra license seasonal workers',   delay: '1.1s' },
              ].map(({ text, delay }) => (
                <div
                  key={text}
                  className="pricing-page-strike-badge"
                  style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', padding: '6px 14px', background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: 6, fontSize: 16, color: 'rgba(255,255,255,0.65)', overflow: 'hidden', boxSizing: 'border-box' }}
                >
                  {text}
                  <div style={{ position: 'absolute', top: '50%', left: 0, height: 2, background: '#ef4444', width: 0, animationName: 'strike-draw-pricing', animationDuration: '0.5s', animationDelay: delay, animationFillMode: 'forwards', animationTimingFunction: 'ease-out' }} />
                </div>
              ))}
            </div>
            <div
              className="pricing-page-confirm-badge"
              style={{ display: 'inline-block', background: 'rgba(61,92,255,0.15)', border: '1px solid rgba(61,92,255,0.4)', borderRadius: 8, padding: '8px 16px', fontSize: 14, fontWeight: 600, color: '#fff', marginBottom: 20, position: 'relative', boxSizing: 'border-box' }}
            >
              ✓ Unlimited owners, office staff, techs, and seasonal workers — one price
            </div>
            <p
              className="pricing-page-banner-bottom"
              style={{ color: 'rgba(255,255,255,0.45)', fontSize: 14, margin: 0, lineHeight: 1.7, position: 'relative' }}
            >
              Add your whole team on day one. No per-seat math. No surprise charges. No licenses to cancel when someone leaves.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: '80px 24px', background: 'var(--color-surface)' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <h2
            style={{
              fontWeight: 900,
              fontSize: 'clamp(24px, 3.5vw, 40px)',
              letterSpacing: '-0.03em',
              marginBottom: 48,
              textAlign: 'center',
              lineHeight: 1.1,
            }}
          >
            Frequently asked questions
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {FAQ.map((item, i) => (
              <div
                key={i}
                style={{
                  borderBottom: '1px solid var(--color-white-10)',
                  padding: '28px 0',
                }}
              >
                <h3
                  style={{
                    fontWeight: 700,
                    fontSize: 17,
                    margin: '0 0 12px',
                    lineHeight: 1.4,
                  }}
                >
                  {item.q}
                </h3>
                <p
                  style={{
                    color: 'var(--color-white-60)',
                    fontSize: 15,
                    margin: 0,
                    lineHeight: 1.7,
                  }}
                >
                  {brandify(item.a)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
