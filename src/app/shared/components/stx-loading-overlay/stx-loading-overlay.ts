import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LoadingOverlayService } from '../../../../core/services/stx-loading-overlay/loading-overlay.service';

@Component({
  selector: 'stx-loading-overlay',
  templateUrl: './stx-loading-overlay.html',
  styleUrl: './stx-loading-overlay.scss',
  host: {
    '[hidden]': '!loadingService.loading()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StxLoadingOverlay {
  protected readonly loadingService = inject(LoadingOverlayService);
}
