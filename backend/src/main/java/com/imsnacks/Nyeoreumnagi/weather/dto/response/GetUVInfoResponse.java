package com.imsnacks.Nyeoreumnagi.weather.dto.response;

public record GetUVInfoResponse(
        String startTime,
        String endTime,
        Integer value
) {
}
