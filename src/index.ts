export { doWeHaveConsent } from './dowehaveconsent';
export { getAllConsents } from './getallconsents';
export { getPurposeText } from './getpurposetext';
export { noConsentGroup } from './getnoconsentgroup';
export { getTCstring } from './gettcfdata';
export { CONSENTNAMES, CONSENTTEXTS } from './state';

import { componentName } from './config';
import { consentCheck } from './consentcheckhandler';
import { CONSENTNAMES, CONSENTSTATE } from './state';

import type { ITCData, TLoadStatus } from './types';

const hasFullIABConsent = (tcData: ITCData): boolean =>
  Object.entries(tcData.purpose.consents).length > 0 && Object.entries(tcData.vendor.consents).length > 0;

export let consentID = '';

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
    consentID = window.Cookiebot && window.Cookiebot.consentID ? window.Cookiebot.consentID : '';
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

export function editConsent() {
  window.Cookiebot.renew();
}

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
