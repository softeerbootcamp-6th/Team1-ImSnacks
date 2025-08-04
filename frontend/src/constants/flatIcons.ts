import SunFlatIcon from '@/assets/icons/flat/IC24Sun.svg?react';
import LessCloudyFlatICon from '@/assets/icons/flat/IC24LessCloudy.svg?react';
import CloudyFlatIcon from '@/assets/icons/flat/IC24Cloudy.svg?react';
import RainFlatIcon from '@/assets/icons/flat/IC24Rain.svg?react';
import HeavyRainFlatIcon from '@/assets/icons/flat/IC24HeavyRain.svg?react';
import SnowFlatIcon from '@/assets/icons/flat/IC24Snow.svg?react';
import NightFlatIcon from '@/assets/icons/flat/IC24Night.svg?react';
import CloudyNightFlatIcon from '@/assets/icons/flat/IC24CloudyNight.svg?react';
import HumidityFlatIcon from '@/assets/icons/flat/IC24Humidity.svg?react';
import TemperatureFlatIcon from '@/assets/icons/flat/IC24Temperature.svg?react';
import WindFlatIcon from '@/assets/icons/flat/IC24Wind.svg?react';

export const FLAT_ICON: Record<
  string,
  React.FC<React.SVGProps<SVGSVGElement>>
> = {
  강수량: RainFlatIcon,
  기온: TemperatureFlatIcon,
  습도: HumidityFlatIcon,
  풍속: WindFlatIcon,
};
