import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { StxButton } from '../../shared/ui/stx-button/stx-button';
import { StxBtnConfig } from '../../shared/ui/stx-button/stx-button.types';
import { APP_ROUTES } from '../../shared/constants/app-routes';

@Component({
  selector: 'stx-not-found-page',
  imports: [NgOptimizedImage, StxButton],
  templateUrl: './stx-not-found-page.html',
  styleUrl: './stx-not-found-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StxNotFoundPage {
  protected readonly toHomePageBtnConfig: StxBtnConfig = {
    appearance: 'tonal',
    label: 'Go to Dashboard',
    href: `/${APP_ROUTES.dashboard}`,
  };
}
