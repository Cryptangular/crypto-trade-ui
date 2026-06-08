import { Routes } from '@angular/router';
import { authGuard } from './pages/auth/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'register',
    pathMatch: 'full',
  },
  {
    path: 'markets-page',
    loadComponent: () => import('./pages/markets-page/markets-page').then(m => m.MarketsPage),
    canActivate: [authGuard],
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
