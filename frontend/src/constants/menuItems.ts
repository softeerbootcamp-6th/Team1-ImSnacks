import { WEATHER_METRICS } from '@/types/weather.types';

export const GRAPH_MENU_LIST = [
  {
    title: '기온',
    weatherMetric: WEATHER_METRICS.TEMPERATURE,
  },
  {
    title: '강수량',
    weatherMetric: WEATHER_METRICS.PRECIPITATION,
  },
  {
    title: '습도',
    weatherMetric: WEATHER_METRICS.HUMIDITY,
  },
  {
    title: '풍속',
    weatherMetric: WEATHER_METRICS.WIND_SPEED,
  },
];

export const NAV_ITEMS = [
  { title: '홈', path: '/' },
  { title: '날씨 정보', path: '/weather-board' },
  { title: '내 농장', path: '/my-farm' },
];
