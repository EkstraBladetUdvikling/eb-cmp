import { consentCheck } from './consentcheckhandler';
import { CONSENTNAMES, CONSENTSTATE } from './state';

import type { ITCData, TLoadStatus } from './types';

export { doWeHaveConsent } from './dowehaveconsent';
export { getAllConsents } from './getallconsents';
export { CONSENTNAMES, CONSENTTEXTS } from './state';

const hasFullIABConsent = (tcData: ITCData): boolean =>
  Object.entries(tcData.purpose.consents).length > 0 && Object.entries(tcData.vendor.consents).length > 0;

export const noConsentGroup = (): boolean => !CONSENTSTATE.hasFullIABConsent;

window.addEventListener('CookiebotOnConsentReady', () => {
  try {
    if (window.Cookiebot.consent[CONSENTNAMES.marketing]) {
      window.__tcfapi('getTCData', 2, (tcData: ITCData) => {
        CONSENTSTATE.hasFullIABConsent = hasFullIABConsent(tcData);
        CONSENTSTATE.setupDone();
      });
    } else {
      CONSENTSTATE.hasFullIABConsent = false;
      CONSENTSTATE.setupDone();
    }

    consentCheck(true);
  } catch (err) {
    CONSENTSTATE.hasFullIABConsent = false;
    CONSENTSTATE.setupDone();
    window.ebLog({
      component: 'jppolCMP',
      label: 'CookiebotOnConsentReady',
      level: 'ERROR',
      message: `${err.message}`,
    });
  }
});

export let loadStatus: TLoadStatus = 'unset';

window.addEventListener('load', () => {
  loadStatus = window.Cookiebot.consent ? 'loaded' : 'error';

  // Health check
  if (loadStatus === 'error') {
    window.ebLog({
      component: 'jppolCMP',
      level: 'ERROR',
      message: 'Cookiebot load error',
    });
  }
});
