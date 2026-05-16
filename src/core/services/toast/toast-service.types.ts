export const TOAST_STATE = {
  check: 'check',
  warning: 'warning',
  info: 'info',
  dangerous: 'dangerous',
} as const;

export type ToastStateType = keyof typeof TOAST_STATE;

export type ToastOptions = {
  duration: number | null;
  icon: boolean;
};

export type ToastType = {
  title: string;
  message?: string;
  state: ToastStateType;
  id: number;
  options: ToastOptions;
  open?: boolean;
};
