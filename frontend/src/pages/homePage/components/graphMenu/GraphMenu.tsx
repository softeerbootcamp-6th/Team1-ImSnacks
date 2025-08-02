import GraphMenuTab from '../graphMenuTab/GraphMenuTab';
import S from './GraphMenu.styles';

const MENULIST = [
  {
    title: '강수량',
  },
  {
    title: '기온',
  },
  {
    title: '습도',
  },
  {
    title: '풍속',
  },
];

interface GraphMenuProps {
  tabIndex: number;
  setTabIndex: (index: number) => void;
}
const GraphMenu = ({ tabIndex, setTabIndex }: GraphMenuProps) => {
  return (
    <div css={S.GraphMenu}>
      {MENULIST.map((item, index) => (
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
