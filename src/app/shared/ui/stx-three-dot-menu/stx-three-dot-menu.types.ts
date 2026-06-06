import { MaterialIcons } from 'material-design-icons-literal-types';

export type PosX = 'before' | 'after';
export type PosY = 'above' | 'below';

export type BaseMenuItem = {
  readonly id: string;
  readonly label: string;
  readonly icon?: MaterialIcons;
  readonly disabled?: boolean;
};

export type ActionMenuItem = BaseMenuItem & {
  readonly kind: 'action';
  readonly click: () => void;
  readonly children?: never;
};

export type ParentMenuItem = BaseMenuItem & {
  readonly kind: 'parent';
  readonly click?: never;
  readonly children: readonly MenuItem[];
};

export type MenuItem = ActionMenuItem | ParentMenuItem;
