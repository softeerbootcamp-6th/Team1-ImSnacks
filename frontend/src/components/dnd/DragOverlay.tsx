import React, { useCallback } from 'react';
import { createPortal } from 'react-dom';
import type { WorkBlockType } from '@/types/workCard.type';

const DragOverlay = ({
  isDragging,
  draggedItem,
  position,
  children,
  containerRef,
  scrollOffset,
}: {
  isDragging: boolean;
  draggedItem: WorkBlockType | null;
  position: { x: number; y: number };
  children: React.ReactNode;
  containerRef: React.RefObject<HTMLDivElement | null>;
  scrollOffset: number;
}) => {
  const getAdjustedPosition = useCallback(() => {
    if (!containerRef?.current) return position;

    const containerRect = containerRef.current.getBoundingClientRect();

    return {
      x: containerRect.left + position.x - scrollOffset,
      y: containerRect.top + position.y,
    };
  }, [position, containerRef, scrollOffset]);

  if (!isDragging || !draggedItem) return null;

  const adjustedPosition = getAdjustedPosition();

  return createPortal(
    <div
      style={{
        position: 'fixed',
        left: adjustedPosition.x,
        top: adjustedPosition.y,
        pointerEvents: 'auto',
        zIndex: 1000,
        transform: 'translate(-50%, -50%)',
      }}
    >
      {children}
    </div>,
    document.body
  );
};

export default DragOverlay;
