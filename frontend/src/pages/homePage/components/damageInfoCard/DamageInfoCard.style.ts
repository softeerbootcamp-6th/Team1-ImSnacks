import { BorderRadius } from '@/styles/borderRadius';
import { Opacity } from '@/styles/colors';
import { customBorderGradientStyles } from '@/styles/customBorderGradientStyles';
import { Spacing } from '@/styles/spacing';
import { css } from '@emotion/react';

const DamageInfoCard = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 342px;
  height: 218px;
  padding: ${Spacing.Spacing600} ${Spacing.Spacing700};
  flex-shrink: 0;
  gap: 8px;
  box-sizing: border-box;

  border-radius: ${BorderRadius.Base.Soft};
  ${customBorderGradientStyles.gradientBorder}
  background: ${Opacity.White.W500};
`;

export default {
  DamageInfoCard,
};
