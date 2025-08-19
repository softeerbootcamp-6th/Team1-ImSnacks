import type { GetWeatherRiskCardListResponse } from '@/types/openapiGenerator';
import HTTP from './http';

export const getWeatherDamage = () =>
  HTTP.get<GetWeatherRiskCardListResponse>('/damage/weather');
