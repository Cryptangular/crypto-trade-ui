import { MatButtonAppearance } from '@angular/material/button';
import { MaterialIcons } from 'material-design-icons-literal-types';

type StxBtnAppearances = Extract<MatButtonAppearance, 'text' | 'outlined' | 'tonal'>;

export type StxBtnType = 'button' | 'submit';

type StxIconBtnConfig = {
  appearance: 'icon';
  icon: MaterialIcons;
  label?: never;
  href?: never;
};

type StxTextBtnConfig = {
  appearance: StxBtnAppearances;
  icon?: MaterialIcons;
  label: string;
  href?: string;
};

export type StxBtnConfig = StxIconBtnConfig | StxTextBtnConfig;
