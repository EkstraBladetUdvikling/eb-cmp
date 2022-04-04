import type { TConsentTextKeys } from './types';
import { CONSENTNAMES, CONSENTTEXTS } from './state';

export function getPurposeText(consentTo: TConsentTextKeys): CONSENTTEXTS {
  switch (consentTo) {
    case CONSENTNAMES.fullconsent:
    case CONSENTNAMES.iab:
      return CONSENTTEXTS.fullconsent;
    case CONSENTNAMES.marketing:
      return CONSENTTEXTS.marketing;
    case CONSENTNAMES.preferences:
      return CONSENTTEXTS.preferences;
    case CONSENTNAMES.statistics:
      return CONSENTTEXTS.statistics;
    default:
      return CONSENTTEXTS.fullconsent;
  }
}
