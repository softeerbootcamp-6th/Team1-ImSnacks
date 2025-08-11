import type { WeatherConditionsType } from '@/types/weather.types';

import {
  SunnyIcon,
  SnowIcon,
  ThunderIcon,
  WindIcon,
  CloudyIcon,
  CloudyNightIcon,
  HeavyRainIcon,
  LessCloudyIcon,
  NightIcon,
  RainIcon,
} from '@/assets/icons/glass/pcSize';

export const GLASS_ICON: Record<
  WeatherConditionsType,
  React.FC<React.SVGProps<SVGSVGElement>>
> = {
  SUNNY: SunnyIcon,
  SNOW: SnowIcon,
  THUNDER: ThunderIcon,
  STRONG_WIND: WindIcon,
  CLOUDY: CloudyIcon,
  CLOUDY_NIGHT: CloudyNightIcon,
  HEAVY_RAIN: HeavyRainIcon,
  LESS_CLOUDY: LessCloudyIcon,
  NIGHT: NightIcon,
  RAIN: RainIcon,
};
