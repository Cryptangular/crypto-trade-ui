import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'stub-page',
    pathMatch: 'full',
  },
  {
    path: 'stub-page',
    loadComponent: () => import('./pages/stub-page/stub-page').then(m => m.StubPage),
  },
  {
    path: 'register',
    loadComponent: () => import('./auth/register-form/register-form').then(m => m.RegisterForm),
  },
  {
    path: 'login',
    loadComponent: () => import('./auth/login-form/login-form').then(m => m.LoginForm),
  },
];
