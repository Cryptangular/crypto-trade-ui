import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
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
import { AuthService } from '../services/auth-service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'stx-register-form',
  imports: [ReactiveFormsModule, StxInput, StxButton],
  templateUrl: './register-form.html',
  styleUrl: './register-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterForm {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly toastService = inject(ToastService);
  private readonly authService = inject(AuthService);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly emailErrors = EMAIL_VALIDATION_MESSAGES;
  protected readonly passwordErrors = PASSWORD_VALIDATION_MESSAGES;
  protected readonly confirmPasswordErrors = CONFIRM_PASSWORD_VALIDATION_MESSAGES;

  protected registerForm!: FormGroup;

  protected readonly submitBtnConfig = signal<StxBtnConfig>({
    label: 'Sign up',
    appearance: 'tonal',
  });

  protected readonly loginLinkConfig: StxBtnConfig = {
    label: 'Already have an account? Sign in',
    appearance: 'text',
    href: '/login',
  };

  constructor() {
    this.initForm();
  }

  private initForm(): void {
    const passwordControl = this.fb.control('', [Validators.required, PasswordValidators.passwordStrength()]);

    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: passwordControl,
      confirmPassword: ['', [Validators.required, PasswordValidators.passwordsMatch(passwordControl)]],
    });

    passwordControl.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      const confirmControl = this.registerForm.get('confirmPassword');
      if (confirmControl?.value) {
        confirmControl.updateValueAndValidity({ emitEvent: true });
      }
    });
  }

  protected onSubmit(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const { email, password } = this.registerForm.value;

    this.authService
      .signUp({
        email: email!,
        password: password!,
      })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.router.navigate(['/stub-page']);
        },
        error: (err: Error) => {
          this.toastService.danger('error occurred', err.message);

          this.registerForm.patchValue({ password: '', confirmPassword: '' });

          const passwordCtrl = this.registerForm.get('password');
          const confirmCtrl = this.registerForm.get('confirmPassword');

          passwordCtrl?.setErrors(null);
          confirmCtrl?.setErrors(null);

          passwordCtrl?.markAsUntouched();
          confirmCtrl?.markAsUntouched();

          this.registerForm.updateValueAndValidity();
        },
      });
  }
}
