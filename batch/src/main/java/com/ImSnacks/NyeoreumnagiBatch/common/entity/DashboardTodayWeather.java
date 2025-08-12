package com.ImSnacks.NyeoreumnagiBatch.common.entity;

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

    @Column(name = "max_precipitation", nullable = false)
    private double maxPrecipitation;

    @Column(name = "max_humidity", nullable = false)
    private double maxHumidity;

    @Column(name = "max_windspeed", nullable = false)
    private double maxWindSpeed;

    @Column(name = "wind_direction", nullable = false)
    private double windDirection;

    @Column(name = "max_temperature", nullable = false)
    private int maxTemperature;

    @Column(name = "max_uv_index", nullable = false)
    private int maxUVIndex;

    @Column(name = "max_uv_start", nullable = false)
    private LocalTime maxUVStart;

    @Column(name = "max_uv_end", nullable = false)
    private LocalTime maxUVEnd;

    @Column(name = "pm_10_value", nullable = false)
    private double pm10Value;

    @Column(name = "pm_10_grade", nullable = false)
    private int pm10Grade;

    @Column(name = "pm_25_value", nullable = false)
    private double pm25Value;

    @Column(name = "pm_25_grade", nullable = false)
    private int pm25Grade;

    @Column(name = "sunrise_time", nullable = false)
    private LocalTime sunriseTime;

    @Column(name = "sunset_time", nullable = false)
    private LocalTime sunSetTime;
}
