// ─────────────────────────────────────────────────────────────────────────────
// lib/planData.js — Single source of truth for Zerbiq plan features & metadata.
//
// To change which plans include a feature, update FEATURE_GATE here.
// To change the trial length or credit-card policy, update TRIAL here.
// PricingCards, compare page, features page, homepage, signup page, FAQs,
// and legal pages all derive their data from this file.
// ─────────────────────────────────────────────────────────────────────────────

// ── Free trial terms ──────────────────────────────────────────────────────────
export const TRIAL = {
  /** Length of the free trial in days. */
  days: 14,
  /** Whether a credit card is required to start the trial. */
  creditCardRequired: false,
  /** The URL for the app's own signup flow. */
  signupUrl: 'https://app.zerbiq.com/signup',
};

// ── Plan metadata ─────────────────────────────────────────────────────────────
export const PLAN_METADATA = [
  {
    name: 'Solo',
    monthlyPrice: 39,
    annualPrice: 390,
    activeCustomers: '200',
    subtitle: 'Up to 200 active customers',
    usersLabel: '1 owner login + 1 office helper',
    banner: 'Built for owner-operators. Everything you need to run, bill and grow — no team features you don\'t use.',
    textsIncluded: 300,
    // TODO: switch Solo CTA to signup once the app supports plan=solo
    cta: 'Coming soon — join the waitlist',
    ctaHref: 'mailto:hello@zerbiq.com?subject=Zerbiq%20Solo%20waitlist',
    ctaExternal: true,
    popular: false,
  },
  {
    name: 'Core',
    monthlyPrice: 99,
    annualPrice: 990,
    activeCustomers: '500',
    subtitle: 'Up to 500 active customers',
    banner: 'Unlimited users included — owners, office staff, and every tech in the field. One flat price. No per-seat fees. Ever.',
    textsIncluded: 750,
    cta: 'Start Free Trial',
    ctaHref: '/signup',
    ctaExternal: false,
    popular: false,
  },
  {
    name: 'Field',
    monthlyPrice: 149,
    annualPrice: 1490,
    activeCustomers: '1,000',
    subtitle: 'Up to 1,000 active customers',
    banner: 'Unlimited users included — owners, office staff, and every tech in the field. One flat price. No per-seat fees. Ever.',
    textsIncluded: 1500,
    cta: 'Start Free Trial',
    ctaHref: '/signup',
    ctaExternal: false,
    popular: false,
  },
  {
    name: 'Command',
    monthlyPrice: 199,
    annualPrice: 1990,
    activeCustomers: '2,500',
    subtitle: 'Up to 2,500 active customers',
    banner: 'Unlimited users included — owners, office staff, and every tech in the field. One flat price. No per-seat fees. Ever.',
    textsIncluded: 2500,
    badge: 'Most Popular',
    cta: 'Start Free Trial',
    ctaHref: '/signup',
    ctaExternal: false,
    popular: true,
  },
  {
    name: 'Enterprise',
    monthlyPrice: null,
    annualPrice: null,
    activeCustomers: 'Unlimited',
    subtitle: 'Unlimited active customers',
    banner: 'Unlimited users included — owners, office staff, and every tech in the field. One flat price. No per-seat fees. Ever.',
    textsIncluded: 'Custom',
    cta: 'Contact Us',
    ctaHref: 'mailto:hello@zerbiq.com',
    ctaExternal: true,
    popular: false,
  },
];

// ── Gate helpers ──────────────────────────────────────────────────────────────
// Boolean arrays ordered [Solo, Core, Field, Command, Enterprise]
const _ALL   = [true,  true,  true,  true,  true ];
const _CORE  = [false, true,  true,  true,  true ];
const _FIELD = [false, false, true,  true,  true ];
const _CMD   = [false, false, false, true,  true ];
const _ENT   = [false, false, false, false, true ];

/**
 * Convert a gate string to a [Solo, Core, Field, Command, Enterprise] boolean array
 * for use in the comparison table.
 * @param {'all'|'core'|'field'|'cmd'|'ent'} gate
 * @returns {boolean[]}
 */
export function gateToValues(gate) {
  const map = { all: _ALL, core: _CORE, field: _FIELD, cmd: _CMD, ent: _ENT };
  return map[gate] ?? _ALL;
}

/** Badge strings shown on feature cards, features page, etc. */
export const BADGE = {
  all:   'Included with all plans',
  core:  'Included with Core, Field, Command & Enterprise',
  field: 'Included with Field, Command & Enterprise',
  cmd:   'Included with Command & Enterprise',
  ent:   'Included with Enterprise',
};

/**
 * Convert a gate string to a human-readable badge.
 * @param {'all'|'core'|'field'|'cmd'|'ent'} gate
 * @returns {string}
 */
export function gateToBadge(gate) {
  return BADGE[gate] ?? BADGE.all;
}

// ── Feature gates ─────────────────────────────────────────────────────────────
// Changing a gate string here propagates everywhere: pricing cards, compare
// table, features page badges, and homepage feature cards.
//
// 'all'   → Solo, Core, Field, Command, Enterprise
// 'core'  → Core, Field, Command, Enterprise (not Solo — team & fleet features)
// 'field' → Field, Command, Enterprise
// 'cmd'   → Command, Enterprise
// 'ent'   → Enterprise only
export const FEATURE_GATE = {
  // ── Jobs & Scheduling ──────────────────────────────────────────────────────
  jobScheduling:         'all',
  recurringJobs:         'all',
  routeManagement:       'all',
  scheduleDispatch:      'all',
  dragCalendar:          'all',
  jobCancellations:      'all',
  missedStopTracking:    'all',
  holidayManagement:     'all',
  billingCycles:         'all',

  // ── Invoicing & Payments ───────────────────────────────────────────────────
  invoicing:             'all',
  transactionRegister:   'all',
  creditsRefunds:        'all',
  partialPayments:       'all',   // was 'field'; Solo+ gets partial payments
  paymentPlans:          'field', // structured installment plans split from partial payments
  estimatesQuotes:       'all',   // was 'field'; quotes & estimates on every plan
  quoteApprovalInPortal: 'all',   // was implied field+; now every plan
  // Online payments (card & ACH) are on every plan.
  // Customers pay invoices online through the customer portal.
  // Requires connecting a supported payment processor (Stripe, Square, or PayPal).
  onlinePayments:        'all',
  purchaseOrders:        'core',  // was 'all'; team/fleet feature — Core+
  quickbooksSync:        'cmd',

  // ── Communications ─────────────────────────────────────────────────────────
  onTheWaySms:           'all',
  jobCompletionSms:      'all',
  appointmentReminders:  'all',
  invoiceReminders:      'all',
  reviewRequests:        'all',
  followUpSequences:     'cmd',
  inAppMessaging:        'cmd',

  // ── Customers & CRM ────────────────────────────────────────────────────────
  customerCrm:           'all',
  customFields:          'all',
  complaintsTracking:    'all',
  // Customer portal is on every plan. Every plan's portal includes: sign-in by
  // secure link or one-time code (no passwords), service history with visit
  // photos, invoices, online invoice payment by card or bank (ACH) when the
  // business connects a supported payment processor, service requests, and
  // contact/communication preferences. All plans now also show quote approval;
  // Command+ plans also show in-app messaging.
  customerPortal:        'all',
  leadManagement:        'all',   // was 'field'; lead management on every plan
  leadCaptureForm:       'all',   // was 'field'; lead capture form on every plan
  multipleLocations:     'field',

  // ── Routes & Field Operations ──────────────────────────────────────────────
  routeSheet:            'all',
  mileageTracking:       'all',
  jobPhotos:             'all',
  chemicalLogs:          'all',
  gpsFieldTracking:      'core',  // was 'all'; team/fleet feature — Core+
  routeIntelligence:     'field',
  partsOnOrder:          'all',

  // ── Team & HR (Core+ — not available on Solo) ──────────────────────────────
  rolesPermissions:      'core',  // was 'all'
  timecards:             'core',  // was 'all'
  attendanceTracking:    'core',  // was 'all'
  timeOff:               'core',  // was 'all'
  performanceReviews:    'core',  // was 'all'
  incidentTracking:      'core',  // was 'all'
  vehicleTracking:       'core',  // was 'all'
  employeeTermination:   'core',  // was 'field'
  subcontractors:        'field',
  employeeIdPin:         'core',  // was 'all'
  assetCheckout:         'field',
  mobileTeamView:        'core',  // Core+; Solo is single-user, no team mobile view

  // ── Inventory & Equipment ──────────────────────────────────────────────────
  materialsCatalog:      'all',
  equipmentTracking:     'core',  // was 'all'; fleet/asset tracking — Core+
  maintenanceScheduling: 'field',
  truckInspection:       'core',  // was 'all'; fleet feature — Core+

  // ── Reporting & Analytics ──────────────────────────────────────────────────
  dashboard:             'all',
  revenueReports:        'all',
  jobCompletionReports:  'all',
  techPerformance:       'core',  // was 'all'; team performance — Core+
  routeProfitability:    'core',  // was 'all'; multi-tech routes — Core+
  customerRetention:     'all',
  overdueInvoiceAging:   'all',
  dataExport:            'all',

  // ── Platform & Support ─────────────────────────────────────────────────────
  mobileApp:             'all',
  pwa:                   'all',
  lightDarkMode:         'all',
  shortcutsBar:          'all',
  customBranding:        'all',
  automationsEngine:     'cmd',
  aiChatbot:             'cmd',
  prioritySupport:       'cmd',
  dedicatedOnboarding:   'ent',
  customIntegrations:    'ent',
};
