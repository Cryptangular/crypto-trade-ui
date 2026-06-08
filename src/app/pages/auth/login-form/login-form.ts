import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'stx-login-form',
  imports: [],
  templateUrl: './login-form.html',
  styleUrl: './login-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginForm {}
