package com.imsnacks.Nyeoreumnagi.weather.dto.response;

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
    }
}
