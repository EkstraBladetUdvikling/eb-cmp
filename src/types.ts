import type { getPurposeText } from 'getpurposetext';
import type { CONSENTNAMES, CONSENTTEXTS } from './state';

export type RGetPurposeText = ReturnType<typeof getPurposeText>;

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
  doWeHaveConsent: (options: IDoWeHaveConsentOptions, recheck?: boolean) => void;
  getAllConsents: (cb: (status: TGetAllConsents) => void, recheck?: boolean) => void;
  noConsentGroup: () => boolean;
  loadStatus: TLoadStatus;
  CONSENTNAMES: { [key in TConsentNameKeys]: CONSENTNAMES };
  CONSENTTEXTS: { [key in TConsentTextKeys]: CONSENTTEXTS };
}

export type TGetAllConsents = { [key in CONSENTNAMES]: boolean };
export type TGetAllConsentsOptions = (allConsents: TGetAllConsents) => void;

export interface ICustomCMP {
  fullConsent?: boolean;
  googleHasConsent?: boolean;
  loadStatus: string;
  noConsent?: boolean;
}
