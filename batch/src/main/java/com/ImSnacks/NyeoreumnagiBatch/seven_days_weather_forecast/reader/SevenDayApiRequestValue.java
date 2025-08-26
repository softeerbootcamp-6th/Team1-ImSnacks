package com.ImSnacks.NyeoreumnagiBatch.seven_days_weather_forecast.reader;

public enum SevenDayApiRequestValue {
    SERVICE_KEY("serviceKey"),
    PAGE_NO("pageNo"),
    NUM_OF_ROWS("numOfRows"),
    DATA_TYPE("dataType"),
    BASE_DATE("base_date"),
    BASE_TIME("base_time"),
    MID_RANGE_WEATHER_URI("https://apis.data.go.kr/1360000/MidFcstInfoService")
    ;

    private final String value;

    SevenDayApiRequestValue(String value) {
        this.value = value;
    }

    @Override
    public String toString() {
        return this.value;
    }
}
