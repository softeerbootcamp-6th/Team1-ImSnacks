package com.imsnacks.Nyeoreumnagi.common.enums;

public enum WeatherMetric {
    PRECIPITATION("강수량"),
    TEMPERATURE("기온"),
    HUMIDITY("습도"),
    WIND_SPEED("바람"),
    ;

    private final String metricName;

    WeatherMetric(String metricName) {
        this.metricName = metricName;
    }

    public String getMetricName() {
        return metricName;
    }
}
