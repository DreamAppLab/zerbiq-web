// Home page feature cards. Kept out of app/page.js so a test can load the real
// data and check that every card is grouped and rendered exactly once.
import { BADGE, MULTI_LOCATION_FEE, TEXTING_CARD } from './planData';

export const ALL_FEATURES = [
    // ── All Plans ─────────────────────────────────────────────────────────────
  {
    icon: '👥',
    title: 'Unlimited users on Core and above. One flat price.',
    desc: 'Core, Field, Command, and Enterprise include your entire team — owners, office staff, field techs, seasonal workers. No per-seat fees. No surprise charges when you hire. No licenses to cancel when someone leaves. Solo is one user.',
    badge: BADGE.core,
  },
  {
    icon: '🗺️',
    title: 'Route Management',
    desc: "Build optimized routes for your team in minutes — not hours. Assign stops, drag to reorder, and push routes directly to your team's phones with one tap.",
    badge: BADGE.all,
  },
  {
    icon: '📋',
    title: 'Job Tracking',
    desc: 'Schedule one-time and recurring jobs from a single screen. Set it once — Zerbiq handles the rest for weekly, biweekly, monthly, and quarterly jobs automatically.',
    badge: BADGE.all,
  },
  {
    icon: '💰',
    title: 'Invoicing & Payments',
    desc: 'Generate invoices the moment a job is marked complete. Send by email with one click (by text too, with the optional texting add-on). Collect card payments, ACH, or cash — your choice.',
    badge: BADGE.allEmail,
  },
  {
    icon: TEXTING_CARD.icon,
    title: TEXTING_CARD.title,
    desc: TEXTING_CARD.desc.join(' '),
    badge: BADGE.addon,
    pill: TEXTING_CARD.badge,
    link: { label: TEXTING_CARD.linkLabel, href: TEXTING_CARD.linkHref },
  },

  {
    icon: '🚗',
    title: 'Technician On The Way',
    desc: "When a tech is headed to a job, one tap sends the customer an automatic on-the-way notice by email: their tech's name, estimated arrival time, and a confirmation of what's being done. Want it as a text? Add the optional texting add-on.",
    badge: BADGE.allEmail,
  },
  {
    icon: '👥',
    title: 'Team Management',
    desc: 'Add every team member with a role and permission level. Field techs see only what they need. Admins and managers see everything. No shared logins.',
    badge: BADGE.core,
  },
  {
    icon: '📊',
    title: 'Customer CRM',
    desc: 'Every customer gets a complete profile: contact info, service history, invoices, notes, photos, and equipment logs — all in one place.',
    badge: BADGE.all,
  },
  {
    icon: '📱',
    title: 'Mobile Team View',
    desc: "Your techs get a clean view of their day: where to go, what to do, and how to log it. Available as a native app on iOS and Android, and runs in any browser on any smartphone.",
    badge: BADGE.all,
  },
  {
    icon: '💳',
    title: 'Estimates & Quotes',
    desc: 'Create professional estimates in seconds. Send by email (or by text with the optional texting add-on). Clients approve with one tap — no login required.',
    badge: BADGE.field,
  },
  {
    icon: '📋',
    title: 'Lead Management',
    desc: 'Capture leads from your website embed form, manual entry, or direct import. Manage them through a visual Kanban pipeline.',
    badge: BADGE.field,
  },
  {
    icon: '🗺️',
    title: 'Mileage Tracking',
    desc: 'Team members log mileage from their phone. IRS reimbursement rates calculated automatically. Know your vehicle costs per job and per route.',
    badge: BADGE.all,
  },
  {
    icon: '🛠️',
    title: 'Equipment & Asset Tracking',
    desc: 'Log every piece of equipment with service history, assignment, condition reports, and maintenance logs.',
    badge: BADGE.core,
  },
  {
    icon: '📥',
    title: 'Embeddable Lead Capture Form',
    desc: 'Add a lead capture form to any website with one line of code. Leads go directly into your Zerbiq pipeline.',
    badge: BADGE.field,
  },
  {
    icon: '📤',
    title: 'Data Export',
    desc: 'Export any data — customers, jobs, invoices, routes, team — to CSV or PDF at any time. Full account ZIP export available.',
    badge: BADGE.all,
  },
  {
    icon: '🌐',
    title: 'Customer Portal',
    desc: 'Every customer gets a private portal — sign in by secure link or one-time code, view service history with visit photos, pay invoices online (card & ACH, requires a connected payment processor), submit service requests, and update contact preferences. No password required. The portal has no add-ons and no upcharges.',
    badge: BADGE.all,
  },
  // ── Field, Command & Enterprise ────────────────────────────────────────────
  {
    icon: '📈',
    title: 'Reports & Analytics',
    desc: 'Revenue by route, tech, or service type. Overdue invoice aging. Customer retention rates. Job completion percentages.',
    badge: BADGE.all,
  },
  {
    icon: '🗓️',
    title: 'Schedule & Dispatch Board',
    desc: 'See every job for the day in a calendar view by tech or route. Drag to reschedule. Spot gaps. Respond to last-minute changes without a single phone call.',
    badge: BADGE.all,
  },
  {
    icon: '💵',
    title: 'Partial Payments & Payment Plans',
    desc: 'Give customers flexibility to pay over time. Set up payment plans, record partial payments, and track balances automatically.',
    badge: BADGE.field,
  },
  {
    icon: '📦',
    title: 'Materials & Inventory',
    desc: 'Track every product, chemical, and supply your team uses in the field. Log usage per job, set reorder points, and know your stock levels at all times.',
    badge: BADGE.all,
  },
  {
    icon: '🛒',
    title: 'Purchase Orders',
    desc: 'Generate purchase orders by supplier with one click. Send directly to vendors by email or print on site.',
    badge: BADGE.core,
  },
  {
    icon: '⏱️',
    title: 'Time Tracking & Job Costing',
    desc: 'See exactly how long every job takes and what it costs in labor and materials. Compare estimated vs. actual in real time.',
    badge: BADGE.core,
  },
  {
    icon: '🤝',
    title: 'Subcontractor Management',
    desc: 'Add 1099 subcontractors alongside your W-2 employees. Assign jobs, track hours, and manage payments separately.',
    badge: BADGE.field,
  },
  {
    icon: '🌟',
    title: 'Review Request Automation',
    desc: 'After a job is completed, Zerbiq automatically sends a review request by email (or by text with the optional texting add-on). More reviews, less asking.',
    badge: BADGE.allEmail,
  },
  {
    icon: '📬',
    title: 'Automated Follow-Up Sequences',
    desc: 'Send a series of follow-up messages to leads and inactive customers automatically. Stay top of mind without manual effort.',
    badge: BADGE.cmd,
  },
  // ── Command & Enterprise ───────────────────────────────────────────────────
  {
    icon: '📅',
    title: 'Appointment Reminders',
    desc: 'Zerbiq automatically emails customers a reminder before every scheduled job (texts are available with the optional texting add-on). Reduce no-shows and last-minute cancellations without lifting a finger.',
    badge: BADGE.allEmail,
  },
  {
    icon: '🔔',
    title: 'Automated Reminders & Notifications',
    desc: 'Invoice overdue? Zerbiq reminds the customer automatically. Job not completed on time? You get notified. Set your rules once and Zerbiq runs them every day.',
    badge: BADGE.all,
  },
  {
    icon: '⚠️',
    title: 'Automated Late Fees',
    desc: 'Set your late fee policy once. Zerbiq applies it automatically to overdue invoices on the date you specify.',
    badge: BADGE.cmd,
  },
  {
    icon: '🔧',
    title: 'Maintenance Calendar',
    desc: 'Track service intervals for vehicles and equipment. Get alerts before things break down. Log full maintenance history and costs.',
    badge: BADGE.field,
  },
  {
    icon: '📗',
    title: 'QuickBooks Sync',
    desc: 'Connect QuickBooks Online and your customers and services come over. Every invoice and payment syncs back automatically, so your books stay clean without double entry.',
    badge: BADGE.all,
  },
  // ── New All Plans cards ────────────────────────────────────────────────────
  {
    icon: '📅',
    title: 'Holiday Management',
    desc: "Tell Zerbiq once which days you're closed. It handles the rest — skip the service, bump it to the next day, or schedule a makeup visit. Customers get automatically notified so you're not fielding calls wondering why no one showed up.",
    badge: BADGE.all,
  },
  {
    icon: '🔄',
    title: 'Billing Cycles',
    desc: 'Create named billing cycles — monthly on the 1st, bi-weekly, quarterly — and assign routes to them. At the end of each cycle, Zerbiq generates one clean invoice per customer. No manual tallying, no missed charges.',
    badge: BADGE.all,
  },
  {
    icon: '📍',
    title: 'GPS Field Tracking',
    desc: 'See where your team is in real time from any phone — no hardware required. Verify stops were made, spot techs running behind, and dispatch the nearest available person to an urgent job.',
    badge: BADGE.core,
  },
  {
    icon: '🚛',
    title: 'Daily Truck Inspection and Checklists',
    desc: 'Before techs hit the road they complete a digital inspection on their phone — tires, lights, fluids, equipment secured. 90 seconds. Timestamped record. Catches problems before they become breakdowns or liabilities.',
    badge: BADGE.core,
  },
  {
    icon: '🔐',
    title: 'Employee ID and PIN Login',
    desc: 'Techs log in with a simple employee ID and 4-digit PIN — no email, no forgotten passwords. Fast at 7 AM when the day is already moving. You control who has access and what they can see.',
    badge: BADGE.core,
  },
  {
    icon: '🔩',
    title: 'Parts on Order',
    desc: "When a job is waiting on a part, Zerbiq tracks it — what's needed, what PO it's tied to, and when it's expected. When the part arrives you're notified and the return visit gets scheduled.",
    badge: BADGE.all,
  },
  {
    icon: '🎨',
    title: 'Custom Branding',
    desc: "Upload your logo and set your brand color. Every invoice, estimate, customer portal, and notification your customers see carries your identity — not ours. Included with every plan.",
    badge: BADGE.all,
  },
  {
    icon: '☀️',
    title: 'Light Mode and Dark Mode',
    desc: 'Switch between a clean light mode and a deep dark mode from the top bar. Your preference is saved to your account and follows you across every device.',
    badge: BADGE.all,
  },
  {
    icon: '⚡',
    title: 'Personalized Shortcuts Bar',
    desc: "Each user drags any item from the left menu and pins it below the header — one click away, always visible, completely personal. Up to six shortcuts per user. No one else's setup is affected.",
    badge: BADGE.all,
  },
  // ── New Field, Command & Enterprise cards ─────────────────────────────────
  {
    icon: '🧠',
    title: 'Route Intelligence',
    desc: "Zerbiq's optimization engine sequences your stops to minimize drive time and fuel — saving the average route 30–45 minutes per day. When an urgent job comes in it instantly finds the nearest available tech.",
    badge: BADGE.field,
  },
  {
    icon: '📦',
    title: 'Employee Asset Checkout',
    desc: "Know who has the iPad, the gas card, the backpack sprayer. Log checkout and return in seconds. If something goes missing you'll know exactly who had it last.",
    badge: BADGE.field,
  },
  {
    icon: '📍',
    title: 'Multiple Service Locations',
    desc: `Running more than one location? Add additional service areas and manage them all from one login. Routes, teams, customers, and billing stay organized by location. Available on Field and above — $${MULTI_LOCATION_FEE.Field}/mo per additional location on Field, $${MULTI_LOCATION_FEE.Command}/mo on Command.`,
    badge: BADGE.field,
  },
];
