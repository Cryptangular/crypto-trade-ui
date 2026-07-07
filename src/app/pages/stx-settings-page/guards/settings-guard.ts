import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { StxSettingsService } from '../services/stx-settings.service';
import { APP_ROUTES } from '../../../shared/constants/app-routes';

export const settingsGuard: CanActivateFn = (_route, _state) => {
  const settingsService = inject(StxSettingsService);
  const router = inject(Router);

  if (settingsService.isConnected()) return true;

  return router.createUrlTree([APP_ROUTES.settings]);
};
