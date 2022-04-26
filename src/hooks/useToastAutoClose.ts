import { useEffect } from 'react';
import { IToast } from '../types';

interface IUseToastAutoCloseArgs {
  autoClose: boolean;
  autoCloseTime: number;
  setToasts: React.Dispatch<React.SetStateAction<IToast[]>>;
  toasts: IToast[];
}

const useToastAutoClose = ({
  autoClose,
  autoCloseTime,
  setToasts,
  toasts,
}: IUseToastAutoCloseArgs) => {
  useEffect(() => {
    if (!autoClose) {
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
