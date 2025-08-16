package com.ImSnacks.NyeoreumnagiBatch.common.enums;

public enum WeatherCondition {
    SUNNY("맑음"),
    LESS_CLOUDY("조금 흐림"),
    CLOUDY("흐림"),
    STRONG_WIND("강풍"),
    THUNDER("천둥"),
    RAIN("비"),
    HEAVY_RAIN("폭우"),
    SNOW("눈"),
    NIGHT("맑음"),
    CLOUDY_NIGHT("흐림"),
    MIDDLE("보통")
    ;

    private final String keyword;

    WeatherCondition(String keyword) {
        this.keyword = keyword;
    }

    public String getKeyword() {
        return keyword;
    }

    public static WeatherCondition fromApiString(String apiValue) {
        if (apiValue == null) return null;

        if (apiValue.equals("맑음")) {
            return SUNNY;
        }

        if (apiValue.contains("구름많")) {
            if (apiValue.contains("비") || apiValue.contains("소나기")) {
                return RAIN;
            }
            if (apiValue.contains("눈")) {
                return SNOW;
            }
            return LESS_CLOUDY;
        }

        // 흐림 계열
        if (apiValue.contains("흐림") || apiValue.contains("흐리")) {
            if (apiValue.contains("비") || apiValue.contains("소나기")) {
                return RAIN;
            }
            if (apiValue.contains("눈")) {
                return SNOW;
            }
            return CLOUDY;
        }
        return MIDDLE;
    }
}
