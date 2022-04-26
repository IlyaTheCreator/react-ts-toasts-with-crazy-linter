import React, {
  forwardRef,
  ReactPortal,
  useImperativeHandle,
  useState,
} from 'react';
import ReactDOM from 'react-dom';

import useToastPortal from '../../hooks/useToastPortal';
import useToastAutoClose from '../../hooks/useToastAutoClose';

import helpers from '../../shared/helpers';

import Toast from '../Toast';

import { IToast } from '../../types';

import styles from './styles.module.css';

interface IToastPortalProps {
  autoClose: boolean;
  autoCloseTime: number;
}

const ToastPortal = forwardRef<ReactPortal, IToastPortalProps>(
  ({ autoClose, autoCloseTime = 5000 }, ref) => {
    const [toasts, setToasts] = useState<IToast[]>([]);
    const { loaded, portalId } = useToastPortal();

    useToastAutoClose({ autoClose, autoCloseTime, toasts, setToasts });

    const removeToast = (id: string) => {
      setToasts(prev => prev.filter((t: IToast) => t.id !== id));
    };

    useImperativeHandle(ref, () => ({
      addMessage(toast: IToast) {
        setToasts((prev: IToast[]) => [
          ...prev,
          { ...toast, id: helpers.uuid() },
        ]);
      },
      key: Math.random(),
      children: undefined,
      props: {},
      type: 'any',
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
