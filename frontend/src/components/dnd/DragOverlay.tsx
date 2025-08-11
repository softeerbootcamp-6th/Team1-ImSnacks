import { useCallback, type ReactNode, type RefObject } from 'react';
import { createPortal } from 'react-dom';
import { css } from '@emotion/react';
import S from './DragOverlay.style';

interface DragOverlayProps {
  position: { x: number; y: number };
  children: ReactNode;
  containerRef: RefObject<HTMLDivElement | null>;
  scrollOffset: number;
}

const DragOverlay = ({
  position,
  children,
  containerRef,
  scrollOffset,
}: DragOverlayProps) => {
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
    <div
      css={[
        S.DragOverlay(adjustedPosition),
        css`
          position: fixed;
          z-index: 1000;
        `,
      ]}
    >
      {children}
    </div>,
    document.body
  );
};

export default DragOverlay;
