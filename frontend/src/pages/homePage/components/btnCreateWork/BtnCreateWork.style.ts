import { css } from '@emotion/react';
import { BorderRadius } from '@/styles/borderRadius';
import { Assets, ColorPrimary, GrayScale } from '@/styles/colors';
import { Spacing } from '@/styles/spacing';
import { Typography } from '@/styles/typography';

const sizeSmallStyle = css`
  min-width: 116px;
  height: 44px;
`;

const sizeLargeStyle = css`
  min-width: 146px;
  height: 52px;
`;

const defaultStyle = css`
  background-color: ${GrayScale.G50};
  color: ${Assets.Text.Gnb.Default};
`;

const hoverStyle = css`
  background-color: ${ColorPrimary.B300};
  color: ${GrayScale.White};
  ${sizeLargeStyle}
`;

const disabledStyle = css`
  background-color: transparent;
  color: transparent;
  cursor: not-allowed;
  pointer-events: none;
  border: 1px dashed ${GrayScale.White};
`;

const baseStyle = css`
  ${Typography.Body_S}
  ${sizeSmallStyle}
  border-radius: ${BorderRadius.Base.S_Hard};
  padding: ${Spacing.Spacing300} 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 0.5px solid ${GrayScale.G300};
  transition: all 0.1s ease-in-out;
  cursor: pointer;
`;

export const BtnCreateWorkStyle = css`
  ${baseStyle}
  ${defaultStyle}

  &:hover {
    ${hoverStyle}
  }

  &:active {
    ${hoverStyle}
  }

  &:disabled {
    ${disabledStyle}
  }
`;

export default {
  BtnCreateWorkStyle,
};
