import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';
import { LoadingOverlayService } from '../services/stx-loading-overlay/loading-overlay.service';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingOverlayService);

  const DEBOUNCE_TIME = 300;
  const MIN_SHOW_TIME = 300;

  let isLoaderShown = false;
  let showStartTime: number | null = null;

  const debounceTimer = setTimeout(() => {
    loadingService.show();
    isLoaderShown = true;
    showStartTime = Date.now();
  }, DEBOUNCE_TIME);

  return next(req).pipe(
    finalize(() => {
      clearTimeout(debounceTimer);

      if (isLoaderShown && showStartTime) {
        const elapsed = Date.now() - showStartTime;
        const remainingTime = Math.max(0, MIN_SHOW_TIME - elapsed);

        if (remainingTime > 0) {
          setTimeout(() => {
            loadingService.hide();
          }, remainingTime);
        } else {
          loadingService.hide();
        }
      }
    })
  );
};
