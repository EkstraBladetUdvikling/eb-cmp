import { TGetAllConsents } from './getallconsents';
import { CONSENTNAMES, CONSENTTEXTS } from './state';

export type TLoadStatus = 'error' | 'loaded' | 'unset';
export type TConsentTo =
  | 'fullconsent'
  | 'iab'
  | 'marketing'
  | 'preferences'
  | 'statistics';

export interface IDoWeHaveConsentOptions {
  callback: (status: boolean, state: boolean | 'error') => void;
  consentTo: TConsentTo;
  defaultResponse?: boolean;
  previousConsent?: boolean;
}

type TCONSENTTEXTS = keyof typeof CONSENTTEXTS;

export interface IEBCMP {
  doWeHaveConsent: (
    options: IDoWeHaveConsentOptions,
    recheck?: boolean
  ) => void;
  getAllConsents: (
    cb: (status: TGetAllConsents) => void,
    recheck?: boolean
  ) => void;
  noConsentGroup: () => boolean;
  loadStatus: TLoadStatus;
  CONSENTNAMES: { [key in CONSENTNAMES] };
  CONSENTTEXTS: { [key in TCONSENTTEXTS]: CONSENTTEXTS };
}

interface IConsents {
  consents: {
    [id: number]: boolean;
  };
}

export interface ITCData {
  cmpStatus?: TLoadStatus;
  purpose: IConsents;
  vendor: IConsents;
}
