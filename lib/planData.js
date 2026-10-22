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
// Texting is an OPTIONAL add-on for every plan. No texts are included in any
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

/** Shared texting wording. Used word for word on the pricing box, the FAQ and /texting. */
export const TEXTING_NUMBER_PHRASE = 'toll-free number (it starts with 8xx)';
export const TEXTING_REVIEW_TIME = 'Carrier review usually takes a few business days and can take up to a couple of weeks.';
export const TEXTING_OFF_ON_TITLE = 'Turning texting off and back on';
export const TEXTING_EIN_NOTE =
  'An EIN is strongly recommended. Sole proprietors without one can apply, but carriers review them manually, which takes longer. A free EIN from the IRS speeds approval.';

/** "500 texts for $10" style labels for each prepaid block. */
export function textBlockLabels() {
  return TEXTING_ADDON.blocks.map(
    (b) => `${b.texts.toLocaleString('en-US')} for $${b.price}`,
  );
}

/** Short label for the cheapest block, e.g. "From $10 for 500 texts". */
export function textBlockFromLabel() {
  const first = TEXTING_ADDON.blocks[0];
  // Non-breaking spaces keep "From $10" and "500 texts" together when the
  // comparison-table column is narrow, so "texts" never sits alone on a line.
  return `From\u00a0$${first.price} for ${first.texts.toLocaleString('en-US')}\u00a0texts`;
}

/** Link to the full texting box on the pricing page. */
export const TEXTING_PRICING_HREF = '/pricing#texting-addon';

/** The reason texting is never included. Used word for word everywhere. */
export const TEXTING_WHY =
  'No texts are included in any plan, because carriers charge for every text.';

/** One plain sentence used wherever a feature mentions texts. */
export const TEXTING_NOTE =
  'Sent by email on every plan. Texting is an optional add-on ($49 one-time setup plus prepaid text blocks).';

/** Add-on summary: identical wording on every card that mentions texting. */
export const TEXTING_ADDON_SUMMARY =
  `Texting is an optional add-on for every plan: $${TEXTING_ADDON.setupFee} one-time setup, then prepaid text blocks. ${TEXTING_WHY}`;

/** The "want it as a text?" line added to every feature that is sent by email. */
export const TEXTING_WANT_IT_AS_TEXT = `Want it as a text? ${TEXTING_ADDON_SUMMARY}`;

/** One line for plan summary cards (same on all five plans). */
export const TEXTING_PLAN_CARD_LINE = 'Texting add-on available';

/** Short line under the plan cards on the home page. */
export function textingPricingLine() {
  const first = TEXTING_ADDON.blocks[0];
  return `Texting is an optional add-on: $${TEXTING_ADDON.setupFee} setup, then prepaid blocks from $${first.price} for ${first.texts.toLocaleString('en-US')} texts.`;
}

/**
 * The dedicated Texting card on the home page and /features.
 * Two plain lines, an "Optional add-on" badge and a link to the pricing box.
 */
export const TEXTING_CARD = {
  icon: '💬',
  title: 'Texting',
  badge: 'Optional add-on',
  desc: [
    'Send reminders, on-the-way notices and invoice links by text, from your own toll-free number.',
    `${TEXTING_WHY} $${TEXTING_ADDON.setupFee} setup, then prepaid blocks from $${TEXTING_ADDON.blocks[0].price} for ${TEXTING_ADDON.blocks[0].texts.toLocaleString('en-US')} texts.`,
  ],
  linkLabel: 'See texting prices →',
  linkHref: TEXTING_PRICING_HREF,
};

/** Full plain-English answer for the pricing FAQ "How does texting work?". */
export const TEXTING_FAQ_ANSWER =
  `Texting is an optional add-on for every plan: Solo, Core, Field, Command and Enterprise. No texts are included in any plan, because phone carriers charge for every text. ` +
  `Setup is $${TEXTING_ADDON.setupFee} one time. It registers your business with the phone carriers. Your texts then come from your own ${TEXTING_NUMBER_PHRASE}, verified under your business name. ` +
  `${TEXTING_REVIEW_TIME} Until it is approved, your messages go out by email. ` +
  `Then you buy prepaid text blocks: ${textBlockLabels().join(', ')}. Block texts never expire. A long text, or one with emoji, can count as 2 or more texts. ` +
  `When your texts run out, texting pauses and your messages go by email until you buy more. Nothing is ever sent that you did not pay for. ` +
  `If you turn texting off, your toll-free number is released and cannot be recovered. Turning it back on means paying the $${TEXTING_ADDON.setupFee} setup again, getting a new toll-free number, and waiting for carrier approval again. Any texts you already bought stay on your account. ` +
  `Without texting, every plan still sends appointment reminders, on-the-way notices, invoices and review requests by email.`;

/** Page that explains how texting works (linked from the pricing box and FAQ). */
export const TEXTING_EXPLAINER_HREF = '/texting';

/** Label for links to the explainer. */
export const TEXTING_EXPLAINER_LINK_LABEL = 'How texting works →';

/**
 * Eddie's approved texting explainer. One source for the /texting page and the
 * short pricing FAQ entries. Each section is a heading plus paragraphs and/or a bullet list.
 * Prices come from TEXTING_ADDON, so they match the app.
 */
export const TEXTING_EXPLAINER = {
  title: 'How texting works',
  subtitle: 'and why it’s billed on its own',
  intro: [
    'Sending a business text involves several parties: Zerbiq, our messaging provider, and the mobile carriers (AT&T, T-Mobile, Verizon and others). Carriers charge for every text and every number, and they require every business to be verified before it can text customers. These rules exist to stop spam, and they are strict and change often.',
    'No plan includes texts, so you only pay for texting if you use it.',
  ],
  sections: [
    {
      id: 'prices-can-change',
      heading: 'Prices can change',
      paragraphs: [
        'Carriers and providers can change their fees at any time. If our texting prices change, we’ll tell you before it happens, and the new price will show on the text-block purchase screen. Texts you’ve already bought are always honored at the price you paid, and they never expire.',
      ],
    },
    {
      id: 'verification',
      heading: 'Verification must match exactly',
      paragraphs: [
        'Carriers review every business before its number can send texts. They reject applications when details don’t match exactly, so please fill in the form carefully:',
      ],
      bullets: [
        'Your legal business name exactly as it appears on your IRS (EIN) records',
        `Your EIN. ${TEXTING_EIN_NOTE}`,
        'A live website showing your business name, services, contact details and address, with Privacy Policy and Terms pages',
        'A business email on your website’s domain (Gmail-style addresses are often declined)',
      ],
      after: [
        `${TEXTING_REVIEW_TIME} If the carriers reject it, we’ll show you exactly what to fix so you can resubmit. Until your number is verified, messages go out by email.`,
      ],
    },
    {
      id: 'toll-free',
      heading: 'Why a toll-free number',
      paragraphs: [
        `We give your business its own dedicated ${TEXTING_NUMBER_PHRASE} instead of a local one. Local numbers carry extra monthly carrier fees that would raise your price, and to your customers an unfamiliar local number and an unfamiliar toll-free number look much the same. What they recognize is your business name, and Zerbiq’s automatic texts always include it.`,
      ],
    },
    {
      id: 'off-and-on',
      heading: TEXTING_OFF_ON_TITLE,
      paragraphs: [
        `Turning texting off releases your number. If you turn it back on later, you’ll get a new number, the carriers will need to verify it again, and the $${TEXTING_ADDON.setupFee} setup fee applies again.`,
      ],
    },
  ],
};

/** "Who can use texting": every qualification in plain words. Shown first on /texting. */
export const TEXTING_DREAM_APP_LAB_QUOTE_HREF = 'https://dreamapplab.com/instant-quote.html';
export const TEXTING_ELIGIBILITY = {
  id: 'who-can-use',
  heading: 'Who can use texting',
  summary: 'Carriers only approve verified businesses. To use texting you need:',
  items: [
    'A registered business with an EIN. Sole proprietors without one can apply, but review is manual and slower.',
    'Your legal business name exactly as it appears on your IRS records.',
    'A live website (not “under construction”) that shows your business name, services, contact details and address.',
    'Privacy Policy and Terms pages on your website, linked in the footer. The Privacy Policy must say that text-message opt-in information is never sold or shared for marketing. Zerbiq gives you ready-to-paste wording to send to your web person.',
    'A business email on your website’s domain. Gmail-style addresses are often declined.',
    'Customers must opt in to texts. The opt-in must be optional, unchecked by default and separate from other agreements. Zerbiq’s opt-in form handles this.',
  ],
  noWebsite: 'No website yet? Dream App Lab builds professional websites at affordable prices:',
  noWebsiteLinkLabel: 'Get an instant quote →',
  noWebsiteHref: TEXTING_DREAM_APP_LAB_QUOTE_HREF,
  boxSummary: 'To text, your business needs an EIN, a live website with Privacy Policy and Terms pages, and a business email on your website’s domain.',
};

/** The prices block at the top of the explainer page. */
export function textingPriceSummary() {
  return `$${TEXTING_ADDON.setupFee} one-time setup, then prepaid text blocks: ${textBlockLabels().join(', ')}. Block texts never expire.`;
}

/** Short FAQ entries on the pricing page. Each links to the matching explainer section. */
export const TEXTING_FAQ_SHORT = [
  {
    q: 'Why toll-free?',
    a: `Your business gets its own dedicated ${TEXTING_NUMBER_PHRASE} because local numbers carry extra monthly carrier fees that would raise your price. Your customers recognize your business name, and Zerbiq’s automatic texts always include it.`,
    href: `${TEXTING_EXPLAINER_HREF}#toll-free`,
  },
  {
    q: 'Can texting prices change?',
    a: 'Carriers and providers can change their fees at any time. If our texting prices change, we’ll tell you before it happens. Texts you’ve already bought are always honored at the price you paid, and they never expire.',
    href: `${TEXTING_EXPLAINER_HREF}#prices-can-change`,
  },
  {
    q: 'What do I need to get verified?',
    a: `Your legal business name exactly as it appears on your IRS (EIN) records, your EIN, a live website with Privacy Policy and Terms pages, and a business email on your website’s domain. ${TEXTING_EIN_NOTE} Carriers reject applications when details don’t match exactly. ${TEXTING_REVIEW_TIME}`,
    href: `${TEXTING_EXPLAINER_HREF}#who-can-use`,
  },
];

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
  addon: 'An optional add-on for every plan',
  // Email features that can also be sent by text with the add-on. Never says
  // texting is included.
  allEmail: 'Included (by email) · texting is an add-on',
};

/**
 * Group display order for feature cards, built from the badge data itself:
 * plan order first (all plans, then Core, Field, Command, Enterprise) with the
 * optional add-on right after "All Plans".
 */
export const BADGE_GROUPS = [
  { key: 'all',   label: 'All Plans',                        badges: [BADGE.all, BADGE.allEmail] },
  { key: 'addon', label: 'An optional add-on for every plan',  badges: [BADGE.addon] },
  { key: 'core',  label: 'Core, Field, Command & Enterprise', badges: [BADGE.core] },
  { key: 'field', label: 'Field, Command & Enterprise',      badges: [BADGE.field] },
  { key: 'cmd',   label: 'Command & Enterprise',             badges: [BADGE.cmd] },
  { key: 'ent',   label: 'Enterprise',                       badges: [BADGE.ent] },
];

/**
 * Split cards ({ badge }) into display groups. Every card lands in exactly one
 * group: a card whose badge is not in BADGE_GROUPS gets a group of its own
 * (labelled with the badge text) at the end, so no card is ever dropped.
 * Empty groups are left out.
 * @param {{ badge: string }[]} cards
 * @returns {{ key: string, label: string, features: object[] }[]}
 */
export function groupByBadge(cards) {
  const known = new Set(BADGE_GROUPS.flatMap((g) => g.badges));
  const groups = BADGE_GROUPS.map((g) => ({
    key: g.key,
    label: g.label,
    features: cards.filter((c) => g.badges.includes(c.badge)),
  }));
  const other = [...new Set(cards.filter((c) => !known.has(c.badge)).map((c) => c.badge))];
  for (const badge of other) {
    groups.push({ key: `other-${badge}`, label: badge, features: cards.filter((c) => c.badge === badge) });
  }
  return groups.filter((g) => g.features.length > 0);
}

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
  // Texts are an optional add-on for every plan (see TEXTING_ADDON). The same
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
