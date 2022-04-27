import React, { useMemo } from 'react';

import styles from './styles.module.css';

/**
 * mode - selected mode for a toasts (defines it's color)
 * message - toast text
 * onClose - defines what happens on taost click
 */
interface IToastProps {
  mode: string;
  message: string;
  onClose: () => void;
}

/**
 * Component for managing individual toast
 */
function Toast({ mode, message, onClose }: IToastProps) {
  // Memoizing classes array definition to prevent unnecessary re-rendering
  const classes = useMemo(
    () => [styles.toast, styles[mode]].join(' '),
    [mode],
  );

  const keyDownHandler = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onClose();
    }
  };

  // Role "button" is necessary because of the linter we use.
  // It forces us to also provide keyboard event, even though we won't
  // use it.
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
