package com.imsnacks.Nyeoreumnagi.weather.dto.response;

import java.util.List;

public record GetFcstRisk(
        List<WeatherRiskDto> items
){
    public record  WeatherRiskDto(
        String category,
        String startTime,
        String endTime
    ){}
}
