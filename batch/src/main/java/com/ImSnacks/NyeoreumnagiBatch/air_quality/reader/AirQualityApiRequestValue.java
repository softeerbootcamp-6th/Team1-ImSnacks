package com.ImSnacks.NyeoreumnagiBatch.air_quality.reader;

public enum AirQualityApiRequestValue {
    SERVICE_KEY("serviceKey"),
    PAGE_NO("pageNo"),
    NUM_OF_ROWS("numOfRows"),
    RETURN_TYPE("returnType"),
    DATA_TERM("dataTerm"),
    VER("ver"),
    STATION_NAME("stationName"),
    AIR_QUALITY_URI("https://apis.data.go.kr/B552584/ArpltnInforInqireSvc")
    ;

    private final String value;

    AirQualityApiRequestValue(String value) {
        this.value = value;
    }

    @Override
    public String toString() {
        return this.value;
    }
}
