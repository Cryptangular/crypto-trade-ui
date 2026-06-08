import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { StxInput } from '../../../shared/ui/stx-input/stx-input';
import { StxButton } from '../../../shared/ui/stx-button/stx-button';
import { StxBtnConfig } from '../../../shared/ui/stx-button/stx-button.types';
import { PasswordValidators } from '../validators/password.validators';
import { EMAIL_VALIDATION_MESSAGES, PASSWORD_VALIDATION_MESSAGES } from '../constants/errors.constants';

@Component({
  selector: 'stx-login-form',
  imports: [ReactiveFormsModule, StxInput, StxButton],
  templateUrl: './login-form.html',
  styleUrl: './login-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginForm {
  private readonly fb = inject(FormBuilder);
  protected readonly isLoading = signal(false);

  protected readonly emailErrors = EMAIL_VALIDATION_MESSAGES;
  protected readonly passwordErrors = PASSWORD_VALIDATION_MESSAGES;

  protected loginForm!: FormGroup;

  protected readonly submitBtnConfig = signal<StxBtnConfig>({
    label: 'Log in',
    appearance: 'tonal',
  });

  protected readonly registerLinkConfig: StxBtnConfig = {
    label: `Don't have an account? Sign Up`,
    appearance: 'text',
    href: '/register',
  };

  constructor() {
    this.initForm();
  }

  private initForm(): void {
    const passwordControl = this.fb.control('', [Validators.required, PasswordValidators.passwordStrength()]);

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: passwordControl,
    });
  }

  protected onSubmit(): void {
    if (this.isLoading()) return;

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);

    const { email, password } = this.loginForm.value;

    console.log(email + '-' + password);
  }
}
