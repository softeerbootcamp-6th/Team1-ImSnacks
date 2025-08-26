import { Spacing } from '@/styles/spacing';
import { Typography } from '@/styles/typography';
import { GrayScale } from '@/styles/colors';
import { css } from '@emotion/react';

const MyFarmHeader = css`
  height: 52px;
  gap: ${Spacing.Spacing200};
  padding: ${Spacing.Spacing300};
  ${Typography.Subtitle_500};
  color: ${GrayScale.White};
  display: flex;
  align-items: center;
  justify-content: flex-start;
  ${Typography.Subtitle_500};
`;

const IconContainer = css`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const Tooltip = css`
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  background-color: ${GrayScale.G900};
  color: ${GrayScale.White};
  padding: ${Spacing.Spacing200} ${Spacing.Spacing300};
  border-radius: 4px;
  font-size: 12px;
  white-space: nowrap;
  z-index: 1000;
  margin-top: 4px;

  &::before {
    content: '';
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    border: 4px solid transparent;
    border-bottom-color: ${GrayScale.G900};
  }
`;

export default {
  MyFarmHeader,
  IconContainer,
  Tooltip,
};
