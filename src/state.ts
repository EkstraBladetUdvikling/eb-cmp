export enum FUNCTIONNAMES {
  doWeHaveConsent,
  getAllConsents,
}

export enum CONSENTNAMES {
  fullconsent = 'fullconsent',
  iab = 'iab',
  marketing = 'marketing',
  preferences = 'preferences',
  statistics = 'statistics',
}

export enum CONSENTTEXTS {
  fullconsent = 'Tillad alle',
  iab = 'Tillad alle',
  marketing = 'Marketing',
  preferences = 'Præferencer',
  statistics = 'Statistik',
}

let hasFullIABConsent: boolean = false;
let ready: boolean = false;

const STATE = {
  ready: false,
  waitlist: [],
};

function setupDone(): void {
  STATE.ready = true;

  handleWaiting();
}

function handleWaiting() {
  STATE.waitlist.forEach((cb) => {
    cb();
  });
}

function isReady(callback: () => void): void {
  if (STATE.ready) {
    callback();
  } else {
    STATE.waitlist.push(callback);
  }
}

export const CONSENTSTATE = {
  set hasFullIABConsent(input: boolean) {
    hasFullIABConsent = input;
  },
  get hasFullIABConsent(): boolean {
    return hasFullIABConsent;
  },
  isReady,
  list: [],
  set ready(readyState: boolean) {
    ready = readyState;
  },
  get ready(): boolean {
    return ready;
  },
  setupDone,
};
