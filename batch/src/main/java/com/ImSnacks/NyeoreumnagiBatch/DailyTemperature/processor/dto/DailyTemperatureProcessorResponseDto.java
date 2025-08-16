package com.ImSnacks.NyeoreumnagiBatch.DailyTemperature.processor.dto;

import com.ImSnacks.NyeoreumnagiBatch.common.enums.WeatherCondition;

import java.util.List;

public record DailyTemperatureProcessorResponseDto(
        int nx,
        int ny,
        List<TemperaturePerTime> temperaturePerTime
) {
    public record TemperaturePerTime(
            int fcstTime,
            int temperature,
            WeatherCondition weatherCondition
    ){}
}
