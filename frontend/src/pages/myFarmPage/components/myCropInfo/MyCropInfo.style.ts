import { Spacing } from '@/styles/spacing';
import { css } from '@emotion/react';

const MyCropInfoContainer = css`
  display: flex;
  flex-direction: column;
  min-height: 260px;
`;

const CropInfoCardContainer = css`
  display: flex;
  flex-direction: row;
  gap: ${Spacing.Spacing700};
  flex-wrap: wrap;
`;

export default {
  MyCropInfoContainer,
  CropInfoCardContainer,
};
