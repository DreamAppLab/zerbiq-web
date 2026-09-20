import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroBackground from '@/components/HeroBackground';
import ZerbiqBrand from '@/components/ZerbiqBrand';
import Link from 'next/link';

export const metadata = {
  title: 'About — Zerbiq',
  description:
    'Zerbiq was built by a field service operator who ran crews, built routes, managed subcontractors, and eventually sold the business to private equity.',
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <HeroBackground />

      {/* Hero */}
      <section style={{ padding: '100px 24px 80px', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <div style={{ display: 'inline-block', border: '1px solid var(--color-primary)', borderRadius: 20, padding: '5px 16px', fontSize: 12, fontWeight: 600, color: 'var(--color-primary)', letterSpacing: '0.04em', marginBottom: 32, textTransform: 'uppercase' }}>
            Our Story
          </div>
          <h1 style={{ fontWeight: 900, fontSize: 'clamp(32px, 5vw, 56px)', letterSpacing: '-0.04em', lineHeight: 1.05, margin: '0 0 0', color: '#fff' }}>
            Why we built <ZerbiqBrand />
          </h1>
        </div>
      </section>

      {/* Body */}
      <section style={{ padding: '0 24px 120px', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: 680, margin: '0 auto' }}>
          {[
            'Field service software has a problem. Most of it was built by engineers and product managers who have never run a service business. They\'ve studied it, interviewed operators, sat in on demos — but they\'ve never dispatched a crew at 6am when two techs called out. They\'ve never had to explain a confusing invoice to a customer who\'s threatening to cancel. They\'ve never looked at a route sheet on a Monday morning and wondered how they were going to cover everything.',
            'We have.',
            'Zerbiq was founded by a field service operator. We ran crews. We built routes. We managed subcontractors, tracked equipment, handled no-shows, chased payments, and grew the business until it was worth selling to private equity. We used every major platform on the market and found the same problem everywhere: the software was built for the software company, not for us.',
            'Too complicated for the office staff. Too clunky for the techs in the field. Too expensive once your team grew past a handful of people. And never quite right — always missing the one thing you actually needed, always requiring a workaround.',
            'So we built Zerbiq from the inside out. Every screen, every workflow, every feature started with one question: what does a service business operator actually need on a Tuesday afternoon when everything is on fire?',
            'We don\'t claim to be perfect. We\'re still building. But we do claim this: we understand your business because we lived it. And that makes all the difference.',
          ].map((para, i) => (
            <p
              key={i}
              style={{
                fontSize: i === 1 ? 22 : 17,
                fontWeight: i === 1 ? 700 : 400,
                color: i === 1 ? '#ffffff' : 'var(--color-white-60)',
                lineHeight: i === 1 ? 1.3 : 1.8,
                margin: i === 1 ? '36px 0' : '0 0 28px',
              }}
            >
              {para}
            </p>
          ))}

          {/* Sign-off */}
          <p style={{ fontSize: 20, fontWeight: 800, color: '#fff', margin: '48px 0 0', letterSpacing: '-0.02em' }}>
            Built for the field. Loved by the office.
          </p>

          {/* CTA */}
          <div style={{ marginTop: 56, display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
            <Link href="/signup" className="btn-primary" style={{ display: 'inline-block', borderRadius: 10, padding: '14px 32px', fontWeight: 700, fontSize: 16 }}>
              Start Free Trial
            </Link>
            <Link href="/features" style={{ color: 'var(--color-white-60)', fontSize: 15, textDecoration: 'none', fontWeight: 500 }}>
              See all features →
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
