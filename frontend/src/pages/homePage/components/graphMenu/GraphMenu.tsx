import type { WeatherMetrics } from '@/types/weather.types';
import GraphMenuTab from '../graphMenuTab/GraphMenuTab';
import S from './GraphMenu.style';
import { MENU_LIST } from '@/constants/graphMenu';

interface GraphMenuProps {
  currentTab: WeatherMetrics;
  setCurrentTab: (tab: WeatherMetrics) => void;
}
const GraphMenu = ({ currentTab, setCurrentTab }: GraphMenuProps) => {
  return (
    <div css={S.GraphMenu}>
      {MENU_LIST.map(item => (
        <GraphMenuTab
          key={item.weatherMetric}
          {...item}
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
        />
      ))}
    </div>
  );
};
export default GraphMenu;
