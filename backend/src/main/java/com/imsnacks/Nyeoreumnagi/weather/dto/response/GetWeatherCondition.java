package com.imsnacks.Nyeoreumnagi.weather.dto.response;

public record GetWeatherCondition(
        String weatherCondition,
        String weatherKeyword,
        int temperature
){
}
