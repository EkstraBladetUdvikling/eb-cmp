import { checkSingleVendor } from './checksinglevendor';
import { CONSENTNAMES, CONSENTSTATE, FUNCTIONNAMES } from './state';

export type TGetAllConsents = { [key in CONSENTNAMES]: boolean };

export function getAllConsents(cb: (TGetAllConsents) => void, recheck: boolean = false): void {
  CONSENTSTATE.isReady(() => {
    const returnObject: TGetAllConsents = {
      [CONSENTNAMES.fullconsent]: checkSingleVendor(CONSENTNAMES.fullconsent),
      [CONSENTNAMES.iab]: checkSingleVendor(CONSENTNAMES.iab),
      [CONSENTNAMES.marketing]: checkSingleVendor(CONSENTNAMES.marketing),
      [CONSENTNAMES.preferences]: checkSingleVendor(CONSENTNAMES.preferences),
      [CONSENTNAMES.statistics]: checkSingleVendor(CONSENTNAMES.statistics),
    };

    cb(returnObject);

    if (!recheck) CONSENTSTATE.list.push({ fn: FUNCTIONNAMES.getAllConsents, options: cb });
  });
}
