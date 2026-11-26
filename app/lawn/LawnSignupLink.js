'use client';

import { useSyncExternalStore } from 'react';
import { lawnSignupHref } from '@/lib/siteConfig.mjs';
import { lawnSetupCode } from '@/lib/lawnSetupCode.mjs';
import { getServerSetupDigits, getSetupDigits, subscribeSetupDigits } from './setupCodeStore';

/** A sign-up link for one plan that carries the setup code once all 6 digits are typed. */
export default function LawnSignupLink({ plan = 'solo', className, children, ...rest }) {
  const digits = useSyncExternalStore(subscribeSetupDigits, getSetupDigits, getServerSetupDigits);
  return (
    <a href={lawnSignupHref(lawnSetupCode(digits), plan)} className={className} {...rest}>
      {children}
    </a>
  );
}
