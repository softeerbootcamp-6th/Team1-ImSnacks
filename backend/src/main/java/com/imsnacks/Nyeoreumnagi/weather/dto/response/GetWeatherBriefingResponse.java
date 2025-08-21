package com.imsnacks.Nyeoreumnagi.weather.dto.response;

public record GetWeatherBriefingResponse(boolean hasWeatherRisk, String welcomeMsg, String weatherMsg) {
}
