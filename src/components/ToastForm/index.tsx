import React, { useState } from 'react';

import { IToastPortalRef, ToastMode } from '../../types';

import styles from './styles.module.css';

/**
 * autoClose - defines whether to close toasts automatically or not
 * setAutoClose - corresonding state setter for autoClose
 * addMessage - described in IToastPortalRef. Function for adding a toast.
 */
interface IToastFormProps extends IToastPortalRef {
  autoClose: boolean;
  setAutoClose: React.Dispatch<React.SetStateAction<boolean>>;
}

/**
 * Component for managing app's form. Part of it's state (autoClose) is contained
 * in the parent element.
 */
function ToastForm({
  autoClose,
  setAutoClose,
  addMessage,
}: IToastFormProps) {
  // State for managing entered toast text
  const [text, setText] = useState('');
  // State for managing selected toast mode
  const [mode, setMode] = useState<ToastMode>('info');

  // Function for handling mode select change event
  const changeHanlder = (
    e: React.ChangeEvent<HTMLSelectElement & { value: ToastMode }>,
  ) => {
    setMode(e.target.value);
  };

  return (
    <form
      className={styles.form}
      onSubmit={e => {
        e.preventDefault();

        if (text) {
          addMessage({ mode, message: text, autoClose });
          setText('');
        }
      }}
    >
      <div className={styles.autoClose}>
        <input
          type="checkbox"
          checked={autoClose}
          id="autoClose"
          onChange={e => setAutoClose(e.target.checked)}
        />
        <label htmlFor="autoClose">Auto Close</label>
      </div>

      <select value={mode} onChange={changeHanlder}>
        <option value="info">Info</option>
        <option value="success">Success</option>
        <option value="warning">Warning</option>
        <option value="error">Error</option>
      </select>

      <input
        type="text"
        value={text}
        placeholder="Toast Value"
        onChange={e => setText(e.target.value)}
      />

      <button type="submit">Submit</button>
    </form>
  );
}

export default ToastForm;
