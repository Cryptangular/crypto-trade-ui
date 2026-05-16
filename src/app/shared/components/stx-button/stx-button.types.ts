import { MatButtonAppearance } from '@angular/material/button';

export enum StxIcons {
  home = 'home',
  dashboard = 'dashboard',
  transfer = 'transfer',
  card = 'card',
  wallet = 'wallet',
}

type StxBtnAppearances = Extract<MatButtonAppearance, 'text' | 'outlined' | 'tonal'>;

export type StxBtnType = 'button' | 'submit';

type StxIconBtnConfig = {
  appearance: 'icon';
  icon: StxIcons;
  label?: never;
};

type StxTextBtnConfig = {
  appearance: StxBtnAppearances;
  icon?: StxIcons;
  label: string;
};

export type StxBtnConfig = StxIconBtnConfig | StxTextBtnConfig;
