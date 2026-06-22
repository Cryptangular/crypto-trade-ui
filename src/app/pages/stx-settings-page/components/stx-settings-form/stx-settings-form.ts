import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { StxInput } from '../../../../shared/ui/stx-input/stx-input';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { StxButton } from '../../../../shared/ui/stx-button/stx-button';
import { ToastService } from '../../../../../core/services/toast/toast-service';
import { StxSettingsService } from '../../services/stx-settings.service';
import { StxBtnConfig } from '../../../../shared/ui/stx-button/stx-button.types';
import { finalize, Observable } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SETTINGS_ERROR_MESSAGES, SETTINGS_MESSAGES } from '../../constants/settings.constants';
import { SettingsResponse } from '../../types/settings';

@Component({
  selector: 'stx-settings-form',
  imports: [
    StxInput,
    ReactiveFormsModule,
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    MatCardActions,
    StxButton,
  ],
  templateUrl: './stx-settings-form.html',
  styleUrl: './stx-settings-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StxSettingsForm implements OnInit {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly destroyRef = inject(DestroyRef);
  private readonly toastService = inject(ToastService);
  private readonly settingsService = inject(StxSettingsService);

  protected readonly hasSecret = signal<boolean>(false);
  protected readonly isLoading = signal<boolean>(false);
  protected readonly title = 'Settings';

  protected readonly setSettingsBtnConfig: StxBtnConfig = { appearance: 'tonal', icon: 'send', label: 'send' };
  protected readonly removeSettingsBtnConfig: StxBtnConfig = {
    appearance: 'outlined',
    icon: 'delete',
    label: 'delete',
  };

  protected readonly settingsForm = this.fb.group({
    apiKey: ['', [Validators.required, Validators.minLength(10)]],
    secretKey: ['', [Validators.required, Validators.minLength(10)]],
  });

  reset(): void {
    this.settingsForm.patchValue({ secretKey: '' });
    this.settingsForm.markAsUntouched();
    this.settingsForm.markAsPristine();
  }

  private handleRequest<T extends SettingsResponse<unknown>>(
    request$: Observable<T>,
    successCb: (code: string) => void
  ): void {
    this.isLoading.set(true);

    request$
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => this.isLoading.set(false))
      )
      .subscribe({
        next: response => {
          successCb(response.code);
        },
        error: (error: unknown) => {
          this.toastService.warning('Error', this.getErrorMessage(error));
        },
      });
  }

  removeSettings(): void {
    this.handleRequest(this.settingsService.removeSettings(), code => {
      const message = SETTINGS_MESSAGES[code as keyof typeof SETTINGS_MESSAGES] || 'Action completed';
      this.toastService.info(this.title, message);
      this.hasSecret.set(false);
      this.settingsForm.reset();
    });
  }

  onSubmit(): void {
    if (this.settingsForm.invalid || this.isLoading()) {
      return;
    }

    this.handleRequest(
      this.settingsService.setSettings(this.settingsForm.getRawValue()),

      code => {
        const message = SETTINGS_MESSAGES[code as keyof typeof SETTINGS_MESSAGES] || 'Action completed';
        this.toastService.info(this.title, message);
        this.hasSecret.set(true);
        this.reset();
      }
    );
  }

  private getErrorMessage(error: unknown): string {
    if (error && typeof error === 'object' && 'error' in error) {
      const backendError = (error as { error: { code?: string } }).error;

      if (backendError?.code && backendError.code in SETTINGS_ERROR_MESSAGES) {
        return SETTINGS_ERROR_MESSAGES[backendError.code as keyof typeof SETTINGS_ERROR_MESSAGES];
      }
    }

    return SETTINGS_MESSAGES.SOMETHING_WENT_WRONG;
  }

  ngOnInit(): void {
    this.settingsService
      .getSettings()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(response => {
        if (!response.data) return;

        const { apiKey, hasSecret } = response.data;
        this.hasSecret.set(hasSecret);
        if (!apiKey) return;

        this.settingsForm.setValue({ apiKey, secretKey: '' });
      });
  }
}
