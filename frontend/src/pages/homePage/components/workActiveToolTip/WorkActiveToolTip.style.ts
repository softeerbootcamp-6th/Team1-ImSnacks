import { css } from '@emotion/react';
import { Opacity } from '@/styles/colors';
import { Typography } from '@/styles/typography';
import type { Theme } from '@emotion/react';

export const WorkActiveToolTipContainer = (
  x: number,
  width: number,
  theme: Theme
) => css`
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
      ${theme.ColorPrimary.B700} 0%,
      ${theme.ColorPrimary.B700} 50%,
      transparent 50%,
      transparent 100%
    ),
    linear-gradient(
      to right,
      ${theme.ColorPrimary.B700} 0%,
      ${theme.ColorPrimary.B700} 50%,
      transparent 50%,
      transparent 100%
    ),
    linear-gradient(
      to bottom,
      ${theme.ColorPrimary.B700} 0%,
      ${theme.ColorPrimary.B700} 50%,
      transparent 50%,
      transparent 100%
    ),
    linear-gradient(
      to bottom,
      ${theme.ColorPrimary.B700} 0%,
      ${theme.ColorPrimary.B700} 50%,
      transparent 50%,
      transparent 100%
    );
  background-size: 20px 2px, 20px 2px, 2px 20px, 2px 20px;
  background-repeat: repeat-x, repeat-x, repeat-y, repeat-y;
  background-position: 0 0, 0 100%, 0 0, 100% 0;
`;

export const WorkActiveToolTipText = (theme: Theme) => css`
  ${Typography.Body_S_700}
  color: ${theme.ColorPrimary.B700};
  padding: 12px 16px;
  text-align: center;
  white-space: pre-wrap;
  word-break: keep-all;
`;
