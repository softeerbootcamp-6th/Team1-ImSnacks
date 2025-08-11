// useRevertPosition.ts
import { useCallback } from 'react';
import type { Position } from '@/types/workCard.type';

interface RevertPositionProps<T> {
  draggedItem: T | null;
  onRevert: () => void;
  getItemPosition: (item: T) => Position;
  initialPosition: Position | null;
}

export const useRevertPosition = <
  T extends { width?: number; height?: number }
>({
  draggedItem,
  onRevert,
  getItemPosition,
  initialPosition,
}: RevertPositionProps<T>) => {
  const checkAndRevert = useCallback(
    (containerRect: DOMRect) => {
      if (!draggedItem || !initialPosition) {
        return;
      }

      const { x, y } = getItemPosition(draggedItem);
      const itemWidth = draggedItem.width || 0;
      const itemHeight = draggedItem.height || 0;

      const isWithinBounds =
        x >= 0 &&
        y >= 0 &&
        x + itemWidth <= containerRect.width &&
        y + itemHeight <= containerRect.height;

      if (!isWithinBounds) {
        onRevert();
      }
    },
    [draggedItem, onRevert, getItemPosition, initialPosition]
  );

  return { checkAndRevert };
};
