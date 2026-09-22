import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import ZerbiqBrand, { brandify } from '@/components/ZerbiqBrand';

export const metadata = {
  title: 'Features — Zerbiq',
  description:
    'Route management, job tracking, invoicing, SMS, team management, CRM, and 40+ features — all in one field service platform.',
};

// ---------------------------------------------------------------------------
// Intro features — shown before the group sections, after the hero
// ---------------------------------------------------------------------------

const INTRO_FEATURES = [
  {
    icon: '☀️',
    title: 'Light Mode and Dark Mode',
    screenshot: '45-light-mode.png',
    desc: [
      "Your eyes, your choice. Zerbiq runs in a clean light mode or a deep dark mode — switch anytime from the top bar. Your preference is saved to your account so it follows you across every device.",
      "No squinting at a white screen at 6 AM, no straining at a dark one in a bright office. The platform adapts to the way you work, not the other way around.",
    ],
    badge: 'Included with all plans',
  },
  {
    icon: '⚡',
    title: 'Personalized Shortcuts Bar',
    screenshot: '46-shortcuts-bar.png',
    desc: [
      "Every person on your team uses Zerbiq differently. The office manager lives in Invoices and Leads. The field supervisor lives in Routes and Dispatch. The owner checks Reports first thing every morning. The shortcuts bar lets each user drag any item from the left menu and pin it directly below the header — one click away, always visible, completely personal.",
      "Add up to six shortcuts, remove them, reorder them, change them whenever your priorities change. No admin approval needed. No one else's shortcuts are affected. Your Zerbiq, your way.",
    ],
    badge: 'Included with all plans',
  },
];

// ---------------------------------------------------------------------------
// Feature groups — 44 sections in specified order with group labels
// ---------------------------------------------------------------------------

const FEATURE_GROUPS = [
  {
    group: 'Core Operations',
    features: [
      {
        icon: '🗺️',
        title: 'Route Management',
        screenshot: '01-route-management.png',
        desc: [
          "Stop rebuilding your route from scratch every week. Zerbiq organizes your stops into named, recurring routes — assigned to a tech, a truck, and a schedule. Add a new customer and they drop right into the right route.",
          "Drag to reorder. Skip a stop, bump it, or mark it done from anywhere. Your whole operation runs on the same list, in real time.",
        ],
        badge: 'Included with all plans',
      },
      {
        icon: '📋',
        title: 'Schedule and Dispatch Board',
        screenshot: '02-schedule-dispatch.png',
        desc: [
          "See every tech, every job, and every hour of the day on one screen. Drag jobs between techs, spot gaps before they become problems, and assign that new urgent call in seconds.",
          "When something changes in the field, the board updates — no phone tag, no whiteboards, no spreadsheets.",
        ],
        badge: 'Included with all plans',
      },
      {
        icon: '✅',
        title: 'Job Tracking',
        screenshot: '03-job-tracking.png',
        desc: [
          "Every job has a status. Every status tells you what happens next. From Quote Approved to Ready to Bill, Zerbiq moves jobs through your pipeline automatically — so nothing falls through the cracks and nothing stays unbilled.",
        ],
        badge: 'Included with all plans',
      },
      {
        icon: '📱',
        title: 'Mobile Team View',
        screenshot: '04-mobile-crew-view.png',
        desc: [
          "Your techs don't need training manuals. They clock in, see their stops in order, tap to start a job, tap to complete it. Photos, notes, gate codes — everything they need is right there.",
          "No paper, no group texts, no confusion about who's doing what.",
        ],
        badge: 'Included with all plans',
      },
      {
        icon: '👥',
        title: 'Team Management',
        screenshot: '05-team-management.png',
        desc: [
          "Know who's working, what they're assigned to, and how they're doing — without asking. Every team member has a profile, a route, a truck, and a skill set.",
          "Add someone new in minutes. See their whole day at a glance.",
        ],
        badge: 'Included with all plans',
      },
      {
        icon: '📅',
        title: 'Holiday Management',
        screenshot: '06-holiday-management.png',
        desc: [
          "Tell Zerbiq once which days you're closed. It handles the rest — skip the service, bump it to the next day, or schedule a makeup visit.",
          "Customers get automatically notified so you're not fielding calls on Thanksgiving wondering why no one showed up.",
        ],
        badge: 'Included with all plans',
      },
      {
        icon: '🔄',
        title: 'Billing Cycles',
        screenshot: '07-billing-cycles.png',
        desc: [
          "Batch invoicing done right. Create named billing cycles — monthly on the 1st, bi-weekly, quarterly — and assign routes to them.",
          "At the end of each cycle, Zerbiq generates one clean invoice per customer covering everything they received. No manual tallying, no missed charges.",
        ],
        badge: 'Included with all plans',
      },
      {
        icon: '📍',
        title: 'Multiple Service Locations',
        screenshot: '47-multi-location.png',
        desc: [
          "Running more than one location? Add additional service areas to your account and manage them all from one login. Routes, teams, customers, and billing stay organized by location.",
          "Available on Field and above — each additional location is $59/mo on Field and $79/mo on Command and Enterprise.",
        ],
        badge: 'Included with Field, Command & Enterprise',
      },
    ],
  },
  {
    group: 'Getting Paid',
    features: [
      {
        icon: '💰',
        title: 'Invoicing and Payments',
        screenshot: '08-invoicing-payments.png',
        desc: [
          "Get paid faster with invoices that go out the moment a job is done. Customers can pay by card, ACH, or check. You see exactly what's outstanding, what's overdue, and what came in today — all in one place.",
          "No QuickBooks required to get started.",
        ],
        badge: 'Included with all plans',
      },
      {
        icon: '💳',
        title: 'Estimates and Quotes',
        screenshot: '09-estimates-quotes.png',
        desc: [
          "Send a professional quote in minutes, right from the job site or your desk. Customers approve online with one tap.",
          "Once approved, the job is created automatically — no double entry, no lost emails, no \"did they ever get back to you?\"",
        ],
        badge: 'Included with Field, Command & Enterprise',
      },
      {
        icon: '💵',
        title: 'Partial Payments and Payment Plans',
        screenshot: '10-partial-payments.png',
        desc: [
          "Some jobs are big. Some customers need flexibility. Zerbiq gives you both. Split any invoice into scheduled installments — you set the total, the number of payments, and the due dates. Zerbiq bills each installment automatically, sends payment reminders, and tracks the running balance in real time.",
          "Whether it's a one-time split or a structured monthly plan for a commercial contract, the whole thing runs without you chasing anyone. More customers say yes when yes is easier to afford.",
        ],
        badge: 'Included with Field, Command & Enterprise',
      },
      {
        icon: '🔄',
        title: 'Credits and Refunds',
        screenshot: '11-credits-refunds.png',
        desc: [
          "Mistakes happen. A skipped visit, an overcharge, a goodwill gesture — issue a credit in seconds and apply it to the next invoice automatically.",
          "Full audit trail, no awkward conversations, no manual math.",
        ],
        badge: 'Included with all plans',
      },
      {
        icon: '📗',
        title: 'QuickBooks Sync',
        screenshot: '12-quickbooks-sync.png',
        desc: [
          "Already using QuickBooks? Keep it. Zerbiq syncs invoices, payments, and expenses to QuickBooks Online automatically — so your books stay clean without anyone re-entering data.",
          "Two systems, zero duplication.",
        ],
        badge: 'Included with Command & Enterprise',
      },
    ],
  },
  {
    group: 'Customers',
    features: [
      {
        icon: '📊',
        title: 'Customer CRM',
        screenshot: '13-customer-crm.png',
        desc: [
          "Every customer has a file. Every file has their full history — jobs, invoices, notes, equipment, route assignment, lifetime value, preferred contact method.",
          "Know who your best customers are before you walk in the door.",
        ],
        badge: 'Included with all plans',
      },
      {
        icon: '🌐',
        title: 'Customer Portal',
        screenshot: '14-customer-portal.png',
        desc: [
          "Give customers a place to log in, see their upcoming service, approve quotes, pay invoices, and check their history — without calling you. Branded with your logo and colors. Available 24/7.",
          "Customers who can self-serve become customers who stay.",
        ],
        badge: 'Included with Field, Command & Enterprise',
      },
      {
        icon: '📬',
        title: 'Lead Management',
        screenshot: '15-lead-management.png',
        desc: [
          "Track every potential customer from first contact to signed deal. See exactly where each lead is in your pipeline, when you last reached out, and what it will take to close them.",
          "Never lose a lead to a forgotten follow-up again.",
        ],
        badge: 'Included with Field, Command & Enterprise',
      },
      {
        icon: '📥',
        title: 'Embeddable Lead Capture Form',
        screenshot: '16-lead-capture-form.png',
        desc: [
          "One line of code on your website. That's all it takes to start capturing leads directly into Zerbiq. The form matches your brand, asks the right questions, and drops new leads right into your pipeline — ready to quote.",
        ],
        badge: 'Included with Field, Command & Enterprise',
      },
      {
        icon: '⭐',
        title: 'Reviews and Reputation Management',
        screenshot: '17-reviews-reputation.png',
        desc: [
          "Your reputation is your pipeline. Zerbiq makes it easy to ask for reviews at exactly the right moment — right after a job well done.",
          "Track your request-to-review rate, see what customers are saying, and build the kind of reputation that sells for you.",
        ],
        badge: 'Included with all plans',
      },
    ],
  },
  {
    group: 'Communications and Automation',
    features: [
      {
        icon: '💬',
        title: 'Automated Customer Notifications',
        screenshot: '18-automated-notifications.png',
        desc: [
          "Customers hate surprises. Zerbiq sends them the right message at the right time — job reminders, completion confirmations, invoice notices, overdue reminders — all automatic, all in your voice, all with your branding.",
          "Fewer calls to you. Happier customers.",
        ],
        badge: 'Included with all plans',
      },
      {
        icon: '🔔',
        title: 'Appointment Reminders',
        screenshot: '19-appointment-reminders.png',
        desc: [
          "A simple text the day before drops no-shows and complaints by a wide margin. Zerbiq sends it automatically, lets customers confirm or reschedule with a single reply, and logs the response.",
          "You don't lift a finger.",
        ],
        badge: 'Included with all plans',
      },
      {
        icon: '🚗',
        title: 'Technician On The Way',
        screenshot: '20-technician-on-the-way.png',
        desc: [
          '"Is someone coming today?" Stop answering that question. When your tech starts driving to a customer, Zerbiq sends an automatic "on the way" text with the tech\'s name and ETA.',
          "Customers feel taken care of. Techs stay focused on the job.",
        ],
        badge: 'Included with all plans',
      },
      {
        icon: '🌟',
        title: 'Review Request Automation',
        screenshot: '21-review-request.png',
        desc: [
          "Two hours after a job is marked complete, Zerbiq texts the customer asking for a review. Not a generic blast — a personal message tied to that specific visit.",
          "More reviews, better reviews, less effort from you.",
        ],
        badge: 'Included with all plans',
      },
      {
        icon: '📧',
        title: 'Automated Follow-Up Sequences',
        screenshot: '22-automated-followup.png',
        desc: [
          "A lost lead isn't always a dead lead. Zerbiq can automatically follow up with prospects who didn't respond to a quote, customers who haven't booked in 60 days, or anyone who fell out of your pipeline.",
          "Set the sequence once — it runs forever.",
        ],
        badge: 'Included with Command & Enterprise',
      },
      {
        icon: '🔔',
        title: 'Automated Reminders and Notifications',
        screenshot: '23-automated-reminders.png',
        desc: [
          "Beyond customer messages — Zerbiq keeps your whole operation on track with internal alerts. Low inventory? You'll know. A vehicle service is due? Flagged. A job wasn't completed by end of day? Your manager gets notified.",
          "The system watches so you don't have to.",
        ],
        badge: 'Included with all plans',
      },
      {
        icon: '🤖',
        title: 'AI Support Chatbot',
        screenshot: '24-ai-support-chatbot.png',
        desc: [
          'Ask Zerbiq anything about your business and get a real answer — not a report to dig through. "Which tech made us the most money last month?" "How many invoices are overdue?" "What\'s on the schedule tomorrow?"',
          "Your AI assistant knows your data and answers in plain English.",
        ],
        badge: 'Included with Command & Enterprise',
      },
    ],
  },
  {
    group: 'Team and Field',
    features: [
      {
        icon: '⏱️',
        title: 'Time Tracking and Job Costing',
        screenshot: '25-time-tracking.png',
        desc: [
          "Know what a job actually costs — not just what you charged. Zerbiq tracks clock-in and clock-out, assigns labor to each job, and shows you your real margin after labor and materials.",
          "When you know your numbers, you price better and profit more.",
        ],
        badge: 'Included with all plans',
      },
      {
        icon: '🗓️',
        title: 'Attendance and Time Off',
        screenshot: '26-attendance-time-off.png',
        desc: [
          "Techs clock in from the app. You see who's on the clock, who's out, and who requested time off — all from one screen. Approve or deny requests with a tap.",
          "No paper timesheets, no payroll guessing.",
        ],
        badge: 'Included with all plans',
      },
      {
        icon: '🤝',
        title: 'Subcontractor Management',
        screenshot: '27-subcontractor-mgmt.png',
        desc: [
          "Use subs for the work you don't do in-house. Zerbiq tracks what jobs they completed, how many hours they logged, and what you owe them — separately from your W-2 team.",
          "Clean records for tax time, clear expectations year-round.",
        ],
        badge: 'Included with Field, Command & Enterprise',
      },
      {
        icon: '🗺️',
        title: 'Mileage Tracking',
        screenshot: '28-mileage-tracking.png',
        desc: [
          "Every route has miles. Every mile has value. Zerbiq logs odometer readings at clock-in and clock-out, calculates reimbursable mileage at the IRS rate, and gives you a clean monthly report.",
          "No apps to install, no logs to maintain.",
        ],
        badge: 'Included with all plans',
      },
      {
        icon: '📍',
        title: 'GPS Field Tracking',
        screenshot: '29-gps-field-tracking.png',
        desc: [
          "See where your team is in real time — from any phone, no hardware required. Verify stops were made, spot techs who are running behind, and dispatch the nearest available person to an urgent job.",
          "Works with any smartphone your team already carries.",
        ],
        badge: 'Included with all plans',
      },
      {
        icon: '🏅',
        title: 'Performance Reviews',
        screenshot: '30-performance-reviews.png',
        desc: [
          "Give your team real feedback backed by real data. Customer ratings, completion rates, punctuality, job quality — Zerbiq has the numbers. Document reviews, set goals, and recognize your top performers.",
          "Build a team that wants to stay.",
        ],
        badge: 'Included with all plans',
      },
      {
        icon: '📦',
        title: 'Employee Asset Checkout',

        screenshot: '31-employee-asset-checkout.png',
        desc: [
          "Know who has the iPad, the gas card, the backpack sprayer. Log asset checkout and return in seconds.",
          "If something goes missing, you'll know exactly who had it last — and so will they.",
        ],
        badge: 'Included with Field, Command & Enterprise',
      },
      {
        icon: '🔐',
        title: 'Employee ID and PIN Login',
        screenshot: '32-employee-pin-login.png',
        desc: [
          "Techs log into the mobile app with a simple employee ID and 4-digit PIN — no email, no forgotten passwords. Fast at 7 AM when hands are cold and coffee hasn't kicked in.",
          "You control who has access and what they can see.",
        ],
        badge: 'Included with all plans',
      },
      {
        icon: '🚨',
        title: 'Incident Tracking',
        screenshot: '33-incident-tracking.png',
        desc: [
          "Document workplace incidents the moment they happen. Safety issue, vehicle damage, customer complaint, equipment failure — log it with details, assign a follow-up, and track resolution.",
          "Creates the paper trail you need if anything escalates.",
        ],
        badge: 'Included with all plans',
      },
      {
        icon: '🚛',
        title: 'Daily Truck Inspection and Checklists',
        screenshot: '34-truck-inspection.png',
        desc: [
          "Before techs hit the road, they run through a digital inspection on their phone — tires, lights, fluid levels, equipment secured. Takes 90 seconds. Creates a timestamped record.",
          "Catches problems before they become breakdowns or liabilities.",
        ],
        badge: 'Included with all plans',
      },
    ],
  },
  {
    group: 'Assets and Inventory',
    features: [
      {
        icon: '📦',
        title: 'Materials and Inventory',
        screenshot: '35-materials-inventory.png',
        desc: [
          "Know what you have before you need it. Track every product and supply across your operation, set reorder points, and get alerts when stock runs low.",
          "When a tech uses materials on a job, it comes off the inventory automatically.",
        ],
        badge: 'Included with all plans',
      },
      {
        icon: '🛒',
        title: 'Purchase Orders',
        screenshot: '36-purchase-orders.png',
        desc: [
          "Create and send POs to your suppliers, track delivery status, and match received items to what was ordered. No more verbal orders with no paper trail. No more receiving surprises.",
          "Clean purchasing records that feed directly into your job costs.",
        ],
        badge: 'Included with all plans',
      },
      {
        icon: '🔩',
        title: 'Parts on Order',
        screenshot: '37-parts-on-order.png',
        desc: [
          "When a job is waiting on a part, it shouldn't fall off your radar. Zerbiq tracks every job on hold, what part is needed, what PO it's tied to, and when it's expected.",
          "When the part arrives, you're notified — and the return visit gets scheduled.",
        ],
        badge: 'Included with all plans',
      },
      {
        icon: '🛠️',
        title: 'Equipment and Asset Tracking',
        screenshot: '38-equipment-tracking.png',
        desc: [
          "Your equipment is one of your biggest investments. Track every piece — mowers, blowers, trailers, pressure washers — with service history, current condition, and assignment.",
          "Know what's in use, what needs repair, and what's due for maintenance before something breaks.",
        ],
        badge: 'Included with all plans',
      },
      {
        icon: '🔧',
        title: 'Maintenance Calendar',
        screenshot: '39-maintenance-calendar.png',
        desc: [
          "Oil changes, blade sharpenings, DOT inspections, annual tune-ups — scheduled automatically based on mileage or time intervals. Zerbiq tells you what's coming up, what's overdue, and what's been done.",
          "Your fleet stays road-ready. Your costs stay predictable.",
        ],
        badge: 'Included with Field, Command & Enterprise',
      },
    ],
  },
  {
    group: 'Intelligence',
    features: [
      {
        icon: '🧠',
        title: 'Route Intelligence',
        screenshot: '40-route-intelligence.png',
        desc: [
          "Let the math do the driving. Zerbiq's optimization engine sequences your stops to minimize drive time and fuel — saving the average route 30–45 minutes per day.",
          "When an urgent job comes in, it instantly finds the nearest available tech. Smarter routing, lower costs, more jobs per day.",
        ],
        badge: 'Included with Field, Command & Enterprise',
      },
      {
        icon: '📈',
        title: 'Reports and Analytics',
        screenshot: '41-reports-analytics.png',
        desc: [
          "Ten reporting tabs that actually tell you something useful. Revenue by service, job costing by tech, receivables aging, mileage by route, review conversion rates — the numbers that run your business, organized and ready.",
          "Export any report to CSV or PDF in one click.",
        ],
        badge: 'Included with all plans',
      },
      {
        icon: '📤',
        title: 'Data Export',
        screenshot: '42-data-export.png',
        desc: [
          "Your data belongs to you — all of it, always. Export your customers, jobs, invoices, timecards, and inventory to CSV or PDF whenever you want.",
          "No hoops, no fees, no waiting. If you ever want to leave, you take everything with you.",
        ],
        badge: 'Included with all plans',
      },
    ],
  },
  {
    group: 'Branding',
    features: [
      {
        icon: '🎨',
        title: 'Custom Branding',
        screenshot: '43-custom-branding.png',
        desc: [
          "Zerbiq works in your brand — not ours. Upload your logo, set your brand color, and every invoice, estimate, portal page, and notification your customers see carries your identity.",
          "Included with every plan. Because your business deserves to look like your business.",
        ],
        badge: 'Included with all plans',
      },
    ],
  },
];

// ---------------------------------------------------------------------------
// Screenshot component — uses explicit filename per feature
// ---------------------------------------------------------------------------

function FeatureImage({ screenshot, label }) {
  if (!screenshot) return (
    <div
      style={{
        borderRadius: 14,
        overflow: 'hidden',
        border: '1px solid var(--color-white-10)',
        aspectRatio: '16/10',
        minHeight: 220,
        background: 'var(--color-raised)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <span style={{ fontSize: 48, opacity: 0.15 }}>🖼️</span>
    </div>
  );
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
        src={`/screenshots/${screenshot}`}
        alt={label}
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Group divider
// ---------------------------------------------------------------------------

function GroupDivider({ label }) {
  return (
    <div
      style={{
        padding: '56px 24px 8px',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 16,
          maxWidth: 1100,
          width: '100%',
        }}
      >
        <div style={{ flex: 1, height: 1, background: 'var(--color-white-10)' }} />
        <span
          style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--color-primary)',
            whiteSpace: 'nowrap',
          }}
        >
          {label}
        </span>
        <div style={{ flex: 1, height: 1, background: 'var(--color-white-10)' }} />
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function FeaturesPage() {
  // Build a flat list to drive alternating background
  let globalIndex = 0;

  return (
    <>
      <Navbar />

      <style>{`
        @media (max-width: 768px) {
          .feat-text { order: 2 !important; }
          .feat-img  { order: 1 !important; }
        }
      `}</style>

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
            Every feature in <ZerbiqBrand /> is designed for one purpose: helping field service businesses
            run cleaner, get paid faster, and grow without chaos.
          </p>
        </div>
      </section>

      {INTRO_FEATURES.map((feature) => {
        const i = globalIndex++;
        const isEven = i % 2 === 0;
        return (
          <section
            key={feature.title}
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
              <div className="feat-text" style={{ order: isEven ? 0 : 1 }}>
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
                    {brandify(p)}
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
              <div className="feat-img" style={{ order: isEven ? 1 : 0 }}>
                <FeatureImage screenshot={feature.screenshot} label={feature.title} />
              </div>
            </div>
          </section>
        );
      })}

      {FEATURE_GROUPS.map((group) => (
        <div key={group.group}>
          <GroupDivider label={group.group} />
          {group.features.map((feature) => {
            const i = globalIndex++;
            const isEven = i % 2 === 0;
            return (
              <section
                key={feature.title}
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
                  <div className="feat-text" style={{ order: isEven ? 0 : 1 }}>
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
                        {brandify(p)}
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
                  <div className="feat-img" style={{ order: isEven ? 1 : 0 }}>
                    <FeatureImage screenshot={feature.screenshot} label={feature.title} />
                  </div>
                </div>
              </section>
            );
          })}
        </div>
      ))}

      <Footer />
    </>
  );
}
