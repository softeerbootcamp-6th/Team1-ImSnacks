import type { WeatherMetrics } from '@/types/weather.types';

export const getUnit = (metric: WeatherMetrics) => {
  switch (metric) {
    case 'precipitation':
      return 'mm';
    case 'temperature':
      return '°C';
    case 'humidity':
      return '%';
    case 'windSpeed':
      return 'm/s';
    default:
      return '';
  }
};
