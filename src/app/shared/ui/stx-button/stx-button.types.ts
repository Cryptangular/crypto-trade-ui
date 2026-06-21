import { MatButtonAppearance } from '@angular/material/button';
import { StxIcons } from '../../types/icon';

type StxBtnAppearances = Extract<MatButtonAppearance, 'text' | 'outlined' | 'tonal'>;

export type StxBtnType = 'button' | 'submit';

type StxIconBtnConfig = {
  appearance: 'icon';
  icon: StxIcons;
  label?: never;
  href?: string;
};

type StxTextBtnConfig = {
  appearance: StxBtnAppearances;
  icon?: StxIcons;
  label: string;
  href?: string;
};

export type StxBtnConfig = StxIconBtnConfig | StxTextBtnConfig;
