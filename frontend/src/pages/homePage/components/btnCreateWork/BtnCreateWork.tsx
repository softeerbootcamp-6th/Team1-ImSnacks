import type { ButtonHTMLAttributes, MouseEvent } from 'react';
import S from './BtnCreateWork.style';
import type { RecommendedWorksResponse } from '@/types/openapiGenerator';
import useVisibility from '@/hooks/useVisibility';
import ToolTip from '@/components/toolTip/ToolTip';
import { TOOLTIP_DIRECTIONS, TOOLTIP_TYPES } from '@/types/tooltip.type';
import { css } from '@emotion/react';
import { useTheme } from '@emotion/react';

interface BtnCreateWorkProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  work: RecommendedWorksResponse;
  isDragging?: boolean;
  setSelectedRecommendedWork: (work: RecommendedWorksResponse | null) => void;
}

const BtnCreateWork = ({
  work,
  isDragging = false,
  setSelectedRecommendedWork,
  ...props
}: BtnCreateWorkProps) => {
  const { isVisible, show, hide } = useVisibility();

  const theme = useTheme();

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    setSelectedRecommendedWork(null);

    if (props.onClick) {
      props.onClick(e);
    }
  };

  return (
    <div
      css={css`
        position: relative;
      `}
    >
      <button
        css={S.BtnCreateWork(isDragging, theme)}
        {...props}
        onClick={handleClick}
        onMouseEnter={() => {
          show();
          setSelectedRecommendedWork(work);
        }}
        onMouseLeave={() => {
          hide();
          setSelectedRecommendedWork(null);
        }}
      >
        {work.workName}
      </button>
      {isVisible && (
        <ToolTip
          content={
            <div css={S.BtnCreateWorkTooltip}>
              이웃 작업 현황
              <div css={S.BtnCreateWorkTooltipCount(theme)}>
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
