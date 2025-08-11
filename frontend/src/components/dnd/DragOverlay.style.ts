import { css } from '@emotion/react';

const DragOverlay = (position: { x: number; y: number }) => css`
  position: fixed;
  left: 0;
  top: 0;
  transform: translate3d(${position.x}px, ${position.y}px, 0);
  pointer-events: auto;
  z-index: 1000;
`;

export default { DragOverlay };
