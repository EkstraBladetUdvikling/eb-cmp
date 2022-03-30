import { doWeHaveConsent } from './dowehaveconsent';
import { getAllConsents } from './getallconsents';
import { CONSENTSTATE, FUNCTIONNAMES } from './state';

import type { IDoWeHaveConsentOptions, TGetAllConsentsOptions } from './types';

interface IListItem {
  fn: FUNCTIONNAMES;
  options: IDoWeHaveConsentOptions | TGetAllConsentsOptions;
}

export function consentCheck(recheck: boolean = false): void {
  const list = CONSENTSTATE.list;

  list.forEach((listItem: IListItem) => {
    const { fn, options } = listItem;
    switch (fn) {
      case FUNCTIONNAMES.doWeHaveConsent:
        doWeHaveConsent(options as IDoWeHaveConsentOptions, recheck);
        break;
      case FUNCTIONNAMES.getAllConsents:
        getAllConsents(options as TGetAllConsentsOptions, recheck);
        break;
    }
  });
}
