import type { GetWeatherGraphResponseWeatherMetricEnum } from '@/types/openapiGenerator';
import { WEATHER_METRICS } from '@/types/weather.types';

const WEATHER_UNIT = {
  [WEATHER_METRICS.PRECIPITATION]: 'mm',
  [WEATHER_METRICS.TEMPERATURE]: '°C',
  [WEATHER_METRICS.HUMIDITY]: '%',
  [WEATHER_METRICS.WIND_SPEED]: 'm/s',
};

export const getWeatherUnit = (
  metric: GetWeatherGraphResponseWeatherMetricEnum
) => {
  return WEATHER_UNIT[metric] || '';
};
