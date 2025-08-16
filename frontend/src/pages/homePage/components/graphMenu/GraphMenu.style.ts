import { customBorderGradientStyles } from '@/styles/customBorderGradientStyles';
import { DropShadow } from '@/styles/effects';
import { Spacing } from '@/styles/spacing';
import { css } from '@emotion/react';

const GraphMenu = css`
  display: inline-flex;
  padding: ${Spacing.Spacing200};
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: ${Spacing.Spacing200};

  border-radius: 200px;
  ${customBorderGradientStyles.gradientBorder}
  background: rgba(255, 255, 255, 0.4);

  ${DropShadow.Ds200};

  position: absolute;
  top: 0;
  left: 0;
  z-index: 999;
`;

export default {
  GraphMenu,
};
