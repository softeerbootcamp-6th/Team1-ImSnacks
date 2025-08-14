import type { ApiRes } from './res';
import HTTP from './http';

export type WeatherRes = {
  weatherCondition: string;
  weatherKeyword: string;
  temperature: number;
};

export const getWeatherNow = async (): Promise<ApiRes<WeatherRes>> => {
  const res = await HTTP.get('/weather/now');
  return res;
};
