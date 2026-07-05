import { Routes } from '@angular/router';
import { authGuard } from './pages/auth/guards/auth.guard';
import { APP_ROUTES } from './shared/constants/app-routes';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'register',
    pathMatch: 'full',
  },
  {
    path: 'markets',
    loadComponent: () => import('./pages/stx-markets-page/stx-markets-page').then(m => m.StxMarketsPage),
    canActivate: [authGuard],
  },
  {
    path: 'trade/:pair',
    loadComponent: () => import('./pages/trade-page/trade-page').then(m => m.TradePage),
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
  },
];
