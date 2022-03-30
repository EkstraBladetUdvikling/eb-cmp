export { doWeHaveConsent } from './dowehaveconsent';
export { getAllConsents } from './getallconsents';
export { CONSENTNAMES, CONSENTTEXTS } from './state';
import type { TLoadStatus } from './types';
export declare const noConsentGroup: () => boolean;
export declare let loadStatus: TLoadStatus;
