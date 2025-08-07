import type { WeatherMetrics } from '@/types/weather.types';

const WEATHER_UNIT = {
  precipitation: 'mm',
  temperature: '°C',
  humidity: '%',
  windSpeed: 'm/s',
};

export const getUnit = (metric: WeatherMetrics) => {
  return WEATHER_UNIT[metric] || '';
};
