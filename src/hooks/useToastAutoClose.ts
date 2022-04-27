import { useEffect } from 'react';
import { ToastType } from '../types';

/**
 * autoClose - defines whether to close toasts automatically or not
 * autoCloseTime - defines when to close toasts
 * toasts - all toasts
 * setToasts - toasts setter
 */
interface IUseToastAutoCloseArgs {
  autoClose: boolean;
  autoCloseTime: number;
  toasts: ToastType[];
  setToasts: React.Dispatch<React.SetStateAction<ToastType[]>>;
}

/**
 * Custom hook for conditional toasts deletion
 */
const useToastAutoClose = ({
  autoClose,
  autoCloseTime,
  setToasts,
  toasts,
}: IUseToastAutoCloseArgs) => {
  useEffect(() => {
    if (!autoClose && toasts.length) {
      return undefined;
    }

    const timeoutId = setTimeout(() => {
      setToasts(prev =>
        prev.filter(t => t.id !== prev[prev.length - 1].id),
      );
    }, autoCloseTime);

    return () => clearTimeout(timeoutId);
  }, [toasts, autoCloseTime]);
};

export default useToastAutoClose;
