import React, { useRef, useState } from 'react';

import ToastPortal from '../ToastPortal';

import { IToastPortalRef, ToastType } from '../../types';

import styles from './styles.module.css';
import ToastForm from '../ToastForm';

/**
 * Central app's point.
 */
function App() {
  // State for managing autoClose option selection
  const [autoClose, setAutoClose] = useState(false);

  // Ref used in forwardRef in ToastPortal component
  const toastRef = useRef<IToastPortalRef | null>(null);

  // Function which triggers corresponding method we got from
  // useImperativeHandle in ToastPortal Component
  const addToast = (toastData: Omit<ToastType, 'id'>) => {
    toastRef.current?.addMessage(toastData);
  };

  return (
    <div className={styles.main}>
      <h1>Portals and Toast</h1>
      <div className={styles.content}>
        <img
          alt="toaster"
          src="/assets/toaster.svg"
          className={styles.toaster}
        />
        <ToastForm
          addMessage={addToast}
          autoClose={autoClose}
          setAutoClose={setAutoClose}
        />
      </div>

      <ToastPortal
        autoCloseTime={700}
        autoClose={autoClose}
        ref={toastRef}
      />
    </div>
  );
}

export default App;
