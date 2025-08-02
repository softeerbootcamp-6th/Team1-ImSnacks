import { BorderRadius } from '@/styles/borderRadius';
import { GrayScale } from '@/styles/colors';
import { Spacing } from '@/styles/spacing';
import { css } from '@emotion/react';
import type { ReactNode } from 'react';

//TODO: shadow
const ToolTip = (
  direction: 'top' | 'bottom' | 'left' | 'right',
  content: ReactNode
) => {
  return (
    <div
      css={css`
        padding: ${Spacing.Spacing300};
        background-color: ${GrayScale.White};
        border-radius: ${BorderRadius.Base.S_Hard};
      `}
    >
      {content}
    </div>
  );
};

export default ToolTip;
