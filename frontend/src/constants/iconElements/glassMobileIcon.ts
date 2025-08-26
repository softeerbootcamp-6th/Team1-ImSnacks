import type { WeatherConditionsType } from '@/types/weather.types';

import {
  SunnyMobileIcon,
  SnowMobileIcon,
  WindMobileIcon,
  CloudyMobileIcon,
  CloudyNightMobileIcon,
  HeavyRainMobileIcon,
  LessCloudyMobileIcon,
  NightMobileIcon,
  RainMobileIcon,
} from '@/assets/icons/glass/mobileSize';

export const GLASS_MOBILE_ICON: Record<
  WeatherConditionsType | string,
  React.FC<React.SVGProps<SVGSVGElement>>
> = {
  SUNNY: SunnyMobileIcon,
  SNOW: SnowMobileIcon,
  STRONG_WIND: WindMobileIcon,
  CLOUDY: CloudyMobileIcon,
  CLOUDY_NIGHT: CloudyNightMobileIcon,
  HEAVY_RAIN: HeavyRainMobileIcon,
  LESS_CLOUDY: LessCloudyMobileIcon,
  NIGHT: NightMobileIcon,
  RAIN: RainMobileIcon,
  HEAT_WAVE: SunnyMobileIcon,
};
