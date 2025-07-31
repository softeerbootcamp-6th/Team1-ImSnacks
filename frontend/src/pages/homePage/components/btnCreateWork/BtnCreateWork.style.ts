import { css } from '@emotion/react';
import { BorderRadius } from '@/styles/borderRadius';
import { Assets, ColorPrimary, GrayScale } from '@/styles/colors';
import { Spacing } from '@/styles/spacing';
import { Typography } from '@/styles/typography';

const SizeSmall = css`
  min-width: 116px;
  height: 44px;
`;

const SizeLarge = css`
  min-width: 146px;
  height: 52px;
`;

const BtnCreateWorkDefault = css`
  background-color: ${GrayScale.G50};
  color: ${Assets.Text.Gnb.Default};

  ${Typography.Body_S}
  ${SizeSmall}
  border-radius: ${BorderRadius.Base.S_Hard};
  padding: ${Spacing.Spacing300} 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 0.5px solid ${GrayScale.G300};
  transition: all 0.1s ease-in-out;
  cursor: pointer;
`;

const BtnCreateWorkHover = css`
  background-color: ${ColorPrimary.B300};
  color: ${GrayScale.White};
  ${SizeLarge}
`;

const BtnCreateWorkDisabled = css`
  background-color: transparent;
  color: transparent;
  cursor: not-allowed;
  pointer-events: none;
  border: 1px dashed ${GrayScale.White};
`;

export const BtnCreateWork = css`
  ${BtnCreateWorkDefault}

  &:hover {
    ${BtnCreateWorkHover}
  }

  &:active {
    ${BtnCreateWorkHover}
  }

  &:disabled {
    ${BtnCreateWorkDisabled}
  }
`;

export default {
  BtnCreateWork,
};
