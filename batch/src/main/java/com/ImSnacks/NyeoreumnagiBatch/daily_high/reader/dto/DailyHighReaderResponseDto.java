package com.ImSnacks.NyeoreumnagiBatch.daily_high.reader.dto;

import com.ImSnacks.NyeoreumnagiBatch.common.entity.ShortTermWeatherForecast;

import java.util.List;

public record DailyHighReaderResponseDto(
        List<ShortTermWeatherForecast> items
) {
}
