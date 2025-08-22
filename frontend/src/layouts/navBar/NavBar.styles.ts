import { css } from '@emotion/react';
import { Spacing } from '@/styles/spacing';
import { Opacity } from '@/styles/colors';
import { BackgroundBlur } from '@/styles/effects';
import { customBorderGradientStyles } from '@/styles/customBorderGradientStyles';

const NavBarWrapper = (isWeatherPage: boolean, isVisible: boolean) => css`
  ${isWeatherPage
    ? css`
        ${customBorderGradientStyles.gradientBorderDark}
        background-color: ${Opacity.G800['8o200']};
      `
    : css`
        ${customBorderGradientStyles.gradientBorder}
        background-color: ${Opacity.White.W400};
      `}

  display: flex;
  flex-direction: row;
  box-sizing: border-box;
  width: 468px;
  height: 52px;
  overflow: hidden;
  padding: ${Spacing.Spacing200};
  justify-content: center;
  align-items: center;
  gap: ${Spacing.Spacing300};
  border-radius: 32px;

  ${BackgroundBlur.BgBlur100}
  z-index: 1000;
  position: fixed;

  top: 56px;
  left: 50%;
  transform: translateX(-50%)
    ${isVisible ? 'translateY(0)' : 'translateY(-300%)'};

  opacity: ${isVisible ? 1 : 0};
  transition: transform 1s ease-in-out, opacity 0.3s ease-in-out;
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
