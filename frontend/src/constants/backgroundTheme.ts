import type { WeatherConditionsType } from '@/types/weather.types';
import { gradientStyles } from '@/styles/gradientStyles';
import type { SerializedStyles } from '@emotion/react';

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
    HIT_WAVE: gradientStyles.backgroundAfternoonHot,
  };
