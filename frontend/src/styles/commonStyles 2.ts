import { css } from '@emotion/react';
import { BorderRadius } from './borderRadius';
import { Opacity } from './colors';
import { customBorderGradientStyles } from './customBorderGradientStyles';
import { DropShadow } from './effects';
import { Typography } from './typography';

export const CommonStyles = {
  // 날씨 정보 페이지 시각화 컨테이너
  weatherBoardContainer: css`
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
  `,
};

export const FlexStyles = {
  flexRow: css`
    display: flex;
    flex-direction: row;
    align-items: center;
  `,

  flexColumn: css`
    display: flex;
    flex-direction: column;
    align-items: center;
  `,
};
