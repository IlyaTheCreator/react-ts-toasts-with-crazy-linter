import { useState, useEffect } from 'react';
import helpers from '../shared/helpers';

/**
 * Custom hook for creating a portal for toasts
 */
const useToastPortal = () => {
  const [loaded, setLoaded] = useState(false);
  const [portalId] = useState(`toast-portal-${helpers.uuid()}`);

  useEffect(() => {
    const div = document.createElement('div');
    div.id = portalId;
    div.classList.add('fixed-toast-wrapper');
    document.getElementsByTagName('body')[0].prepend(div);

    setLoaded(true);

    return () => {
      document.getElementsByTagName('body')[0].removeChild(div);
      return undefined;
    };
  }, [portalId]);

  return { loaded, portalId };
};

export default useToastPortal;
