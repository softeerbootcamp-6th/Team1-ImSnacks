import { FLAT_ICON } from '@/constants/flatIcons';
import S from './GraphMenuTab.style';
import type { WeatherMetrics } from '@/types/weather.types';

interface GraphMenuTabProps {
  title: string;
  weatherMetric: WeatherMetrics;
  currentTab: WeatherMetrics;
  setCurrentTab: (tab: WeatherMetrics) => void;
}

const GraphMenuTab = ({
  title,
  weatherMetric,
  currentTab,
  setCurrentTab,
}: GraphMenuTabProps) => {
  const isActive = currentTab === weatherMetric;
  const FlatIconComponent = FLAT_ICON[title];

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setCurrentTab(weatherMetric);
  };

  return (
    <button
      onClick={handleClick}
      css={isActive ? S.GraphMenuTabActive : S.GraphMenuTabDefault}
    >
      {FlatIconComponent && <FlatIconComponent width={24} height={24} />}
      {isActive && <span>{title}</span>}
    </button>
  );
};

export default GraphMenuTab;
