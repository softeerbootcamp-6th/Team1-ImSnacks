import GraphMenuTab from '../graphMenuTab/GraphMenuTab';
import S from './GraphMenu.style';
import { MENU_LIST } from '@/constants/graphMenu';

interface GraphMenuProps {
  tabIndex: number;
  setTabIndex: (index: number) => void;
}
const GraphMenu = ({ tabIndex, setTabIndex }: GraphMenuProps) => {
  return (
    <div css={S.GraphMenu}>
      {MENU_LIST.map((item, index) => (
        <GraphMenuTab
          key={index}
          {...item}
          tabIndex={tabIndex}
          setTabIndex={setTabIndex}
          index={index}
        />
      ))}
    </div>
  );
};
export default GraphMenu;
