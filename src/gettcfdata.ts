import type { ITCData } from './types';

export function getTCstring(): void {
  window.__tcfapi('getTCData', 2, (tcData: ITCData) => {
    return tcData.tcString;
  });
}
