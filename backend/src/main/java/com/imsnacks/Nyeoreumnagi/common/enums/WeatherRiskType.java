package com.imsnacks.Nyeoreumnagi.common.enums;

public enum WeatherRiskType {
    //날씨 특보 우선순위가 반영된 상태이니 수정시 논의가 필요
    RAIN("비"),
    FROST("서리"),
    ABNORMAL_HEAT("이상고온"),
    HEAVY_RAIN("호우"),
    STRONG_WIND("강풍"),
    TORRENTIAL_RAIN("폭우"),
    ;

    private final String description;

    WeatherRiskType(String description) {
        this.description = description;
    }
}
