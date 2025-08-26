import { css } from '@emotion/react';
import { BorderRadius } from '@/styles/borderRadius';
import { Assets, GrayScale } from '@/styles/colors';
import { Spacing } from '@/styles/spacing';
import { Typography } from '@/styles/typography';
import type { Theme } from '@emotion/react';

const BtnSize = css`
  min-width: 116px;
  height: 44px;
`;

const BtnCreateWorkDefault = css`
  background-color: ${GrayScale.G50};
  color: ${Assets.Text.Gnb.Default};
`;

const BtnCreateWorkHover = (theme: Theme) => css`
  background-color: ${theme.ColorPrimary.B300};
  color: ${GrayScale.White};
  transform: scale(1.1) translateY(-2px);
  z-index: 1000;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);

  ${Typography.Body_M_400}
`;

const BtnCreateWorkDisabled = css`
  background-color: transparent;
  color: transparent;
  cursor: not-allowed;
  pointer-events: none;
  border: 1px dashed ${GrayScale.White};
`;

const BtnCreateWorkBase = (isDragging: boolean = false) => css`
  ${Typography.Body_S_400}
  ${BtnSize}
  border-radius: ${BorderRadius.Base.S_Hard};
  padding: ${Spacing.Spacing300} 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: ${isDragging ? 'grabbing' : 'grab'};
  user-select: none;
  opacity: ${isDragging ? 0.7 : 1};
  transform: ${isDragging ? 'scale(0.95)' : 'scale(1)'};
  position: relative;

  &:active {
    cursor: grabbing;
  }
`;

export const BtnCreateWork = (isDragging: boolean = false, theme: Theme) => css`
  ${BtnCreateWorkBase(isDragging)}
  ${BtnCreateWorkDefault}

  &:hover {
    ${BtnCreateWorkHover(theme)}
  }

  &:active {
    ${BtnCreateWorkHover(theme)}
  }

  &:disabled {
    ${BtnCreateWorkDisabled}
  }
`;

const BtnCreateWorkTooltip = css`
  ${Typography.Body_S_400}
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;
`;

const BtnCreateWorkTooltipCount = (theme: Theme) => css`
  ${Typography.Body_S_700}
  background-color: ${theme.Assets.Global.Button.Pressed};
  border-radius: ${BorderRadius.Base.Round};
  box-sizing: border-box;
  padding: 4px 8px;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export default {
  BtnCreateWork,
  BtnCreateWorkTooltip,
  BtnCreateWorkTooltipCount,
};
