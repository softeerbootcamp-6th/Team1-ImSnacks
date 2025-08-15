package com.ImSnacks.NyeoreumnagiBatch.shortTermWeatherForecast.processor.dto;

import lombok.Getter;

import java.time.LocalDateTime;

public record VilageFcstItemsDto(
        @Getter
        String category,
        @Getter
        LocalDateTime fcstDateTime,
        @Getter
        String fcstValue,
        int nx,
        int ny
) {
}
