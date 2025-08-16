package com.ImSnacks.NyeoreumnagiBatch.DailyTemperature.reader.dto;

import com.ImSnacks.NyeoreumnagiBatch.common.entity.ShortTermWeatherForecast;

import java.util.List;

public record DailyTemperatureReaderResponseDto(
        List<ShortTermWeatherForecast> items
) {
}
