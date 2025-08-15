import {
  WEATHER_CONDITIONS,
  type WeatherConditionsType,
} from '@/types/weather.types';
import { create } from 'zustand';

export const useWeatherConditionStore = create<{
  weatherCondition: WeatherConditionsType;
  setWeatherCondition: (weatherCondition: WeatherConditionsType) => void;
  resetWeatherCondition: () => void;
}>(set => ({
  weatherCondition: WEATHER_CONDITIONS.SUNNY,
  setWeatherCondition: (weatherCondition: WeatherConditionsType) =>
    set({ weatherCondition }),
  resetWeatherCondition: () =>
    set({ weatherCondition: WEATHER_CONDITIONS.SUNNY }),
}));
