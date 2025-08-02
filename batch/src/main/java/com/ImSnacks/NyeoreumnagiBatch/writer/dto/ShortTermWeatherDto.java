package com.ImSnacks.NyeoreumnagiBatch.writer.dto;

import com.ImSnacks.NyeoreumnagiBatch.writer.entity.WeatherRiskType;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;
import java.util.List;

@Getter
@Builder
public class ShortTermWeatherDto {
    private int nx;
    private int ny;
    private LocalDate fcstDate;

    private List<WeatherForecastByTime> weatherForecastByTimeList;
    private List<WeatherRisk> WeatherRiskList;

    @Getter
    @Builder
    public static class WeatherForecastByTime {
        private int fcstTime;
        private double precipitation;
        private int temperature;
        private int humidity;
        private double windSpeed;
    }

    @Getter
    @Builder
    public static class WeatherRisk {
        private int startTime;
        private int endTime;
        private WeatherRiskType name;
    }
}
