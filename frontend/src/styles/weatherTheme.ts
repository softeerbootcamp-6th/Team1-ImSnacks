import { ColorTheme } from '@/styles/colors';
import type { WeatherConditionsType } from '@/types/weather.types';
import { gradientStyles } from '@/styles/gradientStyles';
import type { SerializedStyles } from '@emotion/react';

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

export const backgroundTheme: Record<WeatherConditionsType, SerializedStyles> =
  {
    SUNNY: gradientStyles.backgroundAfternoonClear,
    LESS_CLOUDY: gradientStyles.backgroundAfternoonCloudy,
    CLOUDY: gradientStyles.backgroundAfternoonCloudy,
    STRONG_WIND: gradientStyles.backgroundAfternoonCloudy,
    THUNDER: gradientStyles.backgroundAfternoonCloudy,
    RAIN: gradientStyles.backgroundAfternoonCloudy,
    HEAVY_RAIN: gradientStyles.backgroundAfternoonCloudy,
    SNOW: gradientStyles.backgroundAfternoonCloudy,
    NIGHT: gradientStyles.backgroundNightClear,
    CLOUDY_NIGHT: gradientStyles.backgroundNightClear,
    HEAT_WAVE: gradientStyles.backgroundAfternoonHot,
  };
