import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StxToaster } from './shared/ui/stx-toaster/stx-toaster';
import { StxHeader } from './shared/components/stx-header/stx-header';
import { StxFooter } from './shared/components/stx-footer/stx-footer';
import { StxLoadingOverlay } from './shared/components/stx-loading-overlay/stx-loading-overlay';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  selector: 'app-root',
  imports: [RouterOutlet, StxToaster, StxHeader, StxFooter, StxLoadingOverlay],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('crypto-trade-ui');
}
