import { customBorderGradientStyles } from '@/styles/customBorderGradientStyles';
import { Assets, Opacity } from '@/styles/colors';
import { Spacing } from '@/styles/spacing';
import { Typography } from '@/styles/typography';
import { css } from '@emotion/react';

const RegisterWorkContainer = css`
  width: 1328px;
  height: 137px;
  border-radius: 16px;
  padding: ${Spacing.Spacing600} ${Spacing.Spacing800};
  background: ${Opacity.White.W600};
  ${customBorderGradientStyles.gradientBorder}
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: ${Spacing.Spacing600};
  margin-bottom: ${Spacing.Spacing600};
`;

const TextBoxTitle = css`
  ${Typography.Subtitle_700}
  color: ${Assets.Text.Global.Headline};
`;

const TextBoxDescription = css`
  ${Typography.Body_S_400}
  color: ${Assets.Text.Global.Caption};
`;

const TextBox = css`
  display: flex;
  flex-direction: column;
  gap: ${Spacing.Spacing300};
`;

const BtnBox = css`
  display: flex;
  flex-direction: column;
  gap: ${Spacing.Spacing500};
  padding-right: ${Spacing.Spacing800};
  height: 88px;
  width: 644px;
`;

const BtnSelectChipContainer = css`
  display: flex;
  flex-direction: row;
  gap: ${Spacing.Spacing300};
`;

const BtnCreateWorkContainer = css`
  display: flex;
  flex-direction: row;
  gap: ${Spacing.Spacing300};
  height: 52px;
`;

export default {
  RegisterWorkContainer,
  TextBoxTitle,
  TextBoxDescription,
  TextBox,
  BtnBox,
  BtnSelectChipContainer,
  BtnCreateWorkContainer,
};
