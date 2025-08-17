package com.imsnacks.Nyeoreumnagi.weather.dto.response;

import com.imsnacks.Nyeoreumnagi.common.enums.WeatherCondition;

public record GetSevenDaysForecastResponse(
        String dayOfWeek,
        WeatherCondition weatherCondition,
        int maxTemperature,
        int minTemperature
) {
}
