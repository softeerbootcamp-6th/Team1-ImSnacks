import type { WeatherMetrics } from './weather.types';

export interface MainGraphData {
  min: number;
  max: number;
  weatherMetric: WeatherMetrics;
  valuePerTime: Array<{ name: string; value: number }>;
}

export interface WeatherRiskData {
  category: string;
  startTime: string;
  endTime: string;
}
