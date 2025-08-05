import type { ReactNode } from 'react';
import ArrowIcon from '@/assets/icons/flat/Arrow.svg?react';
import S from './ToolTip.style';
import type { TooltipDirectionType, TooltipType } from '@/types/tooltip.type';

interface ToolTipProps {
  direction: TooltipDirectionType;
  content: ReactNode;
  type: TooltipType;
}

const ToolTip = ({ direction, content, type }: ToolTipProps) => {
  return (
    <>
      <div css={S.ToolTip(direction, type)}>
        <ArrowIcon
          css={S.TooltipArrow(direction, type)}
          width={20}
          height={20}
        />
        {content}
      </div>
    </>
  );
};

export default ToolTip;
