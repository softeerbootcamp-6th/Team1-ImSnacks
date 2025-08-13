import type { WeatherDamagesType, PestDamagesType } from '@/types/damage.type';
import FlowerDrop from '@/assets/images/weatherDemage/FlowerDrop.svg?react';
import FruitCraking from '@/assets/images/weatherDemage/FruitCraking.svg?react';
import Sunburn from '@/assets/images/weatherDemage/SunBrun.svg?react';
import FruitDrop from '@/assets/images/weatherDemage/FruitDrop.svg?react';
import PoorColoring from '@/assets/images/weatherDemage/PoorColoring.svg?react';
import WaterDefficiency from '@/assets/images/weatherDemage/WaterDefficieny.svg?react';

import Bugs from '@/assets/images/pestDemage/Bugs.svg?react';
import Germs from '@/assets/images/pestDemage/Germs.svg?react';

export const DAMAGE_GRAPHIC: Record<
  WeatherDamagesType | PestDamagesType,
  React.FC<React.SVGProps<SVGSVGElement>>
> = {
  FLOWER_DROP: FlowerDrop,
  FRUIT_CRAKING: FruitCraking,
  SUNBURN: Sunburn,
  FRUIT_DROP: FruitDrop,
  POOR_COLORING: PoorColoring,
  WATER_DEFFICIENCY: WaterDefficiency,
  BUGS: Bugs,
  GERMS: Germs,
};
