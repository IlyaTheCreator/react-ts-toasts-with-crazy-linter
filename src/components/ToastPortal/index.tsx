import React, { forwardRef, useImperativeHandle, useState } from 'react';
import ReactDOM from 'react-dom';

import useToastPortal from '../../hooks/useToastPortal';
import useToastAutoClose from '../../hooks/useToastAutoClose';

import helpers from '../../shared/helpers';

import Toast from '../Toast';

import { IToastPortalRef, ToastType } from '../../types';

import styles from './styles.module.css';

/**
 * autoClose - defines whether to close toasts automatically or not
 * autoCloseTime - defines when to close toasts
 */
interface IToastPortalProps {
  autoClose: boolean;
  autoCloseTime: number;
}

const ToastPortal = forwardRef<IToastPortalRef, IToastPortalProps>(
  ({ autoClose, autoCloseTime = 5000 }, ref) => {
    // State for managing all toasts
    const [toasts, setToasts] = useState<ToastType[]>([]);
    const { loaded, portalId } = useToastPortal();

    // Conditional autoClose on timeout
    useToastAutoClose({ autoClose, autoCloseTime, toasts, setToasts });

    // Function for removing a toast from toasts state by its id
    const removeToast = (id: string) => {
      setToasts(prev => prev.filter((t: ToastType) => t.id !== id));
    };

    // Passing addMessage method to parent. There we don't need toasts' id, that's why we use Omit
    useImperativeHandle(ref, () => ({
      addMessage(toast: Omit<ToastType, 'id'>) {
        setToasts((prev: ToastType[]) => [
          ...prev,
          { ...toast, id: helpers.uuid() },
        ]);
      },
    }));

    return loaded
      ? ReactDOM.createPortal(
          <div className={styles.toastContainer}>
            {toasts.map(t => (
              <Toast
                onClose={() => removeToast(t.id)}
                key={t.id}
                message={t.message}
                mode={t.mode}
              />
            ))}
          </div>,
          document.getElementById(portalId)!,
        )
      : null;
  },
);

export default ToastPortal;
