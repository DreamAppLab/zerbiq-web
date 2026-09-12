import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';

export const metadata = {
  title: 'Features — Zerbiq',
  description:
    'Route management, job tracking, invoicing, SMS, crew management, CRM, and 30+ features — all in one field service platform.',
};

const FEATURES = [
  {
    icon: '🗺️',
    title: 'Route Management',
    desc: [
      "Build optimized routes for your crews in minutes — not hours. Assign stops, drag to reorder, and push routes directly to your team's phones with one tap.",
      'See your entire territory at a glance. Know which crew is closest to an urgent job. Change a route on the fly without making a single phone call.',
    ],
    badge: 'Included with all plans',
  },
  {
    icon: '📋',
    title: 'Job Tracking',
    desc: [
      'Schedule one-time and recurring jobs from a single screen. Set it once — Zerbiq handles the rest for weekly, biweekly, monthly, and quarterly jobs automatically.',
      'Every job moves through a clear status flow: Scheduled → Dispatched → In Progress → Completed. See where every job stands in real time, from any device.',
    ],
    badge: 'Included with all plans',
  },
  {
    icon: '💰',
    title: 'Invoicing & Payments',
    desc: [
      'Generate invoices the moment a job is marked complete. Send via email or SMS with one click. Collect card payments, ACH, or cash — your choice.',
      'Track what\'s paid, outstanding, and overdue. Automated late fees and payment reminders keep revenue flowing without manual follow-up.',
    ],
    badge: 'Included with all plans',
  },
  {
    icon: '💬',
    title: 'Two-Way SMS Messaging',
    desc: [
      'Communicate with customers the way they prefer — text. Send appointment reminders, job updates, invoice links, and follow-ups directly from Zerbiq.',
      'Customers reply and you see it instantly in your inbox. Full TCPA compliance built in. Every conversation is logged to the customer record automatically.',
    ],
    badge: 'Included with all plans',
  },
  {
    icon: '🚗',
    title: 'Technician On The Way',
    desc: [
      "When a tech is headed to a job, one tap sends the customer an automatic SMS: their tech's name, estimated arrival time, and a confirmation of what's being done.",
      "No more 'when will you be here?' calls. Customers stay informed, your crew stays focused, and your business looks professional every single time.",
    ],
    badge: 'Included with all plans',
  },
  {
    icon: '📅',
    title: 'Appointment Reminders',
    desc: [
      'Zerbiq automatically sends customers a reminder before every scheduled job. Reduce no-shows and last-minute cancellations without lifting a finger.',
      'Reminders go out via SMS at your chosen interval. Customers can confirm or request a reschedule — all without calling your office.',
    ],
    badge: 'Included with Command & Enterprise',
  },
  {
    icon: '👥',
    title: 'Crew Management',
    desc: [
      'Add every team member with a role and permission level. Field techs see only what they need. Admins and managers see everything. No shared logins.',
      'Track time automatically when crews check in and out of jobs. Review timecards, approve hours, and calculate job costs — all without spreadsheets.',
    ],
    badge: 'Included with all plans',
  },
  {
    icon: '📊',
    title: 'Customer CRM',
    desc: [
      'Every customer gets a complete profile: contact info, service history, invoices, notes, photos, and equipment logs — all in one place.',
      'The customer portal lets clients view upcoming jobs, pay invoices online, approve quotes, and leave notes. Fewer calls. Happier customers.',
    ],
    badge: 'Included with all plans',
  },
  {
    icon: '📱',
    title: 'Mobile Crew View',
    desc: [
      'Your techs get a clean view of their day: where to go, what to do, and how to log it. Works on any smartphone. No app store required.',
      'Crews can snap job photos, log materials used, report issues, collect digital signatures, and clock in and out — all from the field, synced instantly.',
    ],
    badge: 'Included with all plans',
  },
  {
    icon: '💳',
    title: 'Estimates & Quotes',
    desc: [
      'Create professional estimates in seconds. Send via email or SMS. Clients approve with one tap — no login required.',
      'Approved estimates convert to jobs and invoices automatically. No re-entering data, no dropped balls.',
    ],
    badge: 'Included with all plans',
  },
  {
    icon: '📈',
    title: 'Reports & Analytics',
    desc: [
      'Revenue by route, tech, or service type. Overdue invoice aging. Customer retention rates. Job completion percentages. Tech performance rankings.',
      'Eight reporting tabs give you the numbers that matter. Export any report to CSV or PDF. Know your most profitable jobs, customers, and routes — and make smarter decisions.',
    ],
    badge: 'Included with Field, Command & Enterprise',
  },
  {
    icon: '🗓️',
    title: 'Schedule & Dispatch Board',
    desc: [
      'See every job for the day in a calendar view by tech or route. Drag to reschedule. Spot gaps. Respond to last-minute changes without a single phone call.',
      'Week and day views, tech-colored job cards, overlap detection, and drag-to-schedule. Your whole operation visible at a glance.',
    ],
    badge: 'Included with Field, Command & Enterprise',
  },
  {
    icon: '💵',
    title: 'Partial Payments & Payment Plans',
    desc: [
      'Give customers flexibility to pay over time. Set up payment plans, record partial payments, and track balances automatically.',
      'Great for larger jobs or long-term service agreements. Your books stay clean without manual tracking.',
    ],
    badge: 'Included with Field, Command & Enterprise',
  },
  {
    icon: '📦',
    title: 'Materials & Inventory',
    desc: [
      'Track every product, chemical, and supply your crews use in the field. Log usage per job, set reorder points, and know your stock levels at all times.',
      'Generate purchase orders automatically when stock runs low. Every cost tied to every job — no guessing on margins.',
    ],
    badge: 'Included with Field, Command & Enterprise',
  },
  {
    icon: '🛒',
    title: 'Purchase Orders',
    desc: [
      'Generate purchase orders by supplier with one click. Send directly to vendors by email or print on site.',
      'Track approval status, delivery, and costs. Close the loop between what was ordered and what was received — all without leaving Zerbiq.',
    ],
    badge: 'Included with Field, Command & Enterprise',
  },
  {
    icon: '⏱️',
    title: 'Time Tracking & Job Costing',
    desc: [
      'See exactly how long every job takes and what it costs in labor and materials. Compare estimated vs. actual in real time.',
      'Know your most profitable jobs, customers, and routes. Spot where time and money are being lost — and fix it.',
    ],
    badge: 'Included with Field, Command & Enterprise',
  },
  {
    icon: '🤝',
    title: 'Subcontractor Management',
    desc: [
      'Add 1099 subcontractors alongside your W-2 employees. Assign jobs, track hours, and manage payments separately.',
      'Keep your subcontractor work organized without a second system. Everything in one place.',
    ],
    badge: 'Included with Field, Command & Enterprise',
  },
  {
    icon: '🌟',
    title: 'Review Request Automation',
    desc: [
      'After a job is completed, Zerbiq automatically sends a review request via SMS or email. More reviews, less asking.',
      'Direct customers straight to Google, Facebook, or wherever you want reviews. Set it once and watch your rating climb.',
    ],
    badge: 'Included with Field, Command & Enterprise',
  },
  {
    icon: '📬',
    title: 'Automated Follow-Up Sequences',
    desc: [
      'Send a series of follow-up messages to leads and inactive customers automatically. Stay top of mind without manual effort.',
      'Set up sequences once — Zerbiq handles timing, personalization, and delivery. Convert more leads into customers.',
    ],
    badge: 'Included with Field, Command & Enterprise',
  },
  {
    icon: '📋',
    title: 'Lead Management',
    desc: [
      'Capture leads from your website embed form, manual entry, or direct import. Manage them through a visual Kanban pipeline.',
      'Track every lead from first contact to converted customer. Know your conversion rate, lead sources, and pipeline value at a glance.',
    ],
    badge: 'Included with all plans',
  },
  {
    icon: '🔔',
    title: 'Automated Reminders & Notifications',
    desc: [
      'Invoice overdue? Zerbiq reminds the customer automatically. Job not completed on time? You get notified. Maintenance due? Scheduled alert fires before it becomes a problem.',
      'Set your rules once. Zerbiq runs them every day without you thinking about it.',
    ],
    badge: 'Included with Command & Enterprise',
  },
  {
    icon: '⚠️',
    title: 'Automated Late Fees',
    desc: [
      'Set your late fee policy once. Zerbiq applies it automatically to overdue invoices on the date you specify.',
      'No awkward conversations. No manual tracking. Just consistent policy enforcement that gets you paid faster.',
    ],
    badge: 'Included with Command & Enterprise',
  },
  {
    icon: '🔧',
    title: 'Maintenance Calendar',
    desc: [
      'Track service intervals for vehicles and equipment. Get alerts before things break down. Log full maintenance history and costs.',
      'Never miss an oil change, equipment inspection, or service interval again. Keep your fleet and tools running longer.',
    ],
    badge: 'Included with Command & Enterprise',
  },
  {
    icon: '📗',
    title: 'QuickBooks Sync',
    desc: [
      'Every invoice, payment, and expense syncs to QuickBooks automatically. Your books stay clean without double entry.',
      "Hand your accountant a file they'll actually love at tax time.",
    ],
    badge: 'Included with Command & Enterprise',
  },
  {
    icon: '🗺️',
    title: 'Mileage Tracking',
    desc: [
      'Crews log mileage from their phone. IRS reimbursement rates calculated automatically. Know your vehicle costs per job and per route.',
      'Export mileage reports for tax purposes with one click.',
    ],
    badge: 'Included with all plans',
  },
  {
    icon: '🛠️',
    title: 'Equipment & Asset Tracking',
    desc: [
      'Log every piece of equipment with service history, assignment, condition reports, and maintenance logs.',
      'Know where every asset is, when it was last serviced, and when it\'s due again. Reduce downtime and extend asset life.',
    ],
    badge: 'Included with all plans',
  },
  {
    icon: '📥',
    title: 'Embeddable Lead Capture Form',
    desc: [
      'Add a lead capture form to any website with one line of code. Leads go directly into your Zerbiq pipeline.',
      'Customize fields, add your branding, and stop losing leads to contact forms that go nowhere.',
    ],
    badge: 'Included with all plans',
  },
  {
    icon: '📤',
    title: 'Data Export',
    desc: [
      'Export any data — customers, jobs, invoices, routes, team — to CSV or PDF at any time. Full account ZIP export available.',
      'Your data is yours. Always. No lock-in, no hostage data.',
    ],
    badge: 'Included with all plans',
  },
  {
    icon: '🎨',
    title: 'Custom Branding',
    desc: [
      'Upload your company logo and brand color. Your logo appears throughout the platform so your team sees your brand every time they log in.',
    ],
    badge: 'Included with Command & Enterprise',
  },
  {
    icon: '🌐',
    title: 'Customer Portal',
    desc: [
      'Every customer gets a private portal to view upcoming jobs, pay invoices, approve quotes, and leave notes — without calling you.',
      'Reduce inbound calls. Give clients the transparency they want.',
    ],
    badge: 'Included with all plans',
  },
];

function FeatureImage({ index, label }) {
  const num = String(index + 1).padStart(2, '0');
  return (
    <div
      style={{
        borderRadius: 14,
        overflow: 'hidden',
        border: '1px solid var(--color-white-10)',
        aspectRatio: '16/10',
        minHeight: 220,
        background: 'var(--color-raised)',
      }}
    >
      <img
        src={`/screenshots/zerbiq-${num}.png`}
        alt={label}
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      />
    </div>
  );
}

export default function FeaturesPage() {
  return (
    <>
      <Navbar />

      <section
        style={{
          padding: '80px 24px 60px',
          textAlign: 'center',
        }}
      >
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
            Built for the field. Loved by the office.
          </h1>
          <p
            style={{
              color: 'var(--color-white-60)',
              fontSize: 17,
              lineHeight: 1.7,
              margin: 0,
            }}
          >
            Every feature in Zerbiq is designed for one purpose: helping field service businesses
            run cleaner, get paid faster, and grow without chaos.
          </p>
        </div>
      </section>

      {FEATURES.map((feature, i) => {
        const isEven = i % 2 === 0;
        return (
          <section
            key={feature.title + i}
            style={{
              padding: '60px 24px',
              background: isEven ? 'var(--color-surface)' : undefined,
            }}
          >
            <div
              style={{
                maxWidth: 1100,
                margin: '0 auto',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: 48,
                alignItems: 'center',
              }}
            >
              {/* Text side */}
              <div style={{ order: isEven ? 0 : 1 }}>
                <div style={{ fontSize: 36, marginBottom: 16 }}>{feature.icon}</div>
                <h2
                  style={{
                    fontWeight: 900,
                    fontSize: 'clamp(24px, 3vw, 36px)',
                    letterSpacing: '-0.03em',
                    margin: '0 0 20px',
                    lineHeight: 1.15,
                  }}
                >
                  {feature.title}
                </h2>
                {feature.desc.map((p, j) => (
                  <p
                    key={j}
                    style={{
                      color: 'var(--color-white-60)',
                      fontSize: 16,
                      lineHeight: 1.75,
                      margin: j < feature.desc.length - 1 ? '0 0 16px' : '0 0 28px',
                    }}
                  >
                    {p}
                  </p>
                ))}
                <Link
                  href="/signup"
                  className="btn-primary"
                  style={{
                    display: 'inline-block',
                    borderRadius: 8,
                    padding: '12px 24px',
                    fontWeight: 700,
                    fontSize: 14,
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
                  {feature.badge}
                </div>
              </div>

              {/* Screenshot side */}
              <div style={{ order: isEven ? 1 : 0 }}>
                <FeatureImage index={i} label={feature.title} />
              </div>
            </div>
          </section>
        );
      })}

      <Footer />
    </>
  );
}
