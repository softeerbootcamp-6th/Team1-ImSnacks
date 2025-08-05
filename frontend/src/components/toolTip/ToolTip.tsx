import { BorderRadius } from '@/styles/borderRadius';
import { GrayScale } from '@/styles/colors';
import { Spacing } from '@/styles/spacing';
import { css } from '@emotion/react';
import type { ReactNode } from 'react';

interface ToolTipProps {
  direction: 'top' | 'bottom' | 'left' | 'right';
  content: ReactNode;
}

const ToolTip = ({ direction, content }: ToolTipProps) => {
  return (
    <div>
      <div
        css={css`
          position: absolute;
          width: 30px;
          height: 30px;
          background-color: red;
          top: 15px;
          left: 15px;
        `}
      ></div>
      <div
        css={css`
          position: absolute;
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
        {direction}
      </div>
    </div>
  );
};

export default ToolTip;
