import { css } from '@emotion/react';
import { gradientStyles } from './gradientStyles';

export const customBorderGradientStyles = {
  gradientBorder: css`
    position: relative;
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      padding: 1px;
      ${gradientStyles.cardStrokeAngular}
      border-radius: inherit;

      pointer-events: none;
      -webkit-mask: linear-gradient(#fff 0 0) content-box,
        linear-gradient(#fff 0 0);
      -webkit-mask-composite: destination-out;
      mask-composite: exclude;
    }
  `,
  gradientBorderDark: css`
    position: relative;
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      padding: 1px;
      ${gradientStyles.cardStrokeDarkAngular}
      border-radius: inherit;
      -webkit-mask: linear-gradient(#fff 0 0) content-box,
        linear-gradient(#fff 0 0);
      -webkit-mask-composite: destination-out;
      mask-composite: exclude;
    }
  `,
};
