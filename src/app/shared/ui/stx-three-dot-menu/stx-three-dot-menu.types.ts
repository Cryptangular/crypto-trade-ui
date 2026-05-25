import { StxBtnConfig } from '../stx-button/stx-button.types';
import { MaterialIcons } from 'material-design-icons-literal-types';

export type PosX = 'before' | 'after';
export type PosY = 'above' | 'below';

export type MenuItem = {
  label: string;
  icon?: MaterialIcons;
  disabled?: boolean;
  click?: () => void;
  children?: MenuItem[];
};
