import { useQuery } from '@tanstack/react-query';
import type { WeatherMetrics } from '@/types/weather.types';
import type { GetWeatherGraphResponse } from '@/types/openapiGenerator';
import { getWeatherGraph } from '@/apis/weather.api';

export const useWeatherGraphQuery = (currentTab: WeatherMetrics) => {
  return useQuery({
    queryKey: ['weatherGraph', currentTab],
    queryFn: async (): Promise<GetWeatherGraphResponse> => {
      const res = await getWeatherGraph(currentTab);
      if (!res.data) {
        throw new Error('No data received from weather API');
      }
      return res.data;
    },
    staleTime: 55 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};
