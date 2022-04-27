// Type for toasts color mode
export type ToastMode = 'info' | 'success' | 'warning' | 'error';

// Type for an individual toast
export type ToastType = {
  id: string;
  mode: ToastMode;
  autoClose: boolean;
  message: string;
};

// Interface for forwardRef())
export interface IToastPortalRef {
  addMessage: (toast: Omit<ToastType, 'id'>) => void;
}
