import type {
  GetPestCardListResponse,
  GetWeatherRiskCardListResponse,
} from '@/types/openapiGenerator';
import HTTP from './shared/HTTP';

export const getWeatherDamage = () =>
  HTTP.get<GetWeatherRiskCardListResponse>('/damage/weather');

export const getPestDamage = (myCropId: number | null = null) =>
  HTTP.get<GetPestCardListResponse>(
    `/damage/pest${myCropId ? `?myCropId=${myCropId}` : ''}`
  );
