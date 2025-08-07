import { useState, useRef, useCallback, useEffect } from 'react';

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
  const [currentDraggingItem, setCurrentDraggingItem] = useState<T | null>(
    null
  );

  // 드래그 중 workBlocks가 바뀌면 currentDraggingItem도 최신값으로 동기화
  useEffect(() => {
    if (isDragging && currentDraggingItem) {
      const updated = itemsRef.current.find(
        item => getItemId(item) === getItemId(currentDraggingItem)
      );
      if (updated) setCurrentDraggingItem(updated);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemsRef.current, isDragging]);

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
      setCurrentDraggingItem(item);
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
            const updatedItem = updateBlock(item, { x, y });
            if (
              currentDraggingItem &&
              getItemId(currentDraggingItem) === itemId
            ) {
              setCurrentDraggingItem(updatedItem);
            }
            return updatedItem;
          }
          return item;
        });

        onPositionChange(updatedItems);
        itemsRef.current = updatedItems;
      });
    },
    [getItemId, onPositionChange, currentDraggingItem]
  );

  const endDrag = useCallback(() => {
    if (animationFrameRef.current !== null) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    draggedItemIdRef.current = null;
    latestMousePos.current = null;
    setCurrentDraggingItem(null);
    setIsDragging(false);
  }, []);

  const isItemDragging = useCallback(
    (id: number | string) => draggedItemIdRef.current === id,
    []
  );

  return {
    containerRef,
    isDragging,
    startDrag,
    updatePosition,
    endDrag,
    isItemDragging,
    currentDraggingItem,
  };
};
