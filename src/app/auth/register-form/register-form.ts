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
@Component({
  selector: 'stx-register-form',
  imports: [ReactiveFormsModule, StxInput, StxButton],
  templateUrl: './register-form.html',
  styleUrl: './register-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterForm {
  private fb = inject(FormBuilder);
  private http = inject(HttpClient);
  private router = inject(Router);

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
      const formValues = this.registerForm.getRawValue() as Record<string, string>;
      console.log('Данные формы валидны, отправка:', formValues);
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}
