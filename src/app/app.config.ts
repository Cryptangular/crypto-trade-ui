import { ApplicationConfig, inject, provideAppInitializer, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { AuthService } from './pages/auth/services/auth-service';
import { firstValueFrom } from 'rxjs';
import { StxSettingsService } from './pages/stx-settings-page/services/stx-settings.service';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { loadingInterceptor } from '../core/interceptors/loading.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAppInitializer(async () => {
      const authService = inject(AuthService);
      const settingsService = inject(StxSettingsService);

      await firstValueFrom(settingsService.getConnectionStatus());
      await firstValueFrom(authService.checkAuth());
    }),
    provideHttpClient(withInterceptors([loadingInterceptor])),
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
  ],
};
