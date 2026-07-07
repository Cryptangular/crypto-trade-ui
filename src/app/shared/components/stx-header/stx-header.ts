import { ChangeDetectionStrategy, Component, computed, inject, signal, Signal } from '@angular/core';
import { StxButton } from '../../ui/stx-button/stx-button';
import { StxBtnConfig } from '../../ui/stx-button/stx-button.types';
import { Router, RouterLink } from '@angular/router';
import { StxSearchBar } from '../stx-search-bar/stx-search-bar';
import { StxConnectionStatus } from '../stx-connection-status/stx-connection-status';
import { NgOptimizedImage } from '@angular/common';
import { AuthService } from '../../../pages/auth/services/auth-service';
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from './constants/stx-navigation-constants';
import { APP_ROUTES } from '../../constants/app-routes';
import { StxSettingsService } from '../../../pages/stx-settings-page/services/stx-settings.service';
import { catchError, EMPTY, finalize } from 'rxjs';
import { ToastService } from '../../../../core/services/toast/toast-service';

@Component({
  selector: 'stx-header',
  imports: [StxButton, StxSearchBar, StxConnectionStatus, RouterLink, NgOptimizedImage],
  templateUrl: './stx-header.html',
  styleUrl: './stx-header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StxHeader {
  private readonly router = inject(Router);
  private readonly toastService = inject(ToastService);

  private readonly authService = inject(AuthService);
  readonly isAuthenticated = this.authService.isAuthenticated;

  private readonly settingsService = inject(StxSettingsService);
  readonly isConnected = this.settingsService.isConnected;

  protected readonly isLoading = signal<boolean>(false);

  readonly navRoutes = computed(() => (this.isAuthenticated() ? [...PUBLIC_ROUTES, ...PRIVATE_ROUTES] : PUBLIC_ROUTES));

  readonly navButtonConfigs: Signal<StxBtnConfig[]> = computed(() =>
    this.navRoutes().map(route => ({ appearance: 'text', label: route.label, href: route.route }))
  );

  readonly settingBtnConfig: StxBtnConfig = {
    appearance: 'icon',
    icon: 'settings',
  };

  readonly logoutBtnConfig: StxBtnConfig = {
    appearance: 'icon',
    icon: 'logout',
  };

  protected logout(): void {
    if (this.isLoading()) return;

    this.isLoading.set(true);

    this.authService
      .signOut()
      .pipe(
        catchError((error: Error) => {
          this.toastService.danger('error occurred', error.message);
          return EMPTY;
        }),
        finalize(() => this.isLoading.set(false))
      )
      .subscribe({
        next: () => void this.router.navigate(['/login']),
      });
  }

  protected toSettings(): void {
    void this.router.navigate([APP_ROUTES.settings]);
  }

  onChange(query: string): void {
    console.log(query);
  }
}
