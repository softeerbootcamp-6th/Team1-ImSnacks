package com.imsnacks.Nyeoreumnagi.weather.dto.response;

public record GetAirQualityResponse(
        int pm10Value,
        int pm10Grade,
        int pm25Value,
        int pm25Grade
) {
}
