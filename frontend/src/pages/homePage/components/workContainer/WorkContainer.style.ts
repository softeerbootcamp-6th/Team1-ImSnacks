import { GrayScale } from '@/styles/colors';
import { gradientMask } from '@/styles/gradientMask';
import { css } from '@emotion/react';

const ContainerWrapper = css`
  width: 100%;
  position: relative;
`;

const MaskGradientWrapper = css`
  ${gradientMask('Right', 30)}
`;

const ScrollContainer = css`
  overflow-x: auto;
  overflow-y: hidden;
  position: relative;

  &::-webkit-scrollbar {
    height: 8px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${GrayScale.G50};
    border-radius: 4px;
  }
`;

const LastUpdateText = css`
  position: absolute;
  top: 20px;
  left: 210px;
  font-size: 12px;
  color: ${GrayScale.G300};
  opacity: 0.8;
`;

export default {
  ContainerWrapper,
  ScrollContainer,
  MaskGradientWrapper,
  LastUpdateText,
};
