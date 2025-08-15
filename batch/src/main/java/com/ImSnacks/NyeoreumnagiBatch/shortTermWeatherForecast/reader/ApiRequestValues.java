package com.ImSnacks.NyeoreumnagiBatch.shortTermWeatherForecast.reader;

public enum ApiRequestValues {
    URI("https://apihub.kma.go.kr/api/typ02/openApi/VilageFcstInfoService_2.0/getVilageFcst"),
    AUTH_KEY("authKey"),
    NUM_OF_ROWS("numOfRows"),
    PAGE_NO("pageNo"),
    DATA_TYPE("dataType"),
    BASE_DATE("base_date"),
    BASE_TIME("base_time"),
    NX("nx"),
    NY("ny");

    private final String value;

    ApiRequestValues(String value) {
        this.value = value;
    }

    @Override
    public String toString() {
        return this.value;
    }
}