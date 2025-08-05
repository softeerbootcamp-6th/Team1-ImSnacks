import type { ReactNode } from 'react';
import S from './MyFarmHeader.style';
import ToolTip from '@/components/toolTip/ToolTip';
import { TOOLTIP_TYPES, type TooltipDirectionType } from '@/types/tooltip.type';
import useHover from '@/hooks/useHover';

interface MyFarmHeaderProps {
  title: string;
  Icon?: ReactNode;
  toolTipContent?: ReactNode;
  toolTipDirection?: TooltipDirectionType;
}

const MyFarmHeader = ({
  title,
  Icon,
  toolTipContent,
  toolTipDirection,
}: MyFarmHeaderProps) => {
  const { isHovered, handleMouseEnter, handleMouseLeave } = useHover();

  return (
    <div css={S.MyFarmHeader}>
      <div>{title}</div>
      {Icon && (
        <div
          css={S.IconContainer}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {Icon}
          {isHovered && toolTipContent && toolTipDirection && (
            <ToolTip
              direction={toolTipDirection}
              content={toolTipContent}
              type={TOOLTIP_TYPES.DEFAULT}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default MyFarmHeader;
