package com.imsnacks.Nyeoreumnagi.weather.dto.response;

public record GetWindInfoResponse(
        String direction,
        Integer degree,
        Integer speed
) {
}
