import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StxInput } from '../../shared/ui/stx-input/stx-input';
import { StxButton } from '../../shared/ui/stx-button/stx-button';
import { StxBtnConfig } from '../../shared/ui/stx-button/stx-button.types';
import { PasswordValidators } from '../validators/password.validators';

import {
  CONFIRM_PASSWORD_VALIDATION_MESSAGES,
  EMAIL_VALIDATION_MESSAGES,
  PASSWORD_VALIDATION_MESSAGES,
} from '../constants/errors.constants';
import { ToastService } from '../../../core/services/toast/toast-service';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from '../services/auth-service';
@Component({
  selector: 'stx-register-form',
  imports: [ReactiveFormsModule, StxInput, StxButton],
  templateUrl: './register-form.html',
  styleUrl: './register-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterForm {
  private readonly fb = inject(FormBuilder);
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly apiUrl = '/api/auth';
  private readonly toastService = inject(ToastService);
  private readonly authService = inject(AuthService);
  private readonly destroy$ = new Subject<void>();

  protected readonly emailErrors = EMAIL_VALIDATION_MESSAGES;
  protected readonly passwordErrors = PASSWORD_VALIDATION_MESSAGES;
  protected readonly confirmPasswordErrors = CONFIRM_PASSWORD_VALIDATION_MESSAGES;

  protected registerForm: FormGroup = this.fb.group(
    {
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, PasswordValidators.passwordStrength()]],
      confirmPassword: ['', [Validators.required]],
    },
    {
      validators: [PasswordValidators.passwordsMatch('password', 'confirmPassword')],
    }
  );

  protected readonly submitBtnConfig = signal<StxBtnConfig>({
    label: 'Sign up',
    appearance: 'tonal',
  });

  protected readonly loginLinkConfig: StxBtnConfig = {
    label: 'Already have an account? Sign in',
    appearance: 'text',
    href: '/login',
  };

  protected onSubmit(): void {
    if (this.registerForm.valid) {
      const { email, password } = this.registerForm.value;

      this.authService
        .signUp({
          email: email!,
          password: password!,
        })
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.router.navigate(['/stub-page']);
          },
          error: () => {
            this.toastService.danger('An unexpected error occurred', 'An unexpected error occurred');
          },
        });
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}
