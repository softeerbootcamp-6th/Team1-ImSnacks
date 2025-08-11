package com.imsnacks.Nyeoreumnagi.common.enums;

public enum WeatherCondition {
    SUNNY("맑음"),
    LESS_CLOUDY("조금 흐림"),
    CLOUDY("흐림"),
    STRONG_WIND("강풍"),
    THUNDER("천둥"),
    RAIN("비"),
    HEAVY_RAIN("폭우"),
    SNOW("눈"),
    NIGHT("맑은 밤"),
    CLOUDY_NIGHT("흐린 밤"),
    ;

    private final String keyword;

    WeatherCondition(String keyword) {
        this.keyword = keyword;
    }

    public String getKeyword() {
        return keyword;
    }
}
