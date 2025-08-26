package com.imsnacks.Nyeoreumnagi.weather.dto.response;

public record GetWeatherStatusResponse(
        String metric,
        Integer value,
        String metricType
) {
}
