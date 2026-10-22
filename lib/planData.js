// ─────────────────────────────────────────────────────────────────────────────
// lib/planData.js — Single source of truth for Zerbiq plan features & metadata.
//
// To change which plans include a feature, update FEATURE_GATE here.
// PricingCards, compare page, features page, homepage, signup page and FAQs
// all derive their data from this file.
// ─────────────────────────────────────────────────────────────────────────────

import { earlyAccessHref } from './earlyAccess.mjs';
import { PRIMARY_CTA_LABEL } from './siteConfig.mjs';

// ── Early access ──────────────────────────────────────────────────────────────
// "Request Early Access" opens the lead form (/early-access); it creates no
// account. The form and its email live in lib/earlyAccess.mjs.

/** Early-access link for CTAs that are not tied to one plan. */
export const EARLY_ACCESS_HREF = earlyAccessHref();

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
    cta: PRIMARY_CTA_LABEL,
    ctaHref: earlyAccessHref('Solo'),
    ctaExternal: false,
    popular: false,
  },
  {
    name: 'Core',
    monthlyPrice: 119,
    annualPrice: 1190,
    activeCustomers: '500',
    subtitle: 'Up to 500 active customers',
    cta: PRIMARY_CTA_LABEL,
    ctaHref: earlyAccessHref('Core'),
    ctaExternal: false,
    popular: false,
  },
  {
    name: 'Field',
    monthlyPrice: 169,
    annualPrice: 1690,
    activeCustomers: '1,000',
    subtitle: 'Up to 1,000 active customers',
    cta: PRIMARY_CTA_LABEL,
    ctaHref: earlyAccessHref('Field'),
    ctaExternal: false,
    popular: false,
  },
  {
    name: 'Command',
    monthlyPrice: 209,
    annualPrice: 2090,
    activeCustomers: '2,500',
    subtitle: 'Up to 2,500 active customers',
    badge: 'Most Popular',
    cta: PRIMARY_CTA_LABEL,
    ctaHref: earlyAccessHref('Command'),
    ctaExternal: false,
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

// ── Texting add-on ────────────────────────────────────────────────────────────
// Texting is an OPTIONAL add-on on every plan. No texts are included in any
// plan (carriers charge for every text). Every plan still sends reminders,
// on-the-way notices, invoices and review requests by email.
// Prices and wording used by the pricing page, compare page, FAQ and homepage
// all come from here.
export const TEXTING_ADDON = {
  setupFee: 49,
  blocks: [
    { texts: 500,  price: 10 },
    { texts: 1000, price: 18 },
    { texts: 2500, price: 40 },
  ],
};

/** "500 texts for $10" style labels for each prepaid block. */
export function textBlockLabels() {
  return TEXTING_ADDON.blocks.map(
    (b) => `${b.texts.toLocaleString('en-US')} for $${b.price}`,
  );
}

/** Short label for the cheapest block, e.g. "From $10 / 500 texts". */
export function textBlockFromLabel() {
  const first = TEXTING_ADDON.blocks[0];
  return `From $${first.price} / ${first.texts.toLocaleString('en-US')} texts`;
}

/** One plain sentence used wherever a feature mentions texts. */
export const TEXTING_NOTE =
  'Sent by email on every plan. Texting is an optional add-on ($49 one-time setup plus prepaid text blocks).';

/** Full plain-English answer for the pricing FAQ "How does texting work?". */
export const TEXTING_FAQ_ANSWER =
  `Texting is an optional add-on on every plan: Solo, Core, Field, Command and Enterprise. No texts are included in any plan, because phone carriers charge for every text. ` +
  `Setup is $${TEXTING_ADDON.setupFee} one time. It registers your business with the phone carriers. Your texts then come from your own toll-free number (it starts with 8xx), verified under your business name. ` +
  `Carrier approval usually takes a few days and can take up to a couple of weeks. Until it is approved, your messages go out by email. ` +
  `Then you buy prepaid text blocks: ${textBlockLabels().join(', ')}. Block texts never expire. A long text, or one with emoji, can count as 2 or more texts. ` +
  `When your texts run out, texting pauses and your messages go by email until you buy more. Nothing is ever sent that you did not pay for. ` +
  `If you turn texting off, your toll-free number is released and cannot be recovered. Turning it back on means paying the $${TEXTING_ADDON.setupFee} setup again, getting a new toll-free number, and waiting for carrier approval again. Any texts you already bought stay on your account. ` +
  `Without texting, every plan still sends appointment reminders, on-the-way notices, invoices and review requests by email.`;

// ── Gate helpers ──────────────────────────────────────────────────────────────
// Boolean arrays ordered [Solo, Core, Field, Command, Enterprise]
const _ALL   = [true,  true,  true,  true,  true ];
const _CORE  = [false, true,  true,  true,  true ];
const _FIELD = [false, false, true,  true,  true ];
const _CMD   = [false, false, false, true,  true ];
const _ENT   = [false, false, false, false, true ];
// Optional add-on: offered on every plan, included in none.
const _ADDON = ['Add-on', 'Add-on', 'Add-on', 'Add-on', 'Add-on'];

/**
 * Convert a gate string to a [Solo, Core, Field, Command, Enterprise] array
 * for use in the comparison table. Plan gates give booleans; the 'addon' gate
 * gives the string 'Add-on' for every plan (optional, never included).
 * @param {'all'|'core'|'field'|'cmd'|'ent'|'addon'} gate
 * @returns {(boolean|string)[]}
 */
export function gateToValues(gate) {
  const map = { all: _ALL, core: _CORE, field: _FIELD, cmd: _CMD, ent: _ENT, addon: _ADDON };
  return map[gate] ?? _ALL;
}

/** Badge strings shown on feature cards, features page, etc. */
export const BADGE = {
  all:   'Included with all plans',
  core:  'Included with Core, Field, Command & Enterprise',
  field: 'Included with Field, Command & Enterprise',
  cmd:   'Included with Command & Enterprise',
  ent:   'Included with Enterprise',
  addon: 'Optional add-on on every plan',
};

/**
 * Convert a gate string to a human-readable badge.
 * @param {'all'|'core'|'field'|'cmd'|'ent'|'addon'} gate
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
// 'addon' → optional add-on offered on every plan, included in none (texting)
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
  // Texts are an optional add-on on every plan (see TEXTING_ADDON). The same
  // notices go by email on every plan.
  onTheWaySms:           'addon',
  jobCompletionSms:      'addon',
  // Reminders, invoice reminders and review requests are included by email.
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
