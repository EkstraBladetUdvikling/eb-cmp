import { CONSENTSTATE } from './state';

export const noConsentGroup = (): boolean => !CONSENTSTATE.hasFullIABConsent;
