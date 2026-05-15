import { MatButtonAppearance } from '@angular/material/button';

export enum Icons {
  home = 'home',
  dashboard = 'dashboard',
  transfer = 'transfer',
  card = 'card',
  wallet = 'wallet',
}

type BtnAppearances = Exclude<MatButtonAppearance, 'filled' | 'tonal'>;

export type BtnType = 'button' | 'submit';

type IconBtnConfig = {
  appearance: 'icon';
  icon: Icons;
  label?: never;
};

type TextBtnConfig = {
  appearance: BtnAppearances;
  icon?: Icons;
  label: string;
};

export type BtnConfig = IconBtnConfig | TextBtnConfig;
