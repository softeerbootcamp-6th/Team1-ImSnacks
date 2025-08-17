import { GrayScale } from '@/styles/colors';
import { css } from '@emotion/react';

const ContainerWrapper = css`
  width: 100%;
  position: relative;
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

export default { ContainerWrapper, ScrollContainer };
