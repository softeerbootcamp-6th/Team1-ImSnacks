import { BorderRadius } from '@/styles/borderRadius';
import { Opacity } from '@/styles/colors';
import { customBorderGradientStyles } from '@/styles/customBorderGradientStyles';
import { Spacing } from '@/styles/spacing';
import { Typography } from '@/styles/typography';
import { Assets } from '@/styles/colors';
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

const DamageInfoCardTitle = css`
  ${Typography.Body_L_700};
  color: ${Assets.Text.Global.Headline};
`;

const DamageInfoCardContent = css`
  ${Typography.Body_M_400};
  color: ${Assets.Text.Global.Headline};
`;

const DamagaMyCropsContainer = css`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
`;

export default {
  DamageInfoCard,
  DamageInfoCardTitle,
  DamageInfoCardContent,
  DamagaMyCropsContainer,
};
