package com.imsnacks.Nyeoreumnagi.weather.dto.response;

import com.imsnacks.Nyeoreumnagi.common.enums.WeatherMetric;

import java.time.LocalDateTime;
import java.util.List;

public record GetWeatherGraphResponse(
        int max,
        int min,
        WeatherMetric weatherMetric,
        boolean isUpdated,
        LocalDateTime lastUpdateTime,
        List<ValuePerTime> valuePerTime
){
    public record ValuePerTime(
            String name,
            double value
    ){
    }
}
