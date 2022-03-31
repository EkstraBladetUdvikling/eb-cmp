import type { CONSENTNAMES, CONSENTTEXTS } from './state';
interface IConsents {
    consents: {
        [id: number]: boolean;
    };
}
export declare type TLoadStatus = 'error' | 'loaded' | 'unset';
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
export declare type ITCFAPI = (fnName: string, version: number, callback: (tcData: ITCData) => void) => void;
export declare type TConsentTo = 'fullconsent' | 'iab' | 'marketing' | 'preferences' | 'statistics';
export interface IDoWeHaveConsentOptions {
    callback: (status: boolean, state: boolean | 'error') => void;
    consentTo: TConsentTo;
    defaultResponse?: boolean;
    previousConsent?: boolean;
}
declare type TCONSENTNAMES = keyof typeof CONSENTNAMES;
declare type TCONSENTTEXTS = keyof typeof CONSENTTEXTS;
export interface IEBCMP {
    doWeHaveConsent: (options: IDoWeHaveConsentOptions, recheck?: boolean) => void;
    getAllConsents: (cb: (status: TGetAllConsents) => void, recheck?: boolean) => void;
    noConsentGroup: () => boolean;
    loadStatus: TLoadStatus;
    CONSENTNAMES: {
        [key in TCONSENTNAMES]: CONSENTNAMES;
    };
    CONSENTTEXTS: {
        [key in TCONSENTTEXTS]: CONSENTTEXTS;
    };
}
export declare type TGetAllConsents = {
    [key in CONSENTNAMES]: boolean;
};
export declare type TGetAllConsentsOptions = (allConsents: TGetAllConsents) => void;
export interface ICustomCMP {
    fullConsent?: boolean;
    googleHasConsent?: boolean;
    loadStatus: string;
    noConsent?: boolean;
}
export {};
