import React, { useCallback } from 'react';
import { createPortal } from 'react-dom';
import type { WorkBlockType } from '@/types/workCard.type';
import S from './DragOverlay.style';

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
    <div css={S.DragOverlay(adjustedPosition)}>{children}</div>,
    document.body
  );
};

export default DragOverlay;
