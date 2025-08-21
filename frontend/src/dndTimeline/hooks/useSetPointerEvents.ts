import { useEffect } from 'react';

interface UseSetPointerEventsProps {
  onPointerMove?: (e: PointerEvent) => void;
  onPointerUp?: (e: PointerEvent) => void;
}

export const useSetPointerEvents = ({
  onPointerMove,
  onPointerUp,
}: UseSetPointerEventsProps) => {
  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      onPointerMove?.(e);
    };

    const handlePointerUp = (e: PointerEvent) => {
      onPointerUp?.(e);
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [onPointerMove, onPointerUp]);
};
