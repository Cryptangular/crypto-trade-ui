import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { StxButton } from '../../shared/ui/stx-button/stx-button';
import { StxBtnConfig } from '../../shared/ui/stx-button/stx-button.types';

@Component({
  selector: 'stx-not-found',
  imports: [NgOptimizedImage, StxButton],
  templateUrl: './stx-not-found.html',
  styleUrl: './stx-not-found.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StxNotFound {
  protected readonly toHomePageBtnConfig: StxBtnConfig = {
    appearance: 'tonal',
    label: 'Go to Homepage',
    href: '/',
  };
}
