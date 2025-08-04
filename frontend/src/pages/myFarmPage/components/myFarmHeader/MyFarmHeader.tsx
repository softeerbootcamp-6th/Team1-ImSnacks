import { useState } from 'react';
import type { ReactNode } from 'react';
import S from './MyFarmHeader.style';
import ToolTip from '@/components/toolTip/ToolTip';
import type { TooltipDirectionType } from '@/types/tooltip.type';

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
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div css={S.MyFarmHeader}>
      <div>{title}</div>
      {Icon && (
        <div
          css={S.IconContainer}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          {Icon}
          {showTooltip && toolTipContent && toolTipDirection && (
            <ToolTip direction={toolTipDirection} content={toolTipContent} />
          )}
        </div>
      )}
    </div>
  );
};

export default MyFarmHeader;
