export const WEATHER_METRICS = {
  PRECIPITATION: 'precipitation',
  TEMPERATURE: 'temperature',
  HUMIDITY: 'humidity',
  WIND_SPEED: 'windSpeed',
} as const;

export type WeatherMetrics =
  (typeof WEATHER_METRICS)[keyof typeof WEATHER_METRICS];
