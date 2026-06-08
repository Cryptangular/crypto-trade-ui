import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'register',
    pathMatch: 'full',
  },
  {
    path: 'markets-page',
    loadComponent: () => import('./pages/markets-page/markets-page').then(m => m.MarketsPage),
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/auth/register-form/register-form').then(m => m.RegisterForm),
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/auth/login-form/login-form').then(m => m.LoginForm),
  },
];
