import React, { useCallback } from 'react';
import { createPortal } from 'react-dom';
import S from './DragOverlay.style';

const DragOverlay = ({
  position,
  children,
  containerRef,
  scrollOffset,
}: {
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

  const adjustedPosition = getAdjustedPosition();

  return createPortal(
    <div css={S.DragOverlay(adjustedPosition)}>{children}</div>,
    document.body
  );
};

export default DragOverlay;
