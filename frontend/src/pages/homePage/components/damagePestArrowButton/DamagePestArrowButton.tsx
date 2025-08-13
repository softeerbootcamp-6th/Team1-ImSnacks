import { LeftArrowCircleBtn, RightArrowCircleBtn } from '@/assets/icons/flat';
import S from './DamagePestArrowButton.style';
import type { ButtonHTMLAttributes } from 'react';
import ToolTip from '@/components/toolTip/ToolTip';
import { TOOLTIP_DIRECTIONS } from '@/types/tooltip.type';
import useVisibility from '@/hooks/useVisibility';
import { css } from '@emotion/react';

const DamagePestArrowButton = ({
  isWeatherVisible,
  ...props
}: { isWeatherVisible: boolean } & ButtonHTMLAttributes<HTMLButtonElement>) => {
  const { isVisible, show, hide } = useVisibility();

  return (
    <div
      css={css`
        position: relative;
        ${isWeatherVisible ? 'margin-left: 32px;' : 'margin-right: 32px;'}
      `}
    >
      <button
        css={S.DamagePestArrowButton}
        onMouseEnter={show}
        onMouseLeave={hide}
        {...props}
      >
        {isWeatherVisible ? (
          <RightArrowCircleBtn width={28} height={28} />
        ) : (
          <LeftArrowCircleBtn width={28} height={28} />
        )}
      </button>
      {isVisible && (
        <ToolTip
          direction={TOOLTIP_DIRECTIONS.BOTTOM}
          content={
            isWeatherVisible
              ? '병충해 정보를 확인할 수 있어요'
              : '주의해야 할 기상 피해 정보를 볼 수 있어요'
          }
          type={'Default'}
        />
      )}
    </div>
  );
};

export default DamagePestArrowButton;
