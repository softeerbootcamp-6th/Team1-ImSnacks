import HTTP from './http';
import {
  GetDailyMaxPrecipitationResponse,
  GetHumidityResponse,
  GetSevenDaysForecastResponse,
  GetSunRiseSetTimeResponse,
  GetUVInfoResponse,
  GetWeatherBriefingResponse,
  GetWeatherConditionResponse,
  GetWeatherGraphResponse,
  GetWeatherGraphResponseWeatherMetricEnum,
  GetWindInfoResponse,
  WeatherRiskDto,
} from '@/types/openapiGenerator';

export const getWeatherNow = () =>
  HTTP.get<GetWeatherConditionResponse>('/weather/now');

export const getWeatherGraph = (
  weatherMetric: GetWeatherGraphResponseWeatherMetricEnum
) =>
  HTTP.get<GetWeatherGraphResponse>(`/weather?weatherMetric=${weatherMetric}`);

export const getWeatherBriefing = () =>
  HTTP.get<GetWeatherBriefingResponse>('/weather/briefing');

export const getWeatherRisk = () =>
  HTTP.get<WeatherRiskDto[]>('/weather/fcstRisk');

export const getWeatherSevenDays = () =>
  HTTP.get<GetSevenDaysForecastResponse[]>('/weather/sevenDays');

export const getWeatherPrecipitation = () =>
  HTTP.get<GetDailyMaxPrecipitationResponse>('/weather/precipitationInfo');

export const getWeatherHumidity = () =>
  HTTP.get<GetHumidityResponse>('/weather/humidityInfo');

export const getWeatherWind = () =>
  HTTP.get<GetWindInfoResponse>('/weather/windInfo');

export const getWeatherUV = () => HTTP.get<GetUVInfoResponse>('/weather/uv');

export const getWeatherSunset = () =>
  HTTP.get<GetSunRiseSetTimeResponse>('/weather/sunriseSet');
