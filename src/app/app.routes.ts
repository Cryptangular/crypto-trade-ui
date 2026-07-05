import { Routes } from '@angular/router';
import { authGuard } from './pages/auth/guards/auth.guard';
import { APP_ROUTES } from './shared/constants/app-routes';

export const routes: Routes = [
  {
    path: APP_ROUTES.dashboard,
    title: 'dashboard',
    loadComponent: () => import('./pages/stx-dashboard-page/stx-dashboard-page').then(m => m.StxDashboardPage),
  },
  {
    path: 'markets',
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
  {
    path: APP_ROUTES.settings,
    title: 'settings',
    loadComponent: () => import('./pages/stx-settings-page/stx-settings-page').then(m => m.StxSettingsPage),
    canActivate: [authGuard],
  },
  {
    path: APP_ROUTES.notFound,
    title: 'not-found',
    loadComponent: () => import('./pages/stx-not-found-page/stx-not-found-page').then(m => m.StxNotFoundPage),
  },
];
