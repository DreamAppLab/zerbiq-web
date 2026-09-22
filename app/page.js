import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PricingCards from '@/components/PricingCards';
import Link from 'next/link';
import ZerbiqBrand, { brandify } from '@/components/ZerbiqBrand';

const DEMO_URL = 'https://calendly.com/zerbiq-demos/30min';

const ALL_FEATURES = [
    // ── All Plans ─────────────────────────────────────────────────────────────
  {
    icon: '👥',
    title: 'Unlimited users. One flat price.',
    desc: 'Every plan includes your entire team — owners, office staff, field techs, seasonal workers. No per-seat fees. No surprise charges when you hire. No licenses to cancel when someone leaves.',
    badge: 'Included with all plans',
  },
  {
    icon: '🗺️',
    title: 'Route Management',
    desc: "Build optimized routes for your team in minutes — not hours. Assign stops, drag to reorder, and push routes directly to your team's phones with one tap.",
    badge: 'Included with all plans',
  },
  {
    icon: '📋',
    title: 'Job Tracking',
    desc: 'Schedule one-time and recurring jobs from a single screen. Set it once — Zerbiq handles the rest for weekly, biweekly, monthly, and quarterly jobs automatically.',
    badge: 'Included with all plans',
  },
  {
    icon: '💰',
    title: 'Invoicing & Payments',
    desc: 'Generate invoices the moment a job is marked complete. Send via email or SMS with one click. Collect card payments, ACH, or cash — your choice.',
    badge: 'Included with all plans',
  },
  {
    icon: '💬',
    title: 'Two-Way SMS Messaging',
    desc: 'Communicate with customers the way they prefer — text. Send appointment reminders, job updates, invoice links, and follow-ups directly from Zerbiq.',
    badge: 'Included with all plans',
  },
  {
    icon: '🚗',
    title: 'Technician On The Way',
    desc: "When a tech is headed to a job, one tap sends the customer an automatic SMS: their tech's name, estimated arrival time, and a confirmation of what's being done.",
    badge: 'Included with all plans',
  },
  {
    icon: '👥',
    title: 'Team Management',
    desc: 'Add every team member with a role and permission level. Field techs see only what they need. Admins and managers see everything. No shared logins.',
    badge: 'Included with all plans',
  },
  {
    icon: '📊',
    title: 'Customer CRM',
    desc: 'Every customer gets a complete profile: contact info, service history, invoices, notes, photos, and equipment logs — all in one place.',
    badge: 'Included with all plans',
  },
  {
    icon: '📱',
    title: 'Mobile Team View',
    desc: "Your techs get a clean view of their day: where to go, what to do, and how to log it. Available as a native app on iOS and Android, and runs in any browser on any smartphone.",
    badge: 'Included with all plans',
  },
  {
    icon: '💳',
    title: 'Estimates & Quotes',
    desc: 'Create professional estimates in seconds. Send via email or SMS. Clients approve with one tap — no login required.',
    badge: 'Included with Field, Command & Enterprise',
  },
  {
    icon: '📋',
    title: 'Lead Management',
    desc: 'Capture leads from your website embed form, manual entry, or direct import. Manage them through a visual Kanban pipeline.',
    badge: 'Included with Field, Command & Enterprise',
  },
  {
    icon: '🗺️',
    title: 'Mileage Tracking',
    desc: 'Team members log mileage from their phone. IRS reimbursement rates calculated automatically. Know your vehicle costs per job and per route.',
    badge: 'Included with all plans',
  },
  {
    icon: '🛠️',
    title: 'Equipment & Asset Tracking',
    desc: 'Log every piece of equipment with service history, assignment, condition reports, and maintenance logs.',
    badge: 'Included with all plans',
  },
  {
    icon: '📥',
    title: 'Embeddable Lead Capture Form',
    desc: 'Add a lead capture form to any website with one line of code. Leads go directly into your Zerbiq pipeline.',
    badge: 'Included with Field, Command & Enterprise',
  },
  {
    icon: '📤',
    title: 'Data Export',
    desc: 'Export any data — customers, jobs, invoices, routes, team — to CSV or PDF at any time. Full account ZIP export available.',
    badge: 'Included with all plans',
  },
  {
    icon: '🌐',
    title: 'Customer Portal',
    desc: 'Every customer gets a private portal to view upcoming jobs, pay invoices, approve quotes, and leave notes — without calling you.',
    badge: 'Included with Field, Command & Enterprise',
  },
  // ── Field, Command & Enterprise ────────────────────────────────────────────
  {
    icon: '📈',
    title: 'Reports & Analytics',
    desc: 'Revenue by route, tech, or service type. Overdue invoice aging. Customer retention rates. Job completion percentages. Tech performance rankings.',
    badge: 'Included with all plans',
  },
  {
    icon: '🗓️',
    title: 'Schedule & Dispatch Board',
    desc: 'See every job for the day in a calendar view by tech or route. Drag to reschedule. Spot gaps. Respond to last-minute changes without a single phone call.',
    badge: 'Included with all plans',
  },
  {
    icon: '💵',
    title: 'Partial Payments & Payment Plans',
    desc: 'Give customers flexibility to pay over time. Set up payment plans, record partial payments, and track balances automatically.',
    badge: 'Included with Field, Command & Enterprise',
  },
  {
    icon: '📦',
    title: 'Materials & Inventory',
    desc: 'Track every product, chemical, and supply your team uses in the field. Log usage per job, set reorder points, and know your stock levels at all times.',
    badge: 'Included with all plans',
  },
  {
    icon: '🛒',
    title: 'Purchase Orders',
    desc: 'Generate purchase orders by supplier with one click. Send directly to vendors by email or print on site.',
    badge: 'Included with all plans',
  },
  {
    icon: '⏱️',
    title: 'Time Tracking & Job Costing',
    desc: 'See exactly how long every job takes and what it costs in labor and materials. Compare estimated vs. actual in real time.',
    badge: 'Included with all plans',
  },
  {
    icon: '🤝',
    title: 'Subcontractor Management',
    desc: 'Add 1099 subcontractors alongside your W-2 employees. Assign jobs, track hours, and manage payments separately.',
    badge: 'Included with Field, Command & Enterprise',
  },
  {
    icon: '🌟',
    title: 'Review Request Automation',
    desc: 'After a job is completed, Zerbiq automatically sends a review request via SMS or email. More reviews, less asking.',
    badge: 'Included with all plans',
  },
  {
    icon: '📬',
    title: 'Automated Follow-Up Sequences',
    desc: 'Send a series of follow-up messages to leads and inactive customers automatically. Stay top of mind without manual effort.',
    badge: 'Included with Command & Enterprise',
  },
  // ── Command & Enterprise ───────────────────────────────────────────────────
  {
    icon: '📅',
    title: 'Appointment Reminders',
    desc: 'Zerbiq automatically sends customers a reminder before every scheduled job. Reduce no-shows and last-minute cancellations without lifting a finger.',
    badge: 'Included with all plans',
  },
  {
    icon: '🔔',
    title: 'Automated Reminders & Notifications',
    desc: 'Invoice overdue? Zerbiq reminds the customer automatically. Job not completed on time? You get notified. Set your rules once and Zerbiq runs them every day.',
    badge: 'Included with all plans',
  },
  {
    icon: '⚠️',
    title: 'Automated Late Fees',
    desc: 'Set your late fee policy once. Zerbiq applies it automatically to overdue invoices on the date you specify.',
    badge: 'Included with Command & Enterprise',
  },
  {
    icon: '🔧',
    title: 'Maintenance Calendar',
    desc: 'Track service intervals for vehicles and equipment. Get alerts before things break down. Log full maintenance history and costs.',
    badge: 'Included with Field, Command & Enterprise',
  },
  {
    icon: '📗',
    title: 'QuickBooks Sync',
    desc: 'Every invoice, payment, and expense syncs to QuickBooks automatically. Your books stay clean without double entry.',
    badge: 'Included with Command & Enterprise',
  },
  // ── New All Plans cards ────────────────────────────────────────────────────
  {
    icon: '📅',
    title: 'Holiday Management',
    desc: "Tell Zerbiq once which days you're closed. It handles the rest — skip the service, bump it to the next day, or schedule a makeup visit. Customers get automatically notified so you're not fielding calls wondering why no one showed up.",
    badge: 'Included with all plans',
  },
  {
    icon: '🔄',
    title: 'Billing Cycles',
    desc: 'Create named billing cycles — monthly on the 1st, bi-weekly, quarterly — and assign routes to them. At the end of each cycle, Zerbiq generates one clean invoice per customer. No manual tallying, no missed charges.',
    badge: 'Included with all plans',
  },
  {
    icon: '📍',
    title: 'GPS Field Tracking',
    desc: 'See where your team is in real time from any phone — no hardware required. Verify stops were made, spot techs running behind, and dispatch the nearest available person to an urgent job.',
    badge: 'Included with all plans',
  },
  {
    icon: '🚛',
    title: 'Daily Truck Inspection and Checklists',
    desc: 'Before techs hit the road they complete a digital inspection on their phone — tires, lights, fluids, equipment secured. 90 seconds. Timestamped record. Catches problems before they become breakdowns or liabilities.',
    badge: 'Included with all plans',
  },
  {
    icon: '🔐',
    title: 'Employee ID and PIN Login',
    desc: 'Techs log in with a simple employee ID and 4-digit PIN — no email, no forgotten passwords. Fast at 7 AM when the day is already moving. You control who has access and what they can see.',
    badge: 'Included with all plans',
  },
  {
    icon: '🔩',
    title: 'Parts on Order',
    desc: "When a job is waiting on a part, Zerbiq tracks it — what's needed, what PO it's tied to, and when it's expected. When the part arrives you're notified and the return visit gets scheduled.",
    badge: 'Included with all plans',
  },
  {
    icon: '🎨',
    title: 'Custom Branding',
    desc: "Upload your logo and set your brand color. Every invoice, estimate, customer portal, and notification your customers see carries your identity — not ours. Included with every plan.",
    badge: 'Included with all plans',
  },
  {
    icon: '☀️',
    title: 'Light Mode and Dark Mode',
    desc: 'Switch between a clean light mode and a deep dark mode from the top bar. Your preference is saved to your account and follows you across every device.',
    badge: 'Included with all plans',
  },
  {
    icon: '⚡',
    title: 'Personalized Shortcuts Bar',
    desc: "Each user drags any item from the left menu and pins it below the header — one click away, always visible, completely personal. Up to six shortcuts per user. No one else's setup is affected.",
    badge: 'Included with all plans',
  },
  // ── New Field, Command & Enterprise cards ─────────────────────────────────
  {
    icon: '🧠',
    title: 'Route Intelligence',
    desc: "Zerbiq's optimization engine sequences your stops to minimize drive time and fuel — saving the average route 30–45 minutes per day. When an urgent job comes in it instantly finds the nearest available tech.",
    badge: 'Included with Field, Command & Enterprise',
  },
  {
    icon: '📦',
    title: 'Employee Asset Checkout',
    desc: "Know who has the iPad, the gas card, the backpack sprayer. Log checkout and return in seconds. If something goes missing you'll know exactly who had it last.",
    badge: 'Included with Field, Command & Enterprise',
  },
  {
    icon: '📍',
    title: 'Multiple Service Locations',
    desc: 'Running more than one location? Add additional service areas and manage them all from one login. Routes, teams, customers, and billing stay organized by location. Available on Field and above — $59/mo per additional location on Field, $79/mo on Command and Enterprise.',
    badge: 'Included with Field, Command & Enterprise',
  },
];

const PLAN_GROUPS = [
  {
    key: 'all',
    label: 'All Plans',
    features: ALL_FEATURES.filter((f) => f.badge === 'Included with all plans'),
  },
  {
    key: 'field',
    label: 'Field, Command & Enterprise',
    features: ALL_FEATURES.filter((f) => f.badge === 'Included with Field, Command & Enterprise'),
  },
  {
    key: 'command',
    label: 'Command & Enterprise',
    features: ALL_FEATURES.filter((f) => f.badge === 'Included with Command & Enterprise'),
  },
];

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
            <Link
              href="/signup"
              className="btn-primary"
              style={{
                borderRadius: 10,
                padding: '16px 32px',
                fontWeight: 700,
                fontSize: 16,
                display: 'inline-block',
              }}
            >
              Start Free Trial — It&apos;s Free
            </Link>
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
            No credit card required · 14-day free trial · Cancel anytime
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
            .strike-badge           { width: 100%; max-width: 100%; box-sizing: border-box; font-size: 12px !important; }
            .confirm-badge          { width: 100%; box-sizing: border-box; display: block !important; font-size: 12px !important; }
            .banner-bottom-text     { font-size: 12px !important; }
          }
        `}</style>
        <div style={{ maxWidth: 900, margin: '0 auto', boxSizing: 'border-box' }}>
          <div className="pricing-banner-card" style={{ position: 'relative', overflow: 'hidden', background: '#0A0A14', border: '2px solid #3D5CFF', borderRadius: 16, padding: '40px 48px', boxSizing: 'border-box' }}>
            <div className="banner-shimmer-home" />
            <h2 className="pricing-banner-heading" style={{ fontWeight: 900, fontSize: 'clamp(26px, 4vw, 44px)', letterSpacing: '-0.03em', margin: '0 0 12px', lineHeight: 1.1, position: 'relative' }}>
              Priced per company.{' '}
              <span style={{ color: '#3D5CFF' }}>Not per person.</span>
            </h2>
            <p className="pricing-banner-subtitle" style={{ color: 'rgba(255,255,255,0.7)', fontSize: 16, lineHeight: 1.65, margin: '0 0 24px', maxWidth: 560, position: 'relative' }}>
              One flat price for your entire operation — no matter how many people you add.
            </p>
            <div className="strike-badges-row" style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 16, position: 'relative' }}>
              {[
                { text: '❌ $29/user/month extra techs', delay: '0.5s' },
                { text: '❌ $29/seat office staff',       delay: '0.8s' },
                { text: '❌ Extra license seasonal workers', delay: '1.1s' },
              ].map(({ text, delay }) => (
                <div key={text} className="strike-badge" style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', padding: '6px 14px', background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: 6, fontSize: 13, color: 'rgba(255,255,255,0.65)', overflow: 'hidden', boxSizing: 'border-box' }}>
                  {text}
                  <div style={{ position: 'absolute', top: '50%', left: 0, height: 2, background: '#ef4444', width: 0, animationName: 'strike-draw-home', animationDuration: '0.5s', animationDelay: delay, animationFillMode: 'forwards', animationTimingFunction: 'ease-out' }} />
                </div>
              ))}
            </div>
            <div className="confirm-badge" style={{ display: 'inline-block', background: 'rgba(61,92,255,0.15)', border: '1px solid rgba(61,92,255,0.4)', borderRadius: 8, padding: '8px 16px', fontSize: 14, fontWeight: 600, color: '#fff', marginBottom: 20, position: 'relative', boxSizing: 'border-box' }}>
              ✓ Unlimited owners, office staff, techs, and seasonal workers — one price
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
                    <h3 style={{ fontWeight: 700, fontSize: 17, margin: '0 0 10px' }}>{f.title}</h3>
                    <p style={{ color: 'var(--color-white-60)', fontSize: 14, margin: '0 0 20px', lineHeight: 1.65, flex: 1 }}>
                      {brandify(f.desc)}
                    </p>
                    <div>
                      <Link
                        href="/signup"
                        className="btn-primary"
                        style={{
                          display: 'inline-block',
                          borderRadius: 8,
                          padding: '10px 20px',
                          fontWeight: 700,
                          fontSize: 13,
                        }}
                      >
                        Try it free →
                      </Link>
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
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
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
            Zerbiq was built by a field service operator who managed teams, ran routes, chased invoices, dealt with no-shows,
            and eventually sold the business to private equity. We spent years using software that was built by people who had
            never dispatched a tech, never explained an invoice to a frustrated customer, and never stayed up worrying about
            whether the routes were covered.
          </p>
          <p style={{ fontSize: 16, color: 'var(--color-white-60)', lineHeight: 1.8, margin: '0 auto 32px', maxWidth: 620, textAlign: 'center' }}>
            So we built what we always needed. Every feature in Zerbiq exists because a real service business needed it —
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
            Start free. Scale when you&apos;re ready. Cancel anytime.
          </p>
          <PricingCards />
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
                <Link
                  href="/signup"
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
                  Start Free Trial
                </Link>
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
                  href="mailto:hello@zerbiq.com"
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
            questions, and get you set up for your free trial.
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
            <Link
              href="/signup"
              style={{ color: '#fff', fontWeight: 600, textDecoration: 'none' }}
            >
              Start your free trial →
            </Link>
          </p>
        </div>
      </section>

      <Footer />
    </>
  );
}
