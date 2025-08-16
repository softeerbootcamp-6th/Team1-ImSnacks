import HTTP from './http';
import {
  GetSunRiseSetTimeResponse,
  GetUVInfoResponse,
  GetWeatherConditionResponse,
  GetWeatherGraphResponse,
  GetWeatherGraphResponseWeatherMetricEnum,
} from '@/types/openapiGenerator';

export const getWeatherNow = () =>
  HTTP.get<GetWeatherConditionResponse>('/weather/now');

export const getWeatherGraph = (
  weatherMetric: GetWeatherGraphResponseWeatherMetricEnum
) =>
  HTTP.get<GetWeatherGraphResponse>(`/weather?weatherMetric=${weatherMetric}`);

export const getWeatherUV = () => HTTP.get<GetUVInfoResponse>('/weather/uv');

export const getWeatherSunset = () =>
  HTTP.get<GetSunRiseSetTimeResponse>('/weather/sunriseSet');
