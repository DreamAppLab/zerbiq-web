// ─────────────────────────────────────────────────────────────────────────────
// lib/planData.js — Single source of truth for Zerbiq plan features & metadata.
//
// To change which plans include a feature, update FEATURE_GATE here.
// PricingCards, compare page, features page, and homepage all derive their
// data from this file — no other file hard-codes plan gates.
// ─────────────────────────────────────────────────────────────────────────────

// ── Plan metadata ─────────────────────────────────────────────────────────────
export const PLAN_METADATA = [
  {
    name: 'Core',
    monthlyPrice: 99,
    annualPrice: 990,
    activeCustomers: '500',
    subtitle: 'Up to 500 active customers',
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
    cta: 'Contact Us',
    ctaHref: 'mailto:hello@zerbiq.com',
    ctaExternal: true,
    popular: false,
  },
];

// ── Gate helpers ──────────────────────────────────────────────────────────────
// Boolean arrays ordered [Core, Field, Command, Enterprise]
const _ALL   = [true,  true,  true,  true ];
const _FIELD = [false, true,  true,  true ];
const _CMD   = [false, false, true,  true ];
const _ENT   = [false, false, false, true ];

/**
 * Convert a gate string to a [Core, Field, Command, Enterprise] boolean array
 * for use in the comparison table.
 * @param {'all'|'field'|'cmd'|'ent'} gate
 * @returns {boolean[]}
 */
export function gateToValues(gate) {
  const map = { all: _ALL, field: _FIELD, cmd: _CMD, ent: _ENT };
  return map[gate] ?? _ALL;
}

/** Badge strings shown on feature cards, features page, etc. */
export const BADGE = {
  all:   'Included with all plans',
  field: 'Included with Field, Command & Enterprise',
  cmd:   'Included with Command & Enterprise',
  ent:   'Included with Enterprise',
};

/**
 * Convert a gate string to a human-readable badge.
 * @param {'all'|'field'|'cmd'|'ent'} gate
 * @returns {string}
 */
export function gateToBadge(gate) {
  return BADGE[gate] ?? BADGE.all;
}

// ── Feature gates ─────────────────────────────────────────────────────────────
// Changing a gate string here propagates everywhere: pricing cards, compare
// table, features page badges, and homepage feature cards.
//
// 'all'   → Core, Field, Command, Enterprise
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
  truckInspection:       'all',

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
  purchaseOrders:        'all',
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
  gpsFieldTracking:      'all',
  routeIntelligence:     'field',
  partsOnOrder:          'all',

  // ── Team & HR ──────────────────────────────────────────────────────────────
  rolesPermissions:      'all',
  timecards:             'all',
  attendanceTracking:    'all',
  timeOff:               'all',
  performanceReviews:    'all',
  incidentTracking:      'all',
  vehicleTracking:       'all',
  employeeTermination:   'field',
  subcontractors:        'field',
  employeeIdPin:         'all',
  assetCheckout:         'field',

  // ── Inventory & Equipment ──────────────────────────────────────────────────
  materialsCatalog:      'all',
  equipmentTracking:     'all',
  maintenanceScheduling: 'field',

  // ── Reporting & Analytics ──────────────────────────────────────────────────
  dashboard:             'all',
  revenueReports:        'all',
  jobCompletionReports:  'all',
  techPerformance:       'all',
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
