import { useEffect, useRef } from 'react';

interface UseClickOutsideOptions {
  enabled?: boolean;
  eventType?: 'mousedown' | 'click';
}

export const useClickOutside = <T extends HTMLElement = HTMLDivElement>(
  onClickOutside: () => void,
  options: UseClickOutsideOptions = {}
) => {
  const { enabled = true, eventType = 'mousedown' } = options;
  const ref = useRef<T>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClickOutside();
      }
    };

    if (enabled) {
      document.addEventListener(eventType, handleClickOutside);
    }

    return () => {
      document.removeEventListener(eventType, handleClickOutside);
    };
  }, [onClickOutside, enabled, eventType]);

  return ref;
};

export default useClickOutside;
