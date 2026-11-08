import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import EarlyAccessForm from '@/components/EarlyAccessForm';
import { planFromQuery } from '@/lib/earlyAccess.mjs';
import { pageMetadata } from '@/lib/seo.mjs';

export const metadata = pageMetadata({
  title: 'Request Early Access — Zerbiq',
  description: 'Request early access to Zerbiq. Tell us about your business and we will be in touch within one business day.',
  path: '/early-access',
});

export default function EarlyAccessPage({ searchParams }) {
  const plan = planFromQuery(searchParams?.plan);

  return (
    <>
      <Navbar />

      <section style={{ padding: '72px 16px 100px' }}>
        <div style={{ maxWidth: 680, margin: '0 auto' }}>
          <h1
            style={{
              fontWeight: 900,
              fontSize: 'clamp(30px, 5vw, 48px)',
              letterSpacing: '-0.04em',
              margin: '0 0 12px',
              lineHeight: 1.05,
              textAlign: 'center',
            }}
          >
            Request early access
          </h1>
          <p
            style={{
              color: 'var(--color-white-60)',
              fontSize: 16,
              lineHeight: 1.7,
              margin: '0 auto 36px',
              maxWidth: 520,
              textAlign: 'center',
            }}
          >
            Tell us a little about your business. We&apos;ll get back to you within one business day.
            No account is created and nothing is charged.
          </p>

          <EarlyAccessForm initialPlan={plan} />
        </div>
      </section>

      <Footer />
    </>
  );
}
