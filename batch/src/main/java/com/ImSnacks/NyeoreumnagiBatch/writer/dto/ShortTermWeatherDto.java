package com.ImSnacks.NyeoreumnagiBatch.writer.dto;

import com.ImSnacks.NyeoreumnagiBatch.writer.entity.WeatherRiskType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class ShortTermWeatherDto {
    private int nx;
    private int ny;

    private List<WeatherForecastByTimeDto> weatherForecastByTimeList;
    private List<WeatherRiskDto> weatherRiskList;

    @Getter
    @Builder
    @AllArgsConstructor
    public static class WeatherForecastByTimeDto {
        private int fcstTime;
        private double precipitation;
        private int temperature;
        private int humidity;
        private double windSpeed;
    }

    @Getter
    @Builder
    @AllArgsConstructor
    public static class WeatherRiskDto {
        private int startTime;
        private int endTime;
        private WeatherRiskType name;
    }
}
