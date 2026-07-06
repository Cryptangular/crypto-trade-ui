import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'stx-loading-overlay',
  imports: [],
  templateUrl: './stx-loading-overlay.html',
  styleUrl: './stx-loading-overlay.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StxLoadingOverlay {}
