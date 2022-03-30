import { checkSingleVendor } from './checksinglevendor';
import { componentName } from './config';
import { CONSENTSTATE, FUNCTIONNAMES } from './state';

import type { IDoWeHaveConsentOptions } from './types';

export function doWeHaveConsent(options: IDoWeHaveConsentOptions, recheck: boolean = false): void {
  const { callback, defaultResponse, previousConsent, consentTo } = options;
  const defaultConsent = defaultResponse ?? false;

  try {
    let consent = false;

    CONSENTSTATE.isReady(() => {
      consent = checkSingleVendor(consentTo);
      if (consent !== previousConsent) {
        callback(consent, recheck);
        options.previousConsent = consent;
      }

      if (!recheck) CONSENTSTATE.list.push({ fn: FUNCTIONNAMES.doWeHaveConsent, options });
    });
  } catch (err) {
    callback(defaultConsent, true);
    window.ebLog({
      component: componentName,
      label: 'doWeHaveConsent',
      level: 'ERROR',
      message: `${err.message}`,
    });
  }
}
