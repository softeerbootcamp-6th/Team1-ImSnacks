package com.ImSnacks.NyeoreumnagiBatch.air_quality.processor.dto;


public record AirQualityResponse(
        String stationName,
        int pm10Grade,
        int pm10Value,
        int pm25Grade,
        int pm25Value
) {
}

