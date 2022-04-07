import type { doWeHaveConsent } from './dowehaveconsent';
import type { getAllConsents } from './getallconsents';
import type { getPurposeText } from './getpurposetext';
import type { noConsentGroup } from './getnoconsentgroup';
import type { CONSENTNAMES, CONSENTTEXTS } from './state';

interface IConsents {
  consents: {
    [id: number]: boolean;
  };
}

export type TLoadStatus = 'error' | 'loaded' | 'unset';

export interface ITCData {
  cmpStatus?: TLoadStatus;
  purpose: IConsents;
  vendor: IConsents;
}

interface ICookieBotConsent {
  stamp: string;
  necessary: boolean;
  preferences: boolean;
  statistics: boolean;
  marketing: boolean;
}

export interface ICookieBot {
  consentID?: string;
  consent?: ICookieBotConsent;
  renew: () => void;
}

export type ITCFAPI = (fnName: string, version: number, callback: (tcData: ITCData) => void) => void;

export type TConsentNameKeys = keyof typeof CONSENTNAMES;
export type TConsentTextKeys = keyof typeof CONSENTTEXTS;

export interface IDoWeHaveConsentOptions {
  callback: (status: boolean, state: boolean | 'error') => void;
  consentTo: TConsentNameKeys;
  defaultResponse?: boolean;
  previousConsent?: boolean;
}

export interface IEBCMP {
  doWeHaveConsent: typeof doWeHaveConsent;
  getAllConsents: typeof getAllConsents;
  getPurposeText: typeof getPurposeText;
  noConsentGroup: typeof noConsentGroup;
  loadStatus: TLoadStatus;
  CONSENTNAMES: { [key in TConsentNameKeys]: TConsentNameKeys };
  CONSENTTEXTS: { [key in TConsentTextKeys]: TConsentTextKeys };
}

export type TGetAllConsents = { [key in CONSENTNAMES]: boolean };
export type TGetAllConsentsOptions = (allConsents: TGetAllConsents) => void;

export interface ICustomCMP {
  fullConsent?: boolean;
  googleHasConsent?: boolean;
  loadStatus: string;
  noConsent?: boolean;
}
