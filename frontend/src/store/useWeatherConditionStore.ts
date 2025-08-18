import {
  WEATHER_CONDITIONS,
  type WeatherConditionsType,
} from '@/types/weather.types';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type WeatherConditionStore = {
  weatherCondition: WeatherConditionsType;
  setWeatherCondition: (weatherCondition: WeatherConditionsType) => void;
  resetWeatherCondition: () => void;
};

export const useWeatherConditionStore = create<WeatherConditionStore>()(
  persist(
    set => ({
      weatherCondition: WEATHER_CONDITIONS.SUNNY,
      setWeatherCondition: (weatherCondition: WeatherConditionsType) =>
        set({ weatherCondition }),
      resetWeatherCondition: () =>
        set({ weatherCondition: WEATHER_CONDITIONS.SUNNY }),
    }),
    {
      name: 'weather-condition',
      storage: createJSONStorage(() => localStorage),
      partialize: state => ({ weatherCondition: state.weatherCondition }),
    }
  )
);
