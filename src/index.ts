export { doWeHaveConsent } from './dowehaveconsent';
export { getAllConsents } from './getallconsents';
export { getPurposeText } from './getpurposetext';
export { noConsentGroup } from './getnoconsentgroup';
export { CONSENTNAMES, CONSENTTEXTS } from './state';

import { componentName } from './config';
import { consentCheck } from './consentcheckhandler';
import { CONSENTNAMES, CONSENTSTATE } from './state';

import type { ITCData, TLoadStatus } from './types';

const hasFullIABConsent = (tcData: ITCData): boolean =>
  Object.entries(tcData.purpose.consents).length > 0 && Object.entries(tcData.vendor.consents).length > 0;

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
      component: componentName,
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
      component: componentName,
      label: 'CookiebotLoad',
      level: 'ERROR',
      message: 'Cookiebot load error',
    });
  }
});
