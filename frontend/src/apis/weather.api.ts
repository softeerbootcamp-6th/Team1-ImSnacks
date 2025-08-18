import HTTP from './http';
import {
  GetAirQualityResponse,
  GetDailyMaxPrecipitationResponse,
  GetFcstRiskResponse,
  GetHumidityResponse,
  GetSevenDaysForecastResponse,
  GetSunRiseSetTimeResponse,
  GetTemperatureResponse,
  GetUVInfoResponse,
  GetWeatherBriefingResponse,
  GetWeatherConditionResponse,
  GetWeatherGraphResponse,
  GetWeatherGraphResponseWeatherMetricEnum,
  GetWeatherStatusResponse,
  GetWindInfoResponse,
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
  HTTP.get<GetFcstRiskResponse>('/weather/fcstRisk');

export const getWeatherTemperature = () =>
  HTTP.get<GetTemperatureResponse>('/weather/temperatureInfo');

export const getWeatherSevenDays = () =>
  HTTP.get<GetSevenDaysForecastResponse[]>('/weather/sevenDays');

export const getWeatherPrecipitation = () =>
  HTTP.get<GetDailyMaxPrecipitationResponse>('/weather/precipitationInfo');

export const getWeatherHumidity = () =>
  HTTP.get<GetHumidityResponse>('/weather/humidityInfo');

export const getWeatherWind = () =>
  HTTP.get<GetWindInfoResponse>('/weather/windInfo');

export const getWeatherUV = () => HTTP.get<GetUVInfoResponse>('/weather/uv');

export const getWeatherAirQuality = () =>
  HTTP.get<GetAirQualityResponse>('/weather/airQualityInfo');

export const getWeatherSunset = () =>
  HTTP.get<GetSunRiseSetTimeResponse>('/weather/sunriseSet');

export const getWeatherStatus = () =>
  HTTP.get<GetWeatherStatusResponse>('/weather/status');
