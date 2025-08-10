package com.imsnacks.Nyeoreumnagi.briefing.dto.response;

// Http요청의 body
public record WeatherBriefingResponse(boolean hasWeatherRisk, String weatherMsg) {
}
