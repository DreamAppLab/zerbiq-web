// ─────────────────────────────────────────────────────────────────────────────
// lib/planData.js — Single source of truth for Zerbiq plan features & metadata.
//
// To change which plans include a feature, update FEATURE_GATE here.
// PricingCards, compare page, features page, homepage, signup page and FAQs
// all derive their data from this file.
// ─────────────────────────────────────────────────────────────────────────────

// ── Early access ──────────────────────────────────────────────────────────────
// "Request Early Access" captures a lead and creates no account. It goes to the
// site's existing contact address, with the lead details laid out in the email.
const EARLY_ACCESS_FIELDS = ['Name', 'Company', 'Email', 'Phone', 'Industry', 'Team size'];

/**
 * mailto link for an early-access request.
 * @param {string} [planName] the plan the visitor chose, if any
 * @returns {string}
 */
export function earlyAccessMailto(planName) {
  const subject = planName ? `Zerbiq ${planName} early access` : 'Zerbiq early access';
  const lines = [
    ...(planName ? [`Plan: ${planName}`] : []),
    ...EARLY_ACCESS_FIELDS.map((f) => `${f}: `),
  ];
  return `mailto:hello@zerbiq.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`;
}

/** Generic early-access request for CTAs that are not tied to one plan. */
export const EARLY_ACCESS_MAILTO = earlyAccessMailto();

/** Monthly fee per additional service location, by plan. */
export const MULTI_LOCATION_FEE = { Field: 69, Command: 89 };

// ── Plan metadata ─────────────────────────────────────────────────────────────
// Annual price is monthly × 10 for every priced plan (two months free).
// Order is the display order: Solo, Core, Field, Command, Enterprise.
export const PLAN_METADATA = [
  {
    name: 'Solo',
    monthlyPrice: 39.99,
    annualPrice: 399.9,
    activeCustomers: '200',
    subtitle: 'Up to 200 active customers',
    users: 1,
    cta: 'Request Early Access',
    ctaHref: earlyAccessMailto('Solo'),
    ctaExternal: true,
    popular: false,
  },
  {
    name: 'Core',
    monthlyPrice: 119,
    annualPrice: 1190,
    activeCustomers: '500',
    subtitle: 'Up to 500 active customers',
    cta: 'Request Early Access',
    ctaHref: earlyAccessMailto('Core'),
    ctaExternal: true,
    popular: false,
  },
  {
    name: 'Field',
    monthlyPrice: 169,
    annualPrice: 1690,
    activeCustomers: '1,000',
    subtitle: 'Up to 1,000 active customers',
    cta: 'Request Early Access',
    ctaHref: earlyAccessMailto('Field'),
    ctaExternal: true,
    popular: false,
  },
  {
    name: 'Command',
    monthlyPrice: 209,
    annualPrice: 2090,
    activeCustomers: '2,500',
    subtitle: 'Up to 2,500 active customers',
    badge: 'Most Popular',
    cta: 'Request Early Access',
    ctaHref: earlyAccessMailto('Command'),
    ctaExternal: true,
    popular: true,
  },
  {
    name: 'Enterprise',
    monthlyPrice: null,
    annualPrice: null,
    activeCustomers: '2,500+',
    subtitle: 'For 2,500+ active customers',
    cta: 'Contact Us',
    ctaHref: 'mailto:hello@zerbiq.com',
    ctaExternal: true,
    popular: false,
  },
];

/**
 * Format a plan price for display.
 * Whole-dollar amounts stay whole ($39, $1,190). Cent amounts keep two decimals.
 * @param {number} amount
 * @returns {string}
 */
export function formatPlanPrice(amount) {
  const cents = Math.round(Number(amount) * 100);
  const hasCents = cents % 100 !== 0;
  return (cents / 100).toLocaleString('en-US', {
    minimumFractionDigits: hasCents ? 2 : 0,
    maximumFractionDigits: 2,
  });
}

/**
 * Effective monthly price when paying annually.
 * Annual is monthly × 10, so the billed-monthly equivalent is annual / 12.
 * Whole-dollar plans round to the nearest dollar. Cent-priced plans keep cents.
 * @param {number} monthlyPrice
 * @param {number} annualPrice
 * @returns {string}
 */
export function formatAnnualMonthlyEquivalent(monthlyPrice, annualPrice) {
  const annualCents = Math.round(Number(annualPrice) * 100);
  const perMonthCents = Math.round(annualCents / 12);
  const monthlyCents = Math.round(Number(monthlyPrice) * 100);
  if (monthlyCents % 100 !== 0) return formatPlanPrice(perMonthCents / 100);
  return String(Math.round(perMonthCents / 100));
}

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
// 'core'  → Core, Field, Command, Enterprise (team & fleet — not on Solo)
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
  truckInspection:       'core',

  // ── Invoicing & Payments ───────────────────────────────────────────────────
  invoicing:             'all',
  transactionRegister:   'all',
  creditsRefunds:        'all',
  partialPayments:       'field',
  estimatesQuotes:       'field',
  // Online payments (card & ACH) are on every plan.
  // Customers pay invoices online through the customer portal.
  // Requires connecting a supported payment processor (Stripe, Square, or PayPal).
  onlinePayments:        'all',
  purchaseOrders:        'core',
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
  // contact/communication preferences. Field+ plans also show quote approval;
  // Command+ plans also show in-app messaging.
  customerPortal:        'all',
  leadManagement:        'field',
  leadCaptureForm:       'field',
  multipleLocations:     'field',

  // ── Routes & Field Operations ──────────────────────────────────────────────
  routeSheet:            'all',
  mileageTracking:       'all',
  jobPhotos:             'all',
  chemicalLogs:          'all',
  gpsFieldTracking:      'core',
  routeIntelligence:     'field',
  partsOnOrder:          'all',

  // ── Team & HR ──────────────────────────────────────────────────────────────
  rolesPermissions:      'core',
  timecards:             'core',
  attendanceTracking:    'core',
  timeOff:               'core',
  performanceReviews:    'core',
  incidentTracking:      'core',
  vehicleTracking:       'core',
  employeeTermination:   'field',
  subcontractors:        'field',
  employeeIdPin:         'core',
  assetCheckout:         'field',

  // ── Inventory & Equipment ──────────────────────────────────────────────────
  materialsCatalog:      'all',
  equipmentTracking:     'core',
  maintenanceScheduling: 'field',

  // ── Reporting & Analytics ──────────────────────────────────────────────────
  dashboard:             'all',
  revenueReports:        'all',
  jobCompletionReports:  'all',
  techPerformance:       'core',
  routeProfitability:    'all',
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
