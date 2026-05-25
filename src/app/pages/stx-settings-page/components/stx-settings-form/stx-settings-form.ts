import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { StxInput } from '../../../../shared/ui/stx-input/stx-input';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { StxButton } from '../../../../shared/ui/stx-button/stx-button';

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
export class StxSettingsForm {
  private readonly fb = inject(NonNullableFormBuilder);

  protected readonly settingsForm = this.fb.group({
    'api-key': ['', [Validators.required, Validators.minLength(5)]],
    'security-key': ['', [Validators.required, Validators.minLength(5)]],
  });

  reset(): void {
    this.settingsForm.reset();
    this.settingsForm.markAsPristine();
    this.settingsForm.markAsUntouched();
  }

  onSubmit(): void {
    if (this.settingsForm.valid) {
      console.log('Данные формы:', this.settingsForm.getRawValue());
      this.reset();
    } else {
      this.settingsForm.markAllAsTouched();
    }
  }
}
