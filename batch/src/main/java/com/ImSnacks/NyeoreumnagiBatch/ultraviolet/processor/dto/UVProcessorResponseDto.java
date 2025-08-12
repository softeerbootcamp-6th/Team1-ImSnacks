package com.ImSnacks.NyeoreumnagiBatch.ultraviolet.processor.dto;

import java.time.LocalTime;

public record UVProcessorResponseDto(
        int nx,
        int ny,
        int maxUVIndex,
        LocalTime maxUVStartTime,
        LocalTime maxUVEndTime
) {
}
