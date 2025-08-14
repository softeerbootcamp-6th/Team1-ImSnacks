package com.ImSnacks.NyeoreumnagiBatch.daily_high.processor.dto;

public record DailyHighProcessorResponseDto(
        double maxPrecipitation,
        double maxHumidity,
        double maxWindSpeed,
        double windDirection,
        int maxTemperature
) {
}
