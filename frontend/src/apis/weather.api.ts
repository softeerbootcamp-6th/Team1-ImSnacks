import HTTP from './http';
import { GetWeatherConditionResponse } from '@/types/openapiGenerator';

export const getWeatherNow = () =>
  HTTP.get<GetWeatherConditionResponse>('/weather/now');
