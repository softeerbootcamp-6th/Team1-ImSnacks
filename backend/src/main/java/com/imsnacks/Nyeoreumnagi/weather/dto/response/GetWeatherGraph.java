package com.imsnacks.Nyeoreumnagi.weather.dto.response;

import com.imsnacks.Nyeoreumnagi.common.enums.WeatherMetric;

import java.util.List;

public record GetWeatherGraph(
        int max,
        int min,
        WeatherMetric weatherMetric,
        List<ValuePerTime> valuePerTime
){
    public record ValuePerTime(
            String name,
            double value
    ){
    }
}
