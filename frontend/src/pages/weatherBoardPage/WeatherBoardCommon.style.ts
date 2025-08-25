import { BorderRadius } from '@/styles/borderRadius';
import { customBorderGradientStyles } from '@/styles/customBorderGradientStyles';
import { DropShadow } from '@/styles/effects';
import { Opacity } from '@/styles/colors';
import { Typography } from '@/styles/typography';
import { css } from '@emotion/react';

const WeatherBoardContainer = css`
  border-radius: ${BorderRadius.Base.Hard};
  ${customBorderGradientStyles.gradientBorderDark};
  background: ${Opacity.G900['9o400']};
  ${DropShadow.Ds300};
  width: 100%;
  height: 100%;

  h3 {
    ${Typography.Body_S_400};
  }
  p {
    ${Typography.Subtitle_700};
  }
`;

export default {
  WeatherBoardContainer,
};
