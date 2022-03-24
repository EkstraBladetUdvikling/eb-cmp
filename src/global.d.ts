import type { ICookieBot, ICustomCMP, IEBCMP, ITCFAPI } from 'types';

interface IebLog {
  component: string;
  label?: string;
  level: string;
  message: string;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface Window {
    __tcfapi: ITCFAPI;
    Cookiebot: ICookieBot;
    customCMP: ICustomCMP;
    ebCMP: IEBCMP;
    ebLog: (msgObj: IebLog) => void;
  }
}
