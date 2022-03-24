import { ITCData, IEBCMP } from 'types';

interface ICookieBotConsent {
  stamp: string;
  necessary: boolean;
  preferences: boolean;
  statistics: boolean;
  marketing: boolean;
}

interface ICookieBot {
  consent?: ICookieBotConsent;
  renew: () => void;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface Window {
    __tcfapi: (
      fnName: string,
      version: number,
      callback: (tcData: ITCData) => void
    ) => void;
    Cookiebot: ICookieBot;
    customCMP: {
      fullConsent?: boolean;
      googleHasConsent?: boolean;
      loadStatus: string;
      noConsent?: boolean;
    };
    ebCMP: IEBCMP;
    ebLog: (msgObj) => void;
  }
}
