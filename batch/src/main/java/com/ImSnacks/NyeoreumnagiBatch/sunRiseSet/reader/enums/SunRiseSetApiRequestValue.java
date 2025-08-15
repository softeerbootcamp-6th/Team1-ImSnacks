package com.ImSnacks.NyeoreumnagiBatch.sunRiseSet.reader.enums;

public enum SunRiseSetApiRequestValue {
    SUNRISESET_URL("https://apis.data.go.kr/B090041/openapi/service/RiseSetInfoService/getLCRiseSetInfo?serviceKey=%s&locdate=%s&latitude=%s&longitude=%s&dnYn=%s"),
    SERVICE_KEY("serviceKey"),
    LOCDATE("locdate"),
    LATITUDE("latitude"),
    LONGITUDE("longitude"),
    DNYN("dnYn"),
    ;

    private final String key;

    SunRiseSetApiRequestValue(String key) {
        this.key = key;
    }

    public String toString() {
        return key;
    }
}
