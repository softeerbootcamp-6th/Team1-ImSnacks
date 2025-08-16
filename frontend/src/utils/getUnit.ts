import { WEATHER_METRICS, type WeatherMetrics } from '@/types/weather.types';

const WEATHER_UNIT = {
  [WEATHER_METRICS.PERCIPITATION]: 'mm',
  [WEATHER_METRICS.TEMPERATURE]: '°',
  [WEATHER_METRICS.HUMIDITY]: '%',
  [WEATHER_METRICS.WIND_SPEED]: 'm/s',
};

export const getUnit = (metric: WeatherMetrics) => {
  return WEATHER_UNIT[metric] || '';
};
