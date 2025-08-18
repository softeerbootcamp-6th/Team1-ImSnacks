package com.imsnacks.Nyeoreumnagi.weather.exception;

public enum WeatherResponseStatus {
    NO_WEATHER_LOCATION(3001, "해당 좌표에 날씨 정보가 없습니다."),
    INVALID_WEATHER_METRIC(3002, "유효하지 않은 weather metric입니다."),
    NO_WEATHER_VALUE(3003, "해당 지역에 날씨 데이터가 없습니다."),
    CANNOT_CALCULATE_WEATHER_CONDITION(3004, "기상 요약을 할 수 없습니다."),
    NO_UV_INFO(3005, "해당 지역 자외선 정보가 없습니다."),
    NO_SUNRISE_SET(3006, "해당 지역 일출몰 정보가 없습니다."),
    NO_WIND_INFO(3007, "해당 지역 풍속/풍향 정보가 없습니다."),
    NO_HUMIDITY_INFO(3008, "해당 지역 습도 정보가 없습니다."),
    NO_PRECIPITATION(3009, "해당 지역 강수량 정보가 없습니다."),
    INVALID_SEVEN_DAY_FORECAST_COUNT(3010, "7일 예보 결과는 7개여야 합니다."),
    NO_TEMPERATURE_INFO(3011, "해당 지역 기온 정보가 없습니다."),
    NO_MATCHING_WEATHER_RISK_CARD(3012, "기상 리스크와 매칭되는 기상 피해 카드가 없습니다."),
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
