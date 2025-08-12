package com.ImSnacks.NyeoreumnagiBatch.ultraviolet.processor.dto;

import java.time.LocalTime;

public record UVProcessorResponseDto(
        int maxUVIndex,
        LocalTime maxUVStartTime,
        LocalTime maxUVEndTime
) {
}
