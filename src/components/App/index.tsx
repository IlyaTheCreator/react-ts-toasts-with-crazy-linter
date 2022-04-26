import React, { useRef, useState } from 'react';

import ToastPortal from '../ToastPortal';

import styles from './styles.module.css';

interface IPropsRef {
  addMessage: (obj: object) => void;
}

function App() {
  const [text, setText] = useState('');
  const [mode, setMode] = useState('info');
  const [autoClose, setAutoClose] = useState(false);

  const toastRef = useRef<(any & IPropsRef) | undefined>();

  const addToast = () => {
    toastRef.current?.addMessage({ mode, autoClose, message: text });
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
        <form
          onSubmit={e => {
            e.preventDefault();

            if (text) {
              addToast();
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

          <select value={mode} onChange={e => setMode(e.target.value)}>
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
      </div>

      <ToastPortal
        autoCloseTime={2000}
        autoClose={autoClose}
        ref={toastRef}
      />
    </div>
  );
}

export default App;
