package com.imsnacks.Nyeoreumnagi.weather.dto.response;

public record GetWeatherConditionResponse(
        String weatherCondition,
        String weatherKeyword,
        int temperature
){
}
