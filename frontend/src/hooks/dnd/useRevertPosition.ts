import { useCallback } from 'react';
import type { Position, Size } from '@/types/workCard.type';

interface RevertPositionProps<T> {
  draggedItem: T | null;
  onRevert: () => void;
  getItemPosition: (item: T) => Position;
  initialPosition: Position | null;
}

export const useRevertPosition = <T extends { size?: Size }>({
  draggedItem,
  onRevert,
  getItemPosition,
  initialPosition,
}: RevertPositionProps<T>) => {
  const checkAndRevert = useCallback(
    (containerRect: DOMRect, scrollOffset: number) => {
      if (!draggedItem || !initialPosition) {
        return;
      }

      const { x, y } = getItemPosition(draggedItem);
      const itemWidth = draggedItem.size?.width || 0;
      const itemHeight = draggedItem.size?.height || 0;

      const isWithinBounds =
        x >= 0 + scrollOffset &&
        y >= 0 &&
        x + itemWidth <= containerRect.width + scrollOffset &&
        y + itemHeight <= containerRect.height;

      if (!isWithinBounds) {
        onRevert();
      }
    },
    [draggedItem, onRevert, getItemPosition, initialPosition]
  );

  return { checkAndRevert };
};
