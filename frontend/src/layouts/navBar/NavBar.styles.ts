import { css } from '@emotion/react';
import { Spacing } from '@/styles/spacing';
import { Opacity } from '@/styles/colors';
import { BackgroundBlur } from '@/styles/effects';
import { customBorderGradientStyles } from '@/styles/customBorderGradientStyles';

const NavBarWrapper = (isWeatherPage: boolean) => css`
  ${isWeatherPage
    ? customBorderGradientStyles.gradientBorderDark
    : customBorderGradientStyles.gradientBorder}
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
  width: 596px;
  height: 52px;
  overflow: hidden;
  padding: ${Spacing.Spacing200};
  justify-content: center;
  align-items: center;
  gap: ${Spacing.Spacing300};
  border-radius: 32px;
  background: ${Opacity.White.W400};

  ${BackgroundBlur.BgBlur100}
  z-index: 1000;
  position: fixed;
  top: 56px;
  left: 50%;
  transform: translateX(-50%);
`;

const LogoStyle = css`
  display: flex;
  width: 60px;
  padding-left: 4px;
  box-sizing: border-box;
  align-items: center;
`;

const NavBarContent = css`
  display: flex;
  flex-direction: row;
  gap: ${Spacing.Spacing300};
`;

export default {
  NavBarWrapper,
  NavBarContent,
  LogoStyle,
};
