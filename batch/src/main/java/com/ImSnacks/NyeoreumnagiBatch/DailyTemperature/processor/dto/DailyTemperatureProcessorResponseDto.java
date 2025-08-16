package com.ImSnacks.NyeoreumnagiBatch.DailyTemperature.processor.dto;

import com.ImSnacks.NyeoreumnagiBatch.common.enums.WeatherCondition;

public record DailyTemperatureProcessorResponseDto(
        int nx,
        int ny,
        int fcstTime,
        int temperature,
        WeatherCondition weatherCondition
) {
}
