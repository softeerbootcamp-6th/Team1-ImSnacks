export const WEATHER_DAMAGES = {
  SUNBURN: 'SUNBURN',
  WATER_DEFICIENCY: 'WATER_DEFICIENCY',
  POOR_COLORING: 'POOR_COLORING',
  FRUIT_CRAKING: 'FRUIT_CRAKING',
  FRUIT_DROP: 'FRUIT_DROP',
  FLOWER_DROP: 'FLOWER_DROP',
} as const;

export type WeatherDamagesType =
  (typeof WEATHER_DAMAGES)[keyof typeof WEATHER_DAMAGES];

export const PEST_DAMAGES = {
  GERMS: 'GERMS',
  BUGS: 'BUGS',
} as const;

export type PestDamagesType = (typeof PEST_DAMAGES)[keyof typeof PEST_DAMAGES];
