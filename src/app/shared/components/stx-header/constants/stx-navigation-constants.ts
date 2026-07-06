import { APP_ROUTES } from '../../../constants/app-routes';

export type NavigationItem = {
  label: string;
  route: string;
};

export const PRIVATE_ROUTES: NavigationItem[] = [
  { label: 'trade', route: '/trade' },
  { label: 'portfolio', route: '/portfolio' },
];

export const PUBLIC_ROUTES: NavigationItem[] = [
  { label: 'dashboard', route: `/${APP_ROUTES.dashboard}` },
  { label: 'markets', route: '/markets' },
  { label: 'about us', route: '/about-us' },
];
