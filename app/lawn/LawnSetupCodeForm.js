'use client';

import { useRef, useState, useSyncExternalStore } from 'react';
import { lawnSignupHref } from '@/lib/siteConfig.mjs';
import { LAWN_CODE_DIGITS, LAWN_CODE_PREFIX, lawnCodeDigits, lawnCodeStatus, lawnSetupCode } from '@/lib/lawnSetupCode.mjs';
import { getServerSetupDigits, getSetupDigits, setSetupDigits, subscribeSetupDigits } from './setupCodeStore';

/**
 * "Have a setup code?" field and the main Start free trial button.
 * The code is optional. Only its format is checked here (6 digits); the app
 * decides whether a code is valid. Nothing is saved or logged.
 */
export default function LawnSetupCodeForm() {
  const digits = useSyncExternalStore(subscribeSetupDigits, getSetupDigits, getServerSetupDigits);
  const [showFormatHelp, setShowFormatHelp] = useState(false);
  const inputRef = useRef(null);
  const status = lawnCodeStatus(digits);

  function onChange(e) {
    setSetupDigits(lawnCodeDigits(e.target.value));
    setShowFormatHelp(false);
  }

  function onStart(e) {
    if (status === 'partial') {
      e.preventDefault();
      setShowFormatHelp(true);
      inputRef.current?.focus();
    }
  }

  const formatHelp = showFormatHelp && status === 'partial';

  return (
    <div className="lawn-code">
      <label htmlFor="lawn-setup-code" className="lawn-code-label">
        Have a setup code?
      </label>
      <div className="lawn-code-row">
        <div className="lawn-code-field">
          <span className="lawn-code-prefix" aria-hidden="true">
            {LAWN_CODE_PREFIX}
          </span>
          <input
            ref={inputRef}
            id="lawn-setup-code"
            name="setup"
            type="text"
            inputMode="numeric"
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
            placeholder="123456"
            value={digits}
            onChange={onChange}
            aria-describedby="lawn-setup-code-hint"
            aria-invalid={formatHelp ? 'true' : undefined}
            className="lawn-code-input"
          />
        </div>
        <a href={lawnSignupHref(lawnSetupCode(digits), 'solo')} onClick={onStart} className="lawn-btn lawn-btn-lime">
          Start free trial
        </a>
      </div>
      <p id="lawn-setup-code-hint" className="lawn-code-hint" aria-live="polite">
        {formatHelp
          ? `Setup codes have ${LAWN_CODE_DIGITS} digits after ${LAWN_CODE_PREFIX}. Check the number, or clear it to start without a code.`
          : `Optional. Type the ${LAWN_CODE_DIGITS} digits after ${LAWN_CODE_PREFIX} from your flyer. We check it when you sign up.`}
      </p>
    </div>
  );
}
