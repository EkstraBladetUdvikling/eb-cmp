export { doWeHaveConsent } from './dowehaveconsent';
export { getAllConsents } from './getallconsents';
export { getPurposeText } from './getpurposetext';
export { noConsentGroup } from './getnoconsentgroup';
export { CONSENTNAMES, CONSENTTEXTS } from './state';
import type { TLoadStatus } from './types';
export declare let consentID: string;
export declare const editConsent: () => void;
export declare let loadStatus: TLoadStatus;
