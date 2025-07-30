import { css } from '@emotion/react';
import { Spacing } from '../../styles/spacing';
import { GrayScale, Opacity } from '../../styles/colors';
import { BackgroundBlur } from '../../styles/effects';

const NavBarWrapper = css`
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
  width: 596px;
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
  padding: 0 16px 0 20px;
  align-items: center;
`;

const LogoImage = css`
  display: flex;
  padding: 4px;
  align-items: center;
  width: 24px;
  height: 24px;
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
  LogoImage,
};
