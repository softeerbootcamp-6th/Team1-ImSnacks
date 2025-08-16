import { css } from '@emotion/react';
import { ColorPrimary, Opacity } from '@/styles/colors';
import { Typography } from '@/styles/typography';

export const WorkActiveToolTipContainer = (x: number, width: number) => css`
  position: absolute;
  top: 16px;
  left: ${x}px;
  width: ${width}px;
  height: 176px;
  background-color: ${Opacity.White.W400};
  z-index: 1000;
  backdrop-filter: blur(4px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-image: linear-gradient(
      to right,
      ${ColorPrimary.B700} 0%,
      ${ColorPrimary.B700} 50%,
      transparent 50%,
      transparent 100%
    ),
    linear-gradient(
      to right,
      ${ColorPrimary.B700} 0%,
      ${ColorPrimary.B700} 50%,
      transparent 50%,
      transparent 100%
    ),
    linear-gradient(
      to bottom,
      ${ColorPrimary.B700} 0%,
      ${ColorPrimary.B700} 50%,
      transparent 50%,
      transparent 100%
    ),
    linear-gradient(
      to bottom,
      ${ColorPrimary.B700} 0%,
      ${ColorPrimary.B700} 50%,
      transparent 50%,
      transparent 100%
    );
  background-size: 20px 2px, 20px 2px, 2px 20px, 2px 20px;
  background-repeat: repeat-x, repeat-x, repeat-y, repeat-y;
  background-position: 0 0, 0 100%, 0 0, 100% 0;
`;

export const WorkActiveToolTipText = css`
  ${Typography.Body_S_700}
  color: ${ColorPrimary.B700};
`;
