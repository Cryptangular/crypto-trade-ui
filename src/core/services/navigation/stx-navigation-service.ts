import { computed, inject, Injectable } from '@angular/core';
import { AuthService } from '../../../app/pages/auth/services/auth-service';
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from './stx-navigation-config';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  private readonly authService = inject(AuthService);

  readonly navRoutes = computed(() => {
    return this.authService.isAuthenticated() ? [...PUBLIC_ROUTES, ...PRIVATE_ROUTES] : PUBLIC_ROUTES;
  });
}
