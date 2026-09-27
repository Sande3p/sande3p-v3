// useScrollspy.js - migrated from app/components/scrollspy/scrollspy.js
import { useEffect, useRef } from 'react';

// Attaches a 'scrollstyle' class to the returned ref's element once
// the body scrollTop passes the given threshold.
export function useScrollspy(threshold = 10) {
  const elRef = useRef(null);

  useEffect(() => {
    let isIdle = true;
    const onScroll = () => {
      const st = document.querySelector('body').scrollTop;
      if (isIdle) {
        isIdle = false;
        window.setTimeout(() => {
          isIdle = true;
          if (!elRef.current) return;
          if (st > threshold) {
            elRef.current.classList.add('scrollstyle');
          } else {
            elRef.current.classList.remove('scrollstyle');
          }
        }, 10);
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);

  return elRef;
}
