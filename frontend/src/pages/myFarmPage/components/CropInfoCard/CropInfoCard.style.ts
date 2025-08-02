import { css } from '@emotion/react';
import { GrayScale, Opacity } from '@/styles/colors';
import { Spacing } from '@/styles/spacing';
import { Typography } from '@/styles/typography';
import { Assets } from '@/styles/colors';
import { BorderRadius } from '@/styles/borderRadius';
import { borderStyles } from '@/styles/customBorderGradientStyles';

const CropInfoCard = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 314px;
  height: 192px;
  border-radius: ${BorderRadius.Base.Hard};
  ${borderStyles.gradientBorder}
  background-color: ${Opacity.White.W100};
  padding: ${Spacing.Spacing500};
  gap: ${Spacing.Spacing300};
  box-sizing: border-box;
`;

const CropIcon = css`
  width: 100px;
  height: 100px;
  border-radius: ${BorderRadius.Base.Hard};
  background-color: ${GrayScale.White};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CropInfo = css`
  width: 162px;
  height: 64px;
  gap: ${Spacing.Spacing200};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`;

const CropName = css`
  ${Typography.Body_L_700}
  color: ${Assets.Text.CropInfoCard.Headline};
`;

export const CropInfoWrapper = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  gap: ${Spacing.Spacing600};
`;

export const CropDateWrapper = css`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-end;
  width: 100%;
  gap: ${Spacing.Spacing200};
`;

export const CropDateDescription = css`
  ${Typography.Caption_S}
  color: ${Assets.Text.CropInfoCard.Body};
`;

export const CropDate = css`
  ${Typography.Subtitle_700}
  color: ${Assets.Text.CropInfoCard.Headline};
`;

export default {
  CropInfoCard,
  CropInfoWrapper,
  CropIcon,
  CropInfo,
  CropName,
  CropDate,
  CropDateDescription,
  CropDateWrapper,
};
