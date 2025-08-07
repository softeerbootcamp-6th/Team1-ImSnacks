import { useState, useRef, useCallback } from 'react';

interface Position {
  x: number;
  y: number;
}

interface DragOffset {
  x: number;
  y: number;
}

interface UseDragAndDropProps<T> {
  items: T[];
  getItemId: (item: T) => number | string;
  getItemPosition: (item: T) => Position;
  onPositionChange: (items: T[]) => void;
}

export const useDragAndDrop = <T>({
  items,
  getItemId,
  getItemPosition,
  onPositionChange,
}: UseDragAndDropProps<T>) => {
  const [draggedItemId, setDraggedItemId] = useState<number | string | null>(
    null
  );
  const [dragOffset, setDragOffset] = useState<DragOffset>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent, itemId: number | string) => {
      const item = items.find(item => getItemId(item) === itemId);
      if (!item || !containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const position = getItemPosition(item);
      const offsetX = e.clientX - rect.left - position.x;
      const offsetY = e.clientY - rect.top - position.y;

      setDragOffset({ x: offsetX, y: offsetY });
      setDraggedItemId(itemId);
      setIsDragging(true);
    },
    [items, getItemId, getItemPosition]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (draggedItemId === null || !containerRef.current) return;

      requestAnimationFrame(() => {
        const rect = containerRef.current!.getBoundingClientRect();
        const newX = e.clientX - rect.left - dragOffset.x;
        const newY = e.clientY - rect.top - dragOffset.y;

        const updatedItems = items.map(item => {
          if (getItemId(item) === draggedItemId) {
            return {
              ...item,
              position: { x: newX, y: newY },
            };
          }
          return item;
        });

        onPositionChange(updatedItems);
      });
    },
    [draggedItemId, dragOffset, items, getItemId, onPositionChange]
  );

  const handleMouseUp = useCallback(() => {
    setDraggedItemId(null);
    setIsDragging(false);
  }, []);

  const isItemDragging = useCallback(
    (itemId: number | string) => draggedItemId === itemId,
    [draggedItemId]
  );

  return {
    containerRef,
    isDragging,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    isItemDragging,
  };
};
