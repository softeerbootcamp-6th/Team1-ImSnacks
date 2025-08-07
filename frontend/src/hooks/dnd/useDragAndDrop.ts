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
  getItemId: (item: T) => number | string;
  getItemPosition: (item: T) => Position;
  onPositionChange: (items: T[]) => void;
}

export const useDragAndDrop = <T>({
  getItemId,
  getItemPosition,
  onPositionChange,
}: UseDragAndDropProps<T>) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const draggedItemIdRef = useRef<number | string | null>(null);
  const dragOffsetRef = useRef<DragOffset>({ x: 0, y: 0 });
  const itemsRef = useRef<T[]>([]);
  const animationFrameRef = useRef<number | null>(null);
  const latestMousePos = useRef<{ x: number; y: number } | null>(null);

  const [isDragging, setIsDragging] = useState(false);

  const startDrag = useCallback(
    (e: React.MouseEvent, itemId: number | string, items: T[]) => {
      const container = containerRef.current;
      if (!container) return;

      const item = items.find(i => getItemId(i) === itemId);
      if (!item) return;

      const rect = container.getBoundingClientRect();
      const position = getItemPosition(item);
      dragOffsetRef.current = {
        x: e.clientX - rect.left - position.x,
        y: e.clientY - rect.top - position.y,
      };

      draggedItemIdRef.current = itemId;
      itemsRef.current = items;
      setIsDragging(true);
    },
    [getItemId, getItemPosition]
  );

  const updatePosition = useCallback(
    (e: React.MouseEvent, updateBlock: (item: T, pos: Position) => T) => {
      latestMousePos.current = { x: e.clientX, y: e.clientY };

      if (animationFrameRef.current !== null) return;

      animationFrameRef.current = requestAnimationFrame(() => {
        animationFrameRef.current = null;

        const container = containerRef.current;
        const itemId = draggedItemIdRef.current;
        const mouse = latestMousePos.current;
        if (!container || itemId === null || !mouse) return;

        const rect = container.getBoundingClientRect();
        const x = mouse.x - rect.left - dragOffsetRef.current.x;
        const y = mouse.y - rect.top - dragOffsetRef.current.y;

        const updatedItems = itemsRef.current.map(item => {
          if (getItemId(item) === itemId) {
            return updateBlock(item, { x, y });
          }
          return item;
        });

        onPositionChange(updatedItems);
      });
    },
    [getItemId, onPositionChange]
  );

  const endDrag = useCallback(() => {
    if (animationFrameRef.current !== null) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    draggedItemIdRef.current = null;
    latestMousePos.current = null;
    setIsDragging(false);
  }, []);

  const isItemDragging = useCallback(
    (id: number | string) => draggedItemIdRef.current === id,
    []
  );

  const getDraggingItem = useCallback(
    (currentItems?: T[]) => {
      if (draggedItemIdRef.current === null) return null;
      const items = currentItems || itemsRef.current;
      return items.find(item => getItemId(item) === draggedItemIdRef.current);
    },
    [getItemId]
  );

  return {
    containerRef,
    isDragging,
    startDrag,
    updatePosition,
    endDrag,
    isItemDragging,
    getDraggingItem,
  };
};
