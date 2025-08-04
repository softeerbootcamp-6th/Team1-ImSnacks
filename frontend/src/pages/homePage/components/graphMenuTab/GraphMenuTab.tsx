import { FLAT_ICON } from '@/constants/flatIcons';
import S from './GraphMenuTab.style';
import { Assets } from '@/styles/colors';

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
        <FlatIconComponent
          width={24}
          height={24}
          color={isActive ? '#FFFFFF' : Assets.Global.Button.Default}
        />
      )}
      {isActive && <span>{title}</span>}
    </button>
  );
};

export default GraphMenuTab;
