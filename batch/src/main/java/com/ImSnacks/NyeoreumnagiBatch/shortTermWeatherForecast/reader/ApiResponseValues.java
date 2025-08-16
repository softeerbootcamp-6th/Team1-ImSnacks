package com.ImSnacks.NyeoreumnagiBatch.shortTermWeatherForecast.reader;

import lombok.Getter;

@Getter
public enum ApiResponseValues {
    RESULT_CODE("resultCode"),
    RESULT_MSG("resultMsg"),
    BASE_DATE("baseDate"),
    BASE_TIME("baseTime"),
    FCST_DATE("fcstDate"),
    FCST_TIME("fcstTime");

    private final String paramName;

    ApiResponseValues(String name) {
        this.paramName = name;
    }
}
