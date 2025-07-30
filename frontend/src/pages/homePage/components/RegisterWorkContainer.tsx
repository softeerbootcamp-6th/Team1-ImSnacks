import { css } from '@emotion/react';
import { GrayScale } from '@/styles/colors';
import { Spacing } from '@/styles/spacing';
import convertHexToRGBA from '@/utils/converHexToRGBA';
import { borderStyles } from '@/styles/borderStyles';

const RegisterWorkContainer = () => {
  return (
    <div
      css={css`
        width: 1328px;
        height: 137px;
        border-radius: 16px;
        padding: ${Spacing.Spacing600} ${Spacing.Spacing800};
        background: ${convertHexToRGBA(GrayScale.White, 0.6)};
        ${borderStyles.gradientBorder}
      `}
    >
      RegisterWorkContainer
    </div>
  );
};

export default RegisterWorkContainer;
