// The setup code digits typed on /lawn, shared by the code field and every
// sign-up link on the page. Kept in memory only: never saved to the browser,
// sent anywhere or logged. Only client components import this.

let digits = '';
const listeners = new Set();

export function getSetupDigits() {
  return digits;
}

/** The server render has no code, so every link starts without ?setup=. */
export function getServerSetupDigits() {
  return '';
}

export function setSetupDigits(next) {
  if (next === digits) return;
  digits = next;
  for (const listener of listeners) listener();
}

export function subscribeSetupDigits(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}
