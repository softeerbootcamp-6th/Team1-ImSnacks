import type { ReactNode } from 'react';
import { ArrowIcon } from '@/assets/icons/flat';
import S from './ToolTip.style';
import type { TooltipDirectionType, TooltipType } from '@/types/tooltip.type';

interface ToolTipProps {
  direction: TooltipDirectionType;
  content: ReactNode;
  type: TooltipType;
  offset?: number;
  isAbsolute?: boolean;
}

const ToolTip = ({
  direction,
  content,
  type,
  offset,
  isAbsolute = true,
}: ToolTipProps) => {
  return (
    <div css={S.ToolTip(direction, type, offset, isAbsolute)}>
      <ArrowIcon css={S.TooltipArrow(direction, type)} width={20} height={20} />
      {content}
    </div>
  );
};

export default ToolTip;
