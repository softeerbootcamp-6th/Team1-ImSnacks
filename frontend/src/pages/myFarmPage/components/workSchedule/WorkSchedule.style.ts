import { css } from '@emotion/react';
import { Spacing } from '@/styles/spacing';
import { BorderRadius } from '@/styles/borderRadius';
import { customBorderGradientStyles } from '@/styles/customBorderGradientStyles';
import { GrayScale, Opacity } from '@/styles/colors';
import { Typography } from '@/styles/typography';

const WorkScheduleContainer = css`
  display: flex;
  flex-direction: column;
`;

const WorkScheduleContent = (isExpanded: boolean) => css`
  display: flex;
  flex-direction: column;
  border-radius: ${BorderRadius.Base.S_Hard};
  ${customBorderGradientStyles.gradientBorder}
  padding: ${Spacing.Spacing300};
  gap: ${Spacing.Spacing300};
  ${isExpanded ? 'min-height: 770px;' : 'height: 770px;'}

  background-color: ${Opacity.White.W100};

  position: relative;
`;

const WorkScheduleHeader = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${Typography.Body_L_500}
  color: ${GrayScale.White};
  padding: 0 ${Spacing.Spacing400} 0 ${Spacing.Spacing400};
`;

export default {
  WorkScheduleContainer,
  WorkScheduleContent,
  WorkScheduleHeader,
};
