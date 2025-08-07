package com.imsnacks.Nyeoreumnagi.weather.exception;

public enum WeatherResponseStatus {
    NO_WEATHER_LOCATION(3001, "해당 좌표에 날씨 정보가 없습니다."),
    ;

    private final int code;
    private final String message;

    WeatherResponseStatus(int code, String message) {
        this.code = code;
        this.message = message;
    }

    public int getCode() {
        return code;
    }

    public String getMessage() {
        return message;
    }
}
