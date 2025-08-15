package com.ImSnacks.NyeoreumnagiBatch.seven_days_weather_forecast.dto;

public record SevenDayTotalForecastResponseDto(
        SevenDayWeatherForecastResponseDto sevenDayWeatherForecastResponseDto,
        SevenDayTemperatureForecastResponseDto sevenDayTemperatureForecastResponseDto
) {
}
