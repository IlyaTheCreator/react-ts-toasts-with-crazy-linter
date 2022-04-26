import React, { useMemo } from 'react';

import styles from './styles.module.css';

interface IToastProps {
  mode: string;
  message: string;
  onClose: () => void;
}

function Toast({ mode, message, onClose }: IToastProps) {
  const classes = useMemo(
    () => [styles.toast, styles[mode]].join(' '),
    [mode],
  );

  const keyDownHandler = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onClose();
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onKeyDown={keyDownHandler}
      onClick={onClose}
      className={classes}
    >
      <div className={styles.message}>{message}</div>
    </div>
  );
}

export default Toast;
