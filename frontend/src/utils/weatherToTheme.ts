import { ColorTheme } from '@/styles/colors';
import type { WeatherConditionsType } from '@/types/weather.types';

export const weatherToTheme: Record<
  WeatherConditionsType,
  keyof typeof ColorTheme
> = {
  SUNNY: 'Default',
  CLOUDY: 'Dark',
  RAIN: 'Night',
  HEAT_WAVE: 'Hot',
  NIGHT: 'Night',
  CLOUDY_NIGHT: 'Night',
  LESS_CLOUDY: 'Dark',
  STRONG_WIND: 'Dark',
  THUNDER: 'Dark',
  HEAVY_RAIN: 'Dark',
  SNOW: 'Dark',
};
