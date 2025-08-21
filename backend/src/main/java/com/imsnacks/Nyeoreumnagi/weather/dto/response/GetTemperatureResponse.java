package com.imsnacks.Nyeoreumnagi.weather.dto.response;

import com.imsnacks.Nyeoreumnagi.weather.entity.DashboardWeatherForecast;

import java.util.List;

public record GetTemperatureResponse(
        Integer maxTemperature,
        Integer minTemperature,
        List<TemperaturePerTime> temperaturePerTime
) {
    public record TemperaturePerTime(
            String time,
            String weatherType,
            Integer value
    ){
        public static TemperaturePerTime from(DashboardWeatherForecast dashboardWeatherForecast) {
            String time = String.format("%02d:00", dashboardWeatherForecast.getFcstTime());
            return new TemperaturePerTime(time, dashboardWeatherForecast.getWeatherCondition().toString(), dashboardWeatherForecast.getTemperature());
        }
    }
}
