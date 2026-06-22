import { InjectionToken } from '@angular/core';
import { MaterialIcons } from 'material-design-icons-literal-types';

export type StxToasterConfig = {
  closeAllLabel: string;
  closeAllIcon: MaterialIcons;
  closeIcon: MaterialIcons;
  scrollBehavior: 'smooth' | 'instant';
};

export const STX_TOASTER_CONFIG = new InjectionToken<StxToasterConfig>('stx-toaster.config', {
  factory: (): StxToasterConfig => ({
    closeAllLabel: 'close all',
    closeAllIcon: 'close',
    closeIcon: 'close',
    scrollBehavior: 'smooth',
  }),
});
