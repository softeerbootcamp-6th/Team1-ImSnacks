import { WEATHER_METRICS } from '@/types/weather.types';

export const GRAPH_MENU_LIST = [
  {
    title: '강수량',
    weatherMetric: WEATHER_METRICS.PRECIPITATION,
  },
  {
    title: '기온',
    weatherMetric: WEATHER_METRICS.TEMPERATURE,
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
