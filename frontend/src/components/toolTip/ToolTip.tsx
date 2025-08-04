import type { ReactNode } from 'react';
import ArrowIcon from '@/assets/icons/flat/Arrow.svg?react';
import S from './ToolTip.style';
import type { TooltipDirectionType } from '@/types/tooltip.type';

interface ToolTipProps {
  direction: TooltipDirectionType;
  content: ReactNode;
}

const ToolTip = ({ direction, content }: ToolTipProps) => {
  return (
    <>
      <div css={S.ToolTip(direction)}>
        <ArrowIcon
          css={S.TooltipArrowPosition(direction)}
          width={20}
          height={20}
        />
        {content}
      </div>
    </>
  );
};

export default ToolTip;
