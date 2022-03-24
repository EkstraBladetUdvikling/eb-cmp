import { doWeHaveConsent } from './dowehaveconsent';
import { getAllConsents } from './getallconsents';
import { CONSENTSTATE, FUNCTIONNAMES } from './state';

export function consentCheck(recheck: boolean = false): void {
  const list = CONSENTSTATE.list;

  list.forEach((listItem) => {
    const { fn, options } = listItem;
    switch (fn) {
      case FUNCTIONNAMES.doWeHaveConsent:
        doWeHaveConsent(options, recheck);
        break;
      case FUNCTIONNAMES.getAllConsents:
        getAllConsents(options, recheck);
        break;
    }
  });
}
