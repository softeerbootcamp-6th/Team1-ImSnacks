import { useEffect, useRef, useState } from 'react';

interface UseFadeTransitionOptions {
  durationMs?: number;
  delayMs?: number;
}

export const useFadeTransition = <T>(
  value: T,
  options?: UseFadeTransitionOptions
) => {
  const { durationMs = 1000, delayMs = 0 } = options ?? {};

  const lastValueRef = useRef<T>(value);
  const [prev, setPrev] = useState<T | null>(null);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    if (lastValueRef.current !== value) {
      setPrev(lastValueRef.current);
      setIsFading(false);

      let raf1 = 0;
      let raf2 = 0;

      raf1 = requestAnimationFrame(() => {
        raf2 = requestAnimationFrame(() => setIsFading(true));
      });

      const timeout = setTimeout(() => {
        setPrev(null);
        setIsFading(false);
        lastValueRef.current = value;
      }, durationMs + delayMs);

      return () => {
        cancelAnimationFrame(raf1);
        cancelAnimationFrame(raf2);
        clearTimeout(timeout);
      };
    }
  }, [value, durationMs, delayMs]);

  return { prev, isFading, durationMs } as const;
};
