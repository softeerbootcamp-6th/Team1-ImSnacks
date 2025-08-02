import { BorderRadius } from '@/styles/borderRadius';
import { GrayScale } from '@/styles/colors';
import { Spacing } from '@/styles/spacing';
import { css } from '@emotion/react';
import type { ReactNode } from 'react';

interface ToolTipProps {
  direction: 'top' | 'bottom' | 'left' | 'right';
  content: ReactNode;
}

//TODO: shadow
const ToolTip = ({ direction, content }: ToolTipProps) => {
  return (
    <div
      css={css`
        min-height: 36px;
        padding: ${Spacing.Spacing300};
        background-color: ${GrayScale.White};
        border-radius: ${BorderRadius.Base.S_Hard};
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: center;
      `}
    >
      {content}
    </div>
  );
};

export default ToolTip;
