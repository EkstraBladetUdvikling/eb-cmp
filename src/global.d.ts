import type { ICookieBot, ICustomCMP, ITCFAPI } from './types';

interface IebLog {
  component: string;
  label?: string;
  level: string;
  message: string;
}

declare global {
  interface Window {
    __tcfapi: ITCFAPI;
    Cookiebot: ICookieBot;
    customCMP: ICustomCMP;
    ebLog: (msgObj: IebLog) => void;
  }
}
