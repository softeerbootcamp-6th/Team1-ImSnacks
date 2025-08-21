import { css } from '@emotion/react';
import type { Position } from '@/types/workCard.type';

const DraggingItem = ({
  position,
  children,
}: {
  position: Position;
  children: React.ReactNode;
}) => {
  return (
    <div
      css={css`
        position: absolute;
        left: 0;
        top: 0;
        transform: translate3d(${position.x}px, ${position.y}px, 0);
        pointer-events: none;
        z-index: 1000;
      `}
    >
      {children}
    </div>
  );
};

export default DraggingItem;
