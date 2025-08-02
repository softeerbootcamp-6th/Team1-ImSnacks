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

export default {
  MyFarmHeader,
};
