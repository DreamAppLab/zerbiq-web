import { PRIMARY_CTA_LABEL } from '@/lib/siteConfig.mjs';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PricingCards from '@/components/PricingCards';
import ZerbiqBrand, { brandify } from '@/components/ZerbiqBrand';
import { EARLY_ACCESS_HREF, MULTI_LOCATION_FEE, TEXTING_PRICING_HREF, groupByBadge, textingPricingLine } from '@/lib/planData';
import { ALL_FEATURES } from '@/lib/homeFeatures';

const DEMO_URL = 'https://calendly.com/zerbiq-demos/30min';


const PLAN_GROUPS = groupByBadge(ALL_FEATURES);

const MARQUEE_ROW_1 = [
  'Lawn Care', 'Pressure Washing', 'Pool Service', 'HVAC', 'Landscaping', 'Pest Control',
  'Plumbing', 'Electrical', 'Painting', 'Janitorial', 'Snow Removal', 'Irrigation',
  'Tree Service', 'Window Cleaning', 'Gutter Cleaning', 'Carpet Cleaning', 'Handyman',
  'Roofing', 'Siding', 'Fencing',
];

const MARQUEE_ROW_2 = [
  'Property Management', 'General Contractors', 'Restoration', 'Concrete', 'Flooring',
  'Tile & Grout', 'Chimney Sweep', 'Solar Installation', 'Security Systems', 'Appliance Repair',
  'Garage Door', 'Locksmith', 'Moving Services', 'Junk Removal', 'Septic Service',
  'Waterproofing', 'Masonry', 'Drywall', 'Insulation', 'Painting',
];

function MarqueeRow({ items, direction = 'left' }) {
  const doubled = [...items, ...items];
  return (
    <div className="marquee-wrapper" style={{ width: '100%', marginBottom: 12 }}>
      <div className={direction === 'left' ? 'marquee-track-left' : 'marquee-track-right'}>
        {doubled.map((item, i) => (
          <span
            key={i}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 12,
              whiteSpace: 'nowrap',
              fontSize: 14,
              fontWeight: 500,
              color: 'var(--color-white-60)',
              padding: '0 12px',
            }}
          >
            {item}
            <span style={{ color: 'var(--color-primary)', userSelect: 'none' }}>·</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      <Navbar />

      {/* HERO — no background so the fixed animation shows through */}
      <section
        className="hero-section"
        style={{
          position: 'relative',
          padding: '100px 24px 80px',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: 760, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          {/* Eyebrow pill */}
          <div
            style={{
              display: 'inline-block',
              border: '1px solid var(--color-primary)',
              borderRadius: 20,
              padding: '5px 16px',
              fontSize: 12,
              fontWeight: 600,
              color: 'var(--color-primary)',
              letterSpacing: '0.04em',
              marginBottom: 28,
              textTransform: 'uppercase',
            }}
          >
            Field Service Operations Platform
          </div>

          <h1
            style={{
              fontWeight: 900,
              fontSize: 'clamp(48px, 7vw, 72px)',
              letterSpacing: '-0.04em',
              lineHeight: 1.05,
              margin: '0 0 24px',
              color: '#fff',
            }}
          >
            Built for the field.<br />
            Loved by the office.
          </h1>

          <p
            style={{
              color: 'var(--color-white-60)',
              fontSize: 18,
              lineHeight: 1.7,
              maxWidth: 560,
              margin: '0 auto 36px',
            }}
          >
            <ZerbiqBrand /> replaces the whiteboard, the spreadsheet, and the group text. Your team knows
            where to be. Your customers know when to expect them. You know what&apos;s happening —
            from anywhere.
          </p>

          {/* CTAs */}
          <div
            style={{
              display: 'flex',
              gap: 14,
              justifyContent: 'center',
              flexWrap: 'wrap',
              marginBottom: 20,
            }}
          >
            <a
              href={EARLY_ACCESS_HREF}
              className="btn-primary"
              style={{
                borderRadius: 10,
                padding: '16px 32px',
                fontWeight: 700,
                fontSize: 16,
                display: 'inline-block',
              }}
            >
              {PRIMARY_CTA_LABEL}
            </a>
            <a
              href={DEMO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
              style={{
                borderRadius: 10,
                padding: '16px 32px',
                fontWeight: 700,
                fontSize: 16,
                display: 'inline-block',
              }}
            >
              Book a Demo
            </a>
          </div>

          <p style={{ color: 'var(--color-white-60)', fontSize: 13, margin: '0 0 56px' }}>
            Flat pricing · Unlimited users on Core and above · Cancel anytime
          </p>

          {/* App screenshot */}
          <img
            src="/screenshots/dashboard-screenshot.png"
            alt="Zerbiq Dashboard — customizable field service management"
            style={{
              display: 'block',
              width: '100%',
              maxWidth: 900,
              margin: '0 auto',
              borderRadius: 14,
              boxShadow: '0 8px 48px rgba(0,0,0,0.45)',
            }}
          />
          <p
            style={{
              textAlign: 'center',
              color: 'var(--color-white-60)',
              fontSize: 13,
              marginTop: 16,
            }}
          >
            Your customizable dashboard — see exactly what matters to your business at a glance.
          </p>
        </div>
      </section>

      {/* INDUSTRY MARQUEE */}
      <section style={{ padding: '60px 0 48px', overflow: 'hidden' }}>
        <p
          style={{
            textAlign: 'center',
            color: 'var(--color-white-60)',
            fontSize: 13,
            fontWeight: 500,
            letterSpacing: '0.02em',
            marginBottom: 28,
            padding: '0 24px',
          }}
        >
          Built for field service businesses across every trade
        </p>
        <MarqueeRow items={MARQUEE_ROW_1} direction="left" />
        <MarqueeRow items={MARQUEE_ROW_2} direction="right" />
      </section>

      {/* PER-COMPANY PRICING CALLOUT */}
      <section
        style={{
          padding: '80px 24px',
          background: '#0D0D14',
          borderTop: '1px solid var(--color-white-10)',
          borderBottom: '1px solid var(--color-white-10)',
          overflowX: 'hidden',
        }}
      >
        <style>{`
          @keyframes shimmer-home {
            0%   { transform: translateX(-100%); }
            100% { transform: translateX(500%); }
          }
          @keyframes strike-draw-home {
            0%   { width: 0; }
            100% { width: 100%; }
          }
          .banner-shimmer-home {
            position: absolute; top: 0; left: 0;
            width: 20%; height: 100%;
            background: linear-gradient(90deg, transparent, rgba(61,92,255,0.1), transparent);
            animation: shimmer-home 3s ease-in-out infinite;
            pointer-events: none;
          }
          @media (max-width: 768px) {
            .pricing-banner-card    { padding: 16px !important; }
            .pricing-banner-heading { font-size: 20px !important; }
            .pricing-banner-subtitle{ font-size: 13px !important; }
            .strike-badges-row      { flex-direction: column !important; }
            .strike-badge           { width: 100%; max-width: 100%; box-sizing: border-box; font-size: 14px !important; }
            .confirm-badge          { width: 100%; box-sizing: border-box; display: block !important; font-size: 12px !important; }
            .banner-bottom-text     { font-size: 12px !important; }
          }
        `}</style>
        <div style={{ maxWidth: 900, margin: '0 auto', boxSizing: 'border-box' }}>
          <div className="pricing-banner-card" style={{ position: 'relative', overflow: 'hidden', background: '#0A0A14', border: '2px solid #3D5CFF', borderRadius: 16, padding: '40px 48px', boxSizing: 'border-box', textAlign: 'center' }}>
            <div className="banner-shimmer-home" />
            <h2 className="pricing-banner-heading" style={{ fontWeight: 900, fontSize: 'clamp(26px, 4vw, 44px)', letterSpacing: '-0.03em', margin: '0 0 12px', lineHeight: 1.2, position: 'relative' }}>
              <span style={{ display: 'block', textDecoration: 'underline', textDecorationColor: '#fff' }}>Priced per company.</span>
              <span style={{ display: 'block' }}>
                <span style={{ color: '#3D5CFF' }}>Not per person</span>
                <span style={{ background: 'linear-gradient(to bottom, #ffffff 50%, #3D5CFF 50%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>!</span>
              </span>
            </h2>
            <p className="pricing-banner-subtitle" style={{ color: 'rgba(255,255,255,0.7)', fontSize: 16, lineHeight: 1.65, margin: '0 auto 24px', maxWidth: 560, position: 'relative', textAlign: 'center' }}>
              Core and above: one flat price for your whole team, no matter how many people you add. Solo is one user.
            </p>
            <div className="strike-badges-row" style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 16, position: 'relative', justifyContent: 'center' }}>
              {[
                { text: '❌ $29/user/month extra techs', delay: '0.5s' },
                { text: '❌ $29/seat office staff',       delay: '0.8s' },
                { text: '❌ Extra license seasonal workers', delay: '1.1s' },
              ].map(({ text, delay }) => (
                <div key={text} className="strike-badge" style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', padding: '6px 14px', background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: 6, fontSize: 16, color: 'rgba(255,255,255,0.65)', overflow: 'hidden', boxSizing: 'border-box' }}>
                  {text}
                  <div style={{ position: 'absolute', top: '50%', left: 0, height: 2, background: '#ef4444', width: 0, animationName: 'strike-draw-home', animationDuration: '0.5s', animationDelay: delay, animationFillMode: 'forwards', animationTimingFunction: 'ease-out' }} />
                </div>
              ))}
            </div>
            <div className="confirm-badge" style={{ display: 'inline-block', background: 'rgba(61,92,255,0.15)', border: '1px solid rgba(61,92,255,0.4)', borderRadius: 8, padding: '8px 16px', fontSize: 14, fontWeight: 600, color: '#fff', marginBottom: 20, position: 'relative', boxSizing: 'border-box' }}>
              ✓ Core and above: unlimited owners, office staff, techs, and seasonal workers — one price
            </div>
            <p className="banner-bottom-text" style={{ color: 'rgba(255,255,255,0.45)', fontSize: 14, margin: 0, lineHeight: 1.7, position: 'relative' }}>
              Add your whole team on day one. No per-seat math. No surprise charges. No licenses to cancel when someone leaves.
            </p>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" style={{ padding: '80px 24px', background: 'var(--color-surface)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <p
            style={{
              color: 'var(--color-primary)',
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginBottom: 16,
              textAlign: 'center',
            }}
          >
            Features
          </p>
          <h2
            style={{
              fontWeight: 900,
              fontSize: 'clamp(28px, 4vw, 44px)',
              letterSpacing: '-0.03em',
              textAlign: 'center',
              maxWidth: 640,
              margin: '0 auto 56px',
              lineHeight: 1.1,
            }}
          >
            Everything your operation needs. Nothing it doesn&apos;t.
          </h2>

          {PLAN_GROUPS.map((group) => (
            <div key={group.key} style={{ marginBottom: 56 }}>
              {/* Plan group header */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 16,
                  marginBottom: 28,
                }}
              >
                <div style={{ flex: 1, height: 1, background: 'var(--color-white-10)' }} />
                <span
                  style={{
                    color: 'var(--color-primary)',
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {group.label}
                </span>
                <div style={{ flex: 1, height: 1, background: 'var(--color-white-10)' }} />
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                  gap: 20,
                }}
              >
                {group.features.map((f) => (
                  <div
                    key={f.title}
                    className="feature-card"
                    style={{
                      background: 'var(--color-raised)',
                      border: '1px solid var(--color-white-10)',
                      borderRadius: 8,
                      padding: 28,
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <div style={{ fontSize: 28, marginBottom: 14 }}>{f.icon}</div>
                    <h3 style={{ fontWeight: 700, fontSize: 17, margin: '0 0 10px' }}>
                      {f.title}
                      {f.pill && (
                        <span
                          style={{
                            marginLeft: 10,
                            verticalAlign: 'middle',
                            display: 'inline-block',
                            background: 'rgba(61,92,255,0.18)',
                            border: '1px solid rgba(61,92,255,0.5)',
                            borderRadius: 999,
                            padding: '2px 10px',
                            fontSize: 11,
                            fontWeight: 700,
                            letterSpacing: '0.04em',
                            textTransform: 'uppercase',
                          }}
                        >
                          {f.pill}
                        </span>
                      )}
                    </h3>
                    <p style={{ color: 'var(--color-white-60)', fontSize: 14, margin: '0 0 20px', lineHeight: 1.65, flex: 1 }}>
                      {brandify(f.desc)}
                    </p>
                    <div>
                      <a
                        href={f.link ? f.link.href : EARLY_ACCESS_HREF}
                        className="btn-primary"
                        style={{
                          display: 'inline-block',
                          borderRadius: 8,
                          padding: '10px 20px',
                          fontWeight: 700,
                          fontSize: 13,
                        }}
                      >
                        {f.link ? f.link.label : PRIMARY_CTA_LABEL}
                      </a>
                      <div
                        style={{
                          fontSize: 11,
                          color: 'rgba(255,255,255,0.4)',
                          marginTop: 6,
                        }}
                      >
                        {f.badge}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FOUNDER STORY STRIP */}
      <section style={{ padding: '80px 24px', background: 'rgba(255,255,255,0.025)', borderTop: '1px solid var(--color-white-10)', borderBottom: '1px solid var(--color-white-10)' }}>
        <div style={{ maxWidth: 760, margin: '0 auto', textAlign: 'center' }}>
          <h2
            style={{
              fontWeight: 900,
              fontSize: 'clamp(22px, 3.5vw, 36px)',
              letterSpacing: '-0.03em',
              lineHeight: 1.25,
              margin: '0 0 28px',
              color: '#fff',
              textAlign: 'center',
            }}
          >
            <span style={{ display: 'block' }}>Built by someone who ran the business.</span>
            <span style={{ display: 'block', color: 'var(--color-primary)' }}>Not just studied it.</span>
          </h2>
          <p style={{ fontSize: 16, color: 'var(--color-white-60)', lineHeight: 1.8, margin: '0 auto 20px', maxWidth: 620, textAlign: 'center' }}>
            <ZerbiqBrand /> was built by a field service operator who managed teams, ran routes, chased invoices, dealt with no-shows,
            and eventually sold the business to private equity. We spent years using software that was built by people who had
            never dispatched a tech, never explained an invoice to a frustrated customer, and never stayed up worrying about
            whether the routes were covered.
          </p>
          <p style={{ fontSize: 16, color: 'var(--color-white-60)', lineHeight: 1.8, margin: '0 auto 32px', maxWidth: 620, textAlign: 'center' }}>
            So we built what we always needed. Every feature in <ZerbiqBrand /> exists because a real service business needed it —
            not because a product manager thought it sounded good.
          </p>
          <a
            href="/about"
            style={{
              color: 'var(--color-primary)',
              fontSize: 15,
              fontWeight: 600,
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            Read our story →
          </a>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <p
            style={{
              color: 'var(--color-primary)',
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginBottom: 16,
              textAlign: 'center',
            }}
          >
            Pricing
          </p>
          <h2
            style={{
              fontWeight: 900,
              fontSize: 'clamp(28px, 4vw, 44px)',
              letterSpacing: '-0.03em',
              textAlign: 'center',
              margin: '0 auto 12px',
              lineHeight: 1.1,
            }}
          >
            Simple pricing. No surprises.
          </h2>
          <p
            style={{
              color: 'var(--color-white-60)',
              textAlign: 'center',
              fontSize: 16,
              marginBottom: 48,
            }}
          >
            Pick the plan that fits. Scale when you&apos;re ready. Cancel anytime.
          </p>
          <PricingCards />
          <p style={{ color: 'rgba(255,255,255,0.8)', textAlign: 'center', fontSize: 15, lineHeight: 1.65, margin: '28px auto 0', maxWidth: 720 }}>
            {textingPricingLine()}{' '}
            <a href={TEXTING_PRICING_HREF} style={{ color: '#fff', fontWeight: 700, textDecoration: 'underline', whiteSpace: 'nowrap' }}>
              See texting prices →
            </a>
          </p>
        </div>
      </section>

      {/* TWO WAYS TO GET STARTED */}
      <section
        style={{
          padding: '80px 24px',
          background: 'var(--color-surface)',
        }}
      >
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <h2
            style={{
              fontWeight: 900,
              fontSize: 'clamp(28px, 4vw, 44px)',
              letterSpacing: '-0.03em',
              textAlign: 'center',
              margin: '0 0 16px',
              lineHeight: 1.1,
            }}
          >
            Two ways to get started
          </h2>
          <p
            style={{
              color: 'var(--color-white-60)',
              textAlign: 'center',
              fontSize: 17,
              lineHeight: 1.7,
              margin: '0 0 48px',
              maxWidth: 600,
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            Whether you set it up yourself or have us handle everything — you&apos;ll be live
            before your next job runs.
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: 24,
            }}
          >
            {/* DIY Card */}
            <div
              style={{
                background: '#1E1E2A',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 8,
                padding: 32,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div style={{ fontSize: 36, marginBottom: 16 }}>📥</div>
              <h3
                style={{
                  fontWeight: 800,
                  fontSize: 20,
                  margin: '0 0 14px',
                  lineHeight: 1.3,
                }}
              >
                Set it up yourself — in under an hour.
              </h3>
              <p
                style={{
                  color: 'var(--color-white-60)',
                  fontSize: 15,
                  lineHeight: 1.7,
                  margin: '0 0 28px',
                  flex: 1,
                }}
              >
                Download our simple spreadsheet templates for customers, routes, and team members.
                Fill them in, upload, and you&apos;re live. No tech skills required. Most owners
                are fully set up in under an hour.
              </p>
              <div>
                <a
                  href={EARLY_ACCESS_HREF}
                  style={{
                    display: 'inline-block',
                    background: 'transparent',
                    border: '1px solid var(--color-primary)',
                    color: 'var(--color-primary)',
                    borderRadius: 8,
                    padding: '12px 24px',
                    fontWeight: 700,
                    fontSize: 14,
                    textDecoration: 'none',
                    transition: 'background 0.2s, color 0.2s',
                  }}
                >
                  {PRIMARY_CTA_LABEL}
                </a>
                <div
                  style={{
                    fontSize: 12,
                    color: 'rgba(255,255,255,0.4)',
                    marginTop: 8,
                  }}
                >
                  Free with every plan
                </div>
              </div>
            </div>

            {/* White-Glove Card */}
            <div
              style={{
                background: '#1E1E2A',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 8,
                padding: 32,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div style={{ fontSize: 36, marginBottom: 16 }}>🤝</div>
              <h3
                style={{
                  fontWeight: 800,
                  fontSize: 20,
                  margin: '0 0 14px',
                  lineHeight: 1.3,
                }}
              >
                Want us to handle everything?
              </h3>
              <p
                style={{
                  color: 'var(--color-white-60)',
                  fontSize: 15,
                  lineHeight: 1.7,
                  margin: '0 0 28px',
                  flex: 1,
                }}
              >
                Our White-Glove Onboarding is a one-time add-on. We handle your entire setup — import
                your customer list, build your routes, add your team, and configure everything,
                guaranteed live before the call ends. Pricing: $299 for Core, $499 for Field, $699
                for Command.
              </p>
              <div>
                <a
                  href="mailto:support@zerbiq.com"
                  className="btn-primary"
                  style={{
                    display: 'inline-block',
                    borderRadius: 8,
                    padding: '12px 24px',
                    fontWeight: 700,
                    fontSize: 14,
                    textDecoration: 'none',
                  }}
                >
                  Book White-Glove Setup
                </a>
                <div
                  style={{
                    fontSize: 12,
                    color: 'rgba(255,255,255,0.4)',
                    marginTop: 8,
                  }}
                >
                  One-time add-on · $299 Core / $499 Field / $699 Command
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DEMO SECTION */}
      <section
        style={{
          padding: '80px 24px',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <h2
            style={{
              fontWeight: 900,
              fontSize: 'clamp(28px, 4vw, 44px)',
              letterSpacing: '-0.03em',
              marginBottom: 20,
              lineHeight: 1.1,
            }}
          >
            See <ZerbiqBrand /> in action.
          </h2>
          <p
            style={{
              color: 'var(--color-white-60)',
              fontSize: 17,
              lineHeight: 1.7,
              marginBottom: 36,
            }}
          >
            Book a 30-minute demo. We&apos;ll walk through the platform live, answer your
            questions, and help you pick the right plan.
          </p>
          <a
            href={DEMO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            style={{
              display: 'inline-block',
              borderRadius: 10,
              padding: '16px 40px',
              fontWeight: 700,
              fontSize: 16,
              marginBottom: 24,
            }}
          >
            Book a Demo
          </a>
          <p style={{ color: 'var(--color-white-60)', fontSize: 14, margin: 0 }}>
            Prefer to explore on your own?{' '}
            <a
              href={EARLY_ACCESS_HREF}
              style={{ color: '#fff', fontWeight: 600, textDecoration: 'none' }}
            >
              {PRIMARY_CTA_LABEL} →
            </a>
          </p>
        </div>
      </section>

      <Footer />
    </>
  );
}
