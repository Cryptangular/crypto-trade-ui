import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { LoginForm } from '../login-form/login-form';
import { AuthService } from '../services/auth-service';
import { ToastService } from '../../../core/services/toast/toast-service';

describe('LoginForm', () => {
  let component: LoginForm;
  let fixture: ComponentFixture<LoginForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginForm, ReactiveFormsModule],
      providers: [
        provideRouter([]),
        { provide: AuthService, useValue: { signIn: vi.fn() } },
        { provide: ToastService, useValue: { danger: vi.fn() } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginForm);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
