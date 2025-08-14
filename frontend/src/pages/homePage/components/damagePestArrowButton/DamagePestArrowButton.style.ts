import { css } from '@emotion/react';
import { customBorderGradientStyles } from '@/styles/customBorderGradientStyles';
import { Opacity } from '@/styles/colors';
import { BorderRadius } from '@/styles/borderRadius';

const DamagePestArrowButton = css`
  width: 68px;
  height: 218px;
  flex-shrink: 0;
  border-radius: ${BorderRadius.Base.Soft};
  ${customBorderGradientStyles.gradientBorder};
  background: ${Opacity.White.W200};

  &:hover {
    background: ${Opacity.White.W400};
  }

  &:active {
    background: ${Opacity.White.W600};
  }
`;

export default {
  DamagePestArrowButton,
};
