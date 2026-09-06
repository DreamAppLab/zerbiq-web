import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PricingCards from '@/components/PricingCards';

const FAQ = [
  {
    q: 'Is there really no credit card required for the trial?',
    a: "Correct. Start your 7-day free trial with just your email. No card until you decide to subscribe.",
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
    a: 'Want us to handle the setup for you? Our White-Glove Onboarding is a one-time $599 add-on. We Zoom with you for 60–90 minutes, import your customer list, build your routes, add your team, and configure everything — guaranteed live before the call ends.',
  },
  {
    q: 'Do you offer annual billing?',
    a: 'Yes — annual billing saves you one full month compared to paying monthly.',
  },
  {
    q: 'What is a recurring customer?',
    a: "A recurring customer has a billing frequency set (weekly, biweekly, monthly, or quarterly). One-time customers don't count toward your recurring limit.",
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
                  {item.a}
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
