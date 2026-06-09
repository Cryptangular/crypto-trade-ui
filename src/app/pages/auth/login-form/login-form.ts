import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, EMPTY, finalize } from 'rxjs';

import { StxInput } from '../../../shared/ui/stx-input/stx-input';
import { StxButton } from '../../../shared/ui/stx-button/stx-button';
import { StxBtnConfig } from '../../../shared/ui/stx-button/stx-button.types';
import { PasswordValidators } from '../validators/password.validators';
import { EMAIL_VALIDATION_MESSAGES, PASSWORD_VALIDATION_MESSAGES } from '../constants/errors.constants';
import { ToastService } from '../../../../core/services/toast/toast-service';
import { AuthService } from '../services/auth-service';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'stx-login-form',
  imports: [ReactiveFormsModule, StxInput, StxButton, MatCardModule],
  templateUrl: './login-form.html',
  styleUrl: './login-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginForm {
  private readonly fb = inject(FormBuilder);
  private readonly toastService = inject(ToastService);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  protected readonly isLoading = signal(false);
  protected readonly emailErrors = EMAIL_VALIDATION_MESSAGES;
  protected readonly passwordErrors = PASSWORD_VALIDATION_MESSAGES;

  protected readonly loginForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, PasswordValidators.passwordStrength()]],
  });

  protected readonly submitBtnConfig = signal<StxBtnConfig>({
    label: 'Log in',
    appearance: 'tonal',
  });

  protected readonly registerLinkConfig: StxBtnConfig = {
    label: `Don't have an account? Sign Up`,
    appearance: 'text',
    href: '/register',
  };

  protected onSubmit(): void {
    if (this.isLoading()) return;

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);

    const { email, password } = this.loginForm.getRawValue();

    this.authService
      .login({ email, password })
      .pipe(
        finalize(() => this.isLoading.set(false)),
        catchError((err: Error) => {
          this.onSubmitError(err);
          return EMPTY;
        })
      )
      .subscribe({
        next: () => this.router.navigate(['/markets-page']),
      });
  }

  private onSubmitError(err: Error): void {
    this.toastService.danger('error occurred', err.message);

    this.loginForm.get('password')?.reset();
  }
}
