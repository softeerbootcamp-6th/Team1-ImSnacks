import type { ButtonHTMLAttributes } from 'react';
import S from './BtnCreateWork.style';
import type { RecommendedWorksResponse } from '@/types/openapiGenerator';
import useVisibility from '@/hooks/useVisibility';
import ToolTip from '@/components/toolTip/ToolTip';
import { TOOLTIP_DIRECTIONS, TOOLTIP_TYPES } from '@/types/tooltip.type';
import { css } from '@emotion/react';
import { Typography } from '@/styles/typography';
import { ColorPrimary } from '@/styles/colors';
import { BorderRadius } from '@/styles/borderRadius';

interface BtnCreateWorkProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  work: RecommendedWorksResponse;
  isDragging?: boolean;
}

const BtnCreateWork = ({
  work,
  isDragging = false,
  ...props
}: BtnCreateWorkProps) => {
  const { isVisible, show, hide } = useVisibility();

  return (
    <div
      css={css`
        position: relative;
      `}
    >
      <button
        css={S.BtnCreateWork(isDragging)}
        {...props}
        onMouseEnter={show}
        onMouseLeave={hide}
      >
        {work.workName}
      </button>
      {isVisible && (
        <ToolTip
          content={
            <div
              css={css`
                ${Typography.Body_S_400}
                display: flex;
                flex-direction: row;
                align-items: center;
                gap: 4px;
              `}
            >
              이웃 작업 현황{' '}
              <div
                css={css`
                  ${Typography.Body_S_700}
                  background-color: ${ColorPrimary.B400};
                  border-radius: ${BorderRadius.Base.Round};
                  box-sizing: border-box;
                  padding: 4px 8px;
                  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
                `}
              >
                {work.neighborCount || 0}
              </div>
            </div>
          }
          direction={TOOLTIP_DIRECTIONS.TOP}
          type={TOOLTIP_TYPES.NEIGHBOR}
        />
      )}
    </div>
  );
};

export default BtnCreateWork;
