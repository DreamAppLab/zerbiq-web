// ─────────────────────────────────────────────────────────────────────────────
// lib/siteConfig.mjs — site-wide header/footer/CTA settings. Edit here only.
// ─────────────────────────────────────────────────────────────────────────────

/** Existing-user sign-in (header, mobile menu, footer). */
export const SIGN_IN_HREF = 'https://app.zerbiq.com/login';

/**
 * Label of the primary call to action (header, hero and plan buttons).
 * Switch to 'Start free' here when public signup opens.
 */
export const PRIMARY_CTA_LABEL = 'Request Early Access';

/**
 * "Get the app" store links, one per store. An empty string hides that store;
 * the whole "Get the app" footer entry stays hidden until at least one is set.
 */
export const STORE_LINKS = {
  appStore: '',   // e.g. 'https://apps.apple.com/app/...'
  googlePlay: '', // e.g. 'https://play.google.com/store/apps/details?id=...'
};

/** Store entries that have a link, in display order. */
export function activeStoreLinks(links = STORE_LINKS) {
  return [
    { label: 'App Store', href: links.appStore },
    { label: 'Google Play', href: links.googlePlay },
  ].filter((s) => typeof s.href === 'string' && s.href.trim() !== '');
}
