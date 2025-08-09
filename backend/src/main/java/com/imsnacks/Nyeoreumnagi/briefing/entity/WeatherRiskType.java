package com.imsnacks.Nyeoreumnagi.briefing.entity;

import lombok.Getter;

public enum WeatherRiskType {
    RAIN("비"),
    HEAVY_RAIN("호우"),
    TORRENTIAL_RAIN("폭우"),
    FROST("서리"),
    ABNORMAL_HEAT("이상고온"),
    STRONG_WIND("강풍");

    @Getter
    private final String description;

    WeatherRiskType(String description) {
        this.description = description;
    }
}
