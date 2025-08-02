import { FLAT_ICON } from '@/constants/flatIcons';
import S from './GraphMenuTab.styles';
import { Assets } from '@/styles/colors';
import { css } from '@emotion/react';

interface GraphMenuTabProps {
  title: string;
  index: number;
  tabIndex: number;
  setTabIndex: (index: number) => void;
}

const GraphMenuTab = ({
  title,
  index,
  tabIndex,
  setTabIndex,
}: GraphMenuTabProps) => {
  const isActive = tabIndex === index;
  const FlatIconComponent = FLAT_ICON[title];

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setTabIndex(index);
  };

  return (
    <button
      onClick={handleClick}
      css={isActive ? S.GraphMenuTabActive : S.GraphMenuTabDefault}
    >
      {FlatIconComponent && (
        <div
          css={css`
            svg path {
              fill: ${isActive
                ? '#FFFFFF'
                : Assets.Global.Button.Default} !important;
            }
            button:hover & svg path {
              fill: ${isActive ? '#FFFFFF' : '#FFFFFF'} !important;
            }
            display: flex;
            align-items: center;
            justify-content: center;
          `}
        >
          <FlatIconComponent width={24} height={24} />
        </div>
      )}
      {isActive && <span>{title}</span>}
    </button>
  );
};

export default GraphMenuTab;
