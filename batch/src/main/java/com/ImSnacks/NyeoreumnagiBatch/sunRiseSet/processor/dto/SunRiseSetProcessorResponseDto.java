package com.ImSnacks.NyeoreumnagiBatch.sunRiseSet.processor.dto;

import java.time.LocalTime;

public record SunRiseSetProcessorResponseDto (
        int nx,
        int ny,
        LocalTime sunRise,
        LocalTime sunSet
){
}
