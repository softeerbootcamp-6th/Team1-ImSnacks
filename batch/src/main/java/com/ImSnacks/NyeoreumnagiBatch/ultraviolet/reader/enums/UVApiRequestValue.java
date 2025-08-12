package com.ImSnacks.NyeoreumnagiBatch.ultraviolet.reader.enums;

public enum UVApiRequestValue {
    UV_URL("https://apis.data.go.kr/1360000/LivingWthrIdxServiceV4/getUVIdxV4"),
    SERVICE_KEY("serviceKey"),
    PAGE_NO("pageNo"),
    NUM_OF_ROWS("numOfRows"),
    DATA_TYPE("dataType"),
    AREA_NO("areaNo"),
    TIME("time")
    ;

    private final String key;

    UVApiRequestValue(String key) {
        this.key = key;
    }

    public String toString() {
        return key;
    }
}
