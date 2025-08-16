package com.ImSnacks.NyeoreumnagiBatch.seven_days_weather_forecast.dto;

import java.time.LocalDate;
import java.util.List;

public record SevenDayTemperatureForecastDto(
        List<ByDayDto> byDayDto
) {
    public record ByDayDto(
            String regionCode,
            LocalDate date,
            int maxTemperature,
            int minTemperature
    ) {
    }
}
