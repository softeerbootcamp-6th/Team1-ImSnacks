import {
  WEATHER_CONDITIONS,
  type WeatherConditionsType,
} from '@/types/weather.types';
import { create } from 'zustand';

export const useWeatherConditionStore = create(set => ({
  weatherCondition: WEATHER_CONDITIONS.SUNNY,
  setWeatherCondition: (weatherCondition: WeatherConditionsType) =>
    set({ weatherCondition }),
  resetWeatherCondition: () =>
    set({ weatherCondition: WEATHER_CONDITIONS.SUNNY }),
}));
