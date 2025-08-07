package com.imsnacks.Nyeoreumnagi.weather.dto.response;

import java.util.List;

public record GetWeatherGraphResponse (
        int max,
        int min,
        String weatherMetric,
        List<ValuePerTime> valuePerTime
){
    public record ValuePerTime(
            String name,
            int value
    ){
    }
}
