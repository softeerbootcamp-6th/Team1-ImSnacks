import { useState } from 'react';
import type { ReactNode } from 'react';
import S from './MyFarmHeader.style';

interface MyFarmHeaderProps {
  title: string;
  Icon?: ReactNode;
  toolTipContent?: ReactNode;
}

const MyFarmHeader = ({ title, Icon, toolTipContent }: MyFarmHeaderProps) => {
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
          {showTooltip && toolTipContent && (
            <div css={S.Tooltip}>{toolTipContent}</div>
          )}
        </div>
      )}
    </div>
  );
};

export default MyFarmHeader;
