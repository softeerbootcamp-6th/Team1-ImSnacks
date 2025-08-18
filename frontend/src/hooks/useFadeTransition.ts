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

      const startFade = setTimeout(() => {
        setIsFading(true);
      }, 0);

      const timeout = setTimeout(() => {
        setPrev(null);
        setIsFading(false);
        lastValueRef.current = value;
      }, durationMs + delayMs);

      return () => {
        clearTimeout(startFade);
        clearTimeout(timeout);
      };
    }
  }, [value, durationMs, delayMs]);

  return { prev, isFading, durationMs } as const;
};
