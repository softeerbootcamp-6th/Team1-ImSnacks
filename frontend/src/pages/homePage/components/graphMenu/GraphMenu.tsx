import GraphMenuTab from '../graphMenuTab/GraphMenuTab';
import S from './GraphMenu.styles';

const MENULIST = [
  {
    title: '강수량',
    icon: 'IC24Rain.svg',
  },
  {
    title: '기온',
    icon: 'IC24Temperature.svg',
  },
  {
    title: '습도',
    icon: 'IC24Humidity.svg',
  },
  {
    title: '풍속',
    icon: 'IC24Wind.svg',
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
