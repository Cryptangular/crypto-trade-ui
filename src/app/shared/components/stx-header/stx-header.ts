import { ChangeDetectionStrategy, Component, computed, inject, Signal } from '@angular/core';
import { StxButton } from '../../ui/stx-button/stx-button';
import { StxBtnConfig } from '../../ui/stx-button/stx-button.types';
import { RouterLink } from '@angular/router';
import { StxSearchBar } from '../stx-search-bar/stx-search-bar';
import { StxConnectionStatus } from '../stx-connection-status/stx-connection-status';
import { NgOptimizedImage } from '@angular/common';
import { AuthService } from '../../../pages/auth/services/auth-service';
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from './constants/stx-navigation-constants';

@Component({
  selector: 'stx-header',
  imports: [StxButton, StxSearchBar, StxConnectionStatus, RouterLink, NgOptimizedImage],
  templateUrl: './stx-header.html',
  styleUrl: './stx-header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StxHeader {
  private readonly authService = inject(AuthService);
  readonly isOnline = this.authService.isAuthenticated;

  readonly navRoutes = computed(() =>
    this.authService.isAuthenticated() ? [...PUBLIC_ROUTES, ...PRIVATE_ROUTES] : PUBLIC_ROUTES
  );

  readonly navButtonConfigs: Signal<StxBtnConfig[]> = computed(() =>
    this.navRoutes().map(route => ({ appearance: 'text', label: route.label, href: route.route }))
  );

  readonly settingBtnConfig: StxBtnConfig = {
    appearance: 'icon',
    icon: 'settings',
  };

  onChange(query: string): void {
    console.log(query);
  }
}
