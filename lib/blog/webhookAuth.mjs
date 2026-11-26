// Signature check for the MassBlogger webhook (/api/receive-post). The signing
// scheme is unchanged: "sha256=" + hex HMAC-SHA256 of the raw request body, keyed by
// MASSBLOGGER_WEBHOOK_SECRET, sent in the x-massblogger-signature header.
// Fails closed: with the secret unset nothing is accepted (the route answers 503).
import { createHmac } from 'node:crypto';
import { safeEqual } from './cronAuth.mjs';

export function isWebhookSecretConfigured(secret) {
  return typeof secret === 'string' && secret.length > 0;
}

export function expectedSignature(payload, secret) {
  return `sha256=${createHmac('sha256', secret).update(payload).digest('hex')}`;
}

export function verifyWebhookSignature(payload, signatureHeader, secret) {
  if (!isWebhookSecretConfigured(secret)) return false;
  if (typeof payload !== 'string') return false;
  return safeEqual(signatureHeader ?? '', expectedSignature(payload, secret));
}
