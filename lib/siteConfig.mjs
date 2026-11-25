// ─────────────────────────────────────────────────────────────────────────────
// lib/siteConfig.mjs — site-wide header/footer/CTA settings. Edit here only.
// ─────────────────────────────────────────────────────────────────────────────

/** Self-serve sign-up in the app (email, 6-digit code, onboarding wizard). */
export const SIGNUP_HREF = 'https://app.zerbiq.com/signup';

/** Plan ids the app's sign-up accepts in ?plan= (SELF_SERVE_PLAN_IDS in the zerbiq repo; Enterprise is not self-serve). */
export const SELF_SERVE_PLAN_IDS = ['solo', 'core', 'field', 'command'];

/** Sign-up link for one plan name ('Core' -> ?plan=core). Unknown or Enterprise gives the plain link. */
export function signupHref(planName) {
  const id = String(planName ?? '').trim().toLowerCase();
  return SELF_SERVE_PLAN_IDS.includes(id) ? `${SIGNUP_HREF}?plan=${id}` : SIGNUP_HREF;
}

/** Existing-user sign-in (header, mobile menu, footer). */
export const SIGN_IN_HREF = 'https://app.zerbiq.com/login';

/**
 * Label of the primary call to action (header, hero and plan buttons).
 * Every Sign Up button opens the app's self-serve sign-up (SIGNUP_HREF).
 */
export const PRIMARY_CTA_LABEL = 'Sign Up';

/**
 * "Get the app" store links, one per store. An empty string hides that store.
 * Both apps are published, so both links are set.
 */
export const STORE_LINKS = {
  appStore: 'https://apps.apple.com/app/id6825717480',
  googlePlay: 'https://play.google.com/store/apps/details?id=com.zerbiq.app',
};

/** Store entries that have a link, in display order. */
export function activeStoreLinks(links = STORE_LINKS) {
  return [
    { label: 'App Store', href: links.appStore },
    { label: 'Google Play', href: links.googlePlay },
  ].filter((s) => typeof s.href === 'string' && s.href.trim() !== '');
}

/**
 * Support / contact details shown on /support (and linked from the footer).
 * support@ is the one contact address for privacy, support, sales and early-access
 * questions (owner decision, October 26, 2026); every public page uses it.
 */
export const SUPPORT_EMAIL = 'support@zerbiq.com';
export const SUPPORT_PHONE = '(904) 385-0060';
export const SUPPORT_PHONE_HREF = 'tel:+19043850060';
export const SUPPORT_ADDRESS_LINES = [
  'Dream App Lab LLC',
  '2800 N 6th Street #5030',
  'St. Augustine, FL 32084',
];
export const SUPPORT_RESPONSE_TIME = 'within one business day';

/** Public account-deletion request page, hosted by the app. */
export const DELETE_ACCOUNT_HREF = 'https://app.zerbiq.com/delete-account';
