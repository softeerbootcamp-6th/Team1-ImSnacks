package com.ImSnacks.NyeoreumnagiBatch.daily_high.processor.dto;

public record DailyHighProcessorResponseDto(
        int nx,
        int ny,
        double maxPrecipitation,
        double maxHumidity,
        double maxWindSpeed,
        int windDirection,
        int maxTemperature
) {
}
