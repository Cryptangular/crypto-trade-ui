import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StxInput } from '../../shared/ui/stx-input/stx-input';
import { StxButton } from '../../shared/ui/stx-button/stx-button';
import { StxBtnConfig } from '../../shared/ui/stx-button/stx-button.types';

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

  protected registerForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', [Validators.required]],
  });

  protected readonly submitBtnConfig = signal<StxBtnConfig>({
    label: 'Sign up',
    appearance: 'text',
  });

  protected readonly loginLinkConfig: StxBtnConfig = {
    label: 'Already have an account? Sign in',
    appearance: 'text',
    href: '/login',
  };

  protected onSubmit(): void {}
}
