package com.imsnacks.Nyeoreumnagi.weather.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalTime;

@Entity
@Table(name = "DashboardTodayWeather")
@IdClass(DashboardTodayWeatherId.class)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DashboardTodayWeather {
    @Id
    private int nx;
    @Id
    private int ny;

    @Column(name = "max_precipitation", nullable = true)
    private Double maxPrecipitation;

    @Column(name = "max_humidity", nullable = true)
    private Double maxHumidity;

    @Column(name = "max_windspeed", nullable = true)
    private Double maxWindSpeed;

    @Column(name = "wind_direction", nullable = true)
    private Double windDirection;

    @Column(name = "max_temperature", nullable = true)
    private Integer maxTemperature;

    @Column(name = "max_uv_index", nullable = true)
    private Integer maxUVIndex;

    @Column(name = "max_uv_start", nullable = true)
    private LocalTime maxUVStart;

    @Column(name = "max_uv_end", nullable = true)
    private LocalTime maxUVEnd;

    @Column(name = "pm_10_value", nullable = true)
    private Double pm10Value;

    @Column(name = "pm_10_grade", nullable = true)
    private Integer pm10Grade;

    @Column(name = "pm_25_value", nullable = true)
    private Double pm25Value;

    @Column(name = "pm_25_grade", nullable = true)
    private Integer pm25Grade;

    @Column(name = "sunrise_time", nullable = true)
    private LocalTime sunriseTime;

    @Column(name = "sunset_time", nullable = true)
    private LocalTime sunSetTime;
}