import { css } from '@emotion/react';

const DragOverlay = (adjustedPosition: { x: number; y: number }) => css`
  left: ${adjustedPosition.x}px;
  top: ${adjustedPosition.y}px;
  pointer-events: auto;
  z-index: 1000;
`;

export default { DragOverlay };
