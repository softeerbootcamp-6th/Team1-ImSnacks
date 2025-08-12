package com.ImSnacks.NyeoreumnagiBatch.shortTermWeatherForecast.writer.dto;

import com.ImSnacks.NyeoreumnagiBatch.common.entity.WeatherRiskType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
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
        private double snow;
        private int skyStatus;
    }

    @Getter
    @Builder
    @AllArgsConstructor
    public static class WeatherRiskDto {
        private LocalDateTime startTime;
        private LocalDateTime endTime;
        private WeatherRiskType name;
    }
}
