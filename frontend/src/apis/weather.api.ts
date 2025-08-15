import HTTP from './http';
import { GetWeatherCondition } from '@/types/openapiGenerator';

export const getWeatherNow = () =>
  HTTP.get<GetWeatherCondition>('/weather/now');
