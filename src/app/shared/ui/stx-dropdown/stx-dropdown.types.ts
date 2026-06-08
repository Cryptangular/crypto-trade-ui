export type SelectOption<T> = {
  value: T;
  viewValue: string;
  disabled?: boolean;
};

export type DropdownAppearance = 'outline' | 'fill';

export type DropdownValue<T> = T | T[] | null;
