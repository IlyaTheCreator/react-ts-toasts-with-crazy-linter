export type ToastMode = 'info' | 'success' | 'warning' | 'error';

export type ToastType = {
  id: string;
  mode: ToastMode;
  autoClose: boolean;
  message: string;
};

export interface IToastPortalRef {
  addMessage: (toast: Omit<ToastType, 'id'>) => void;
}
