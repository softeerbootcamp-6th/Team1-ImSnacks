import type { WeatherDamagesType, PestDamagesType } from '@/types/damage.type';

import {
  FlowerDrop,
  FruitCraking,
  SunBurn,
  FruitDrop,
  PoorColoring,
  WaterDefficiency,
} from '@/assets/images/weatherDemage';

import Bugs from '@/assets/images/pestDemage/Bugs.svg?react';
import Germs from '@/assets/images/pestDemage/Germs.svg?react';

export const DAMAGE_GRAPHIC: Record<
  WeatherDamagesType | PestDamagesType,
  React.FC<React.SVGProps<SVGSVGElement>>
> = {
  FLOWER_DROP: FlowerDrop,
  FRUIT_CRAKING: FruitCraking,
  SUNBURN: SunBurn,
  FRUIT_DROP: FruitDrop,
  POOR_COLORING: PoorColoring,
  WATER_DEFFICIENCY: WaterDefficiency,
  BUGS: Bugs,
  GERMS: Germs,
};
