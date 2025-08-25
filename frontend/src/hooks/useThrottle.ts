import { useCallback, useRef } from 'react';

function useThrottle<E>(func: (e: E) => void, delay: number): (e: E) => void {
  const lastTime = useRef(0);
  const timeoutRef = useRef<number | null>(null);

  return useCallback(
    (e: E) => {
      const now = Date.now();

      if (now - lastTime.current >= delay) {
        func(e);
        lastTime.current = now;
      } else {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);

        timeoutRef.current = window.setTimeout(() => {
          func(e);
          lastTime.current = Date.now();
        }, delay - (now - lastTime.current));
      }
    },
    [func, delay]
  );
}

export default useThrottle;
