import type { CONSENTNAMES, CONSENTTEXTS } from 'state';

interface IConsents {
  consents: {
    [id: number]: boolean;
  };
}

export type TLoadStatus = 'error' | 'loaded' | 'unset';

interface ITCData {
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

export type TConsentTo = 'fullconsent' | 'iab' | 'marketing' | 'preferences' | 'statistics';

export interface IDoWeHaveConsentOptions {
  callback: (status: boolean, state: boolean | 'error') => void;
  consentTo: TConsentTo;
  defaultResponse?: boolean;
  previousConsent?: boolean;
}

type TCONSENTTEXTS = keyof typeof CONSENTTEXTS;

export interface IEBCMP {
  doWeHaveConsent: (options: IDoWeHaveConsentOptions, recheck?: boolean) => void;
  getAllConsents: (cb: (status: TGetAllConsents) => void, recheck?: boolean) => void;
  noConsentGroup: () => boolean;
  loadStatus: TLoadStatus;
  CONSENTNAMES: { [key in CONSENTNAMES] };
  CONSENTTEXTS: { [key in TCONSENTTEXTS]: CONSENTTEXTS };
}

export type TGetAllConsents = { [key in CONSENTNAMES]: boolean };
export type TGetAllConsentsOptions = (allConsents: TGetAllConsents) => void;

export interface ICustomCMP {
  fullConsent?: boolean;
  googleHasConsent?: boolean;
  loadStatus: string;
  noConsent?: boolean;
}
