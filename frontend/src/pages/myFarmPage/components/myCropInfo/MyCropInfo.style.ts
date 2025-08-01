import { Spacing } from '@/styles/spacing';
import { Typography } from '@/styles/typography';
import { GrayScale } from '@/styles/colors';
import { css } from '@emotion/react';

const MyCropInfoContainer = css`
  display: flex;
  flex-direction: column;
`;

const MyCropInfoHeader = css`
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

const CropInfoCardContainer = css`
  display: flex;
  flex-direction: row;
  gap: ${Spacing.Spacing700};
  flex-wrap: wrap;
`;

export default {
  MyCropInfoContainer,
  MyCropInfoHeader,
  CropInfoCardContainer,
};
