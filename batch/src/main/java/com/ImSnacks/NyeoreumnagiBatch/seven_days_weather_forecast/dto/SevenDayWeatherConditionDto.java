package com.ImSnacks.NyeoreumnagiBatch.seven_days_weather_forecast.dto;

import com.ImSnacks.NyeoreumnagiBatch.common.enums.WeatherCondition;

import java.time.LocalDate;
import java.util.List;

public record SevenDayWeatherConditionDto(
        List<ByDayDto> byDayDto
) {
    public record ByDayDto(
            String regionCode,
            LocalDate date,
            WeatherCondition weatherCondition
    ){

    }
}
