import { CONSENTNAMES, CONSENTSTATE } from './state';

/**
 * checkSingleVendor
 *
 * @description This function should only be called inside an isReady check
 *
 * @param consentTo {string}
 * @returns {boolean}
 */
export function checkSingleVendor(consentTo: string): boolean {
  const { consent: cookiebotConsent } = window.Cookiebot;
  switch (consentTo) {
    case CONSENTNAMES.fullconsent:
      return cookiebotConsent.marketing && cookiebotConsent.preferences && cookiebotConsent.statistics;
    case CONSENTNAMES.iab:
      return CONSENTSTATE.hasFullIABConsent;
    case CONSENTNAMES.marketing:
      return cookiebotConsent.marketing;
    case CONSENTNAMES.preferences:
      return cookiebotConsent.preferences;
    case CONSENTNAMES.statistics:
      return cookiebotConsent.statistics;
    default:
      return false;
  }
}
