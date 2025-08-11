package com.imsnacks.Nyeoreumnagi.weather.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "DashboardTodayWeather")
@IdClass(DashboardTodayWeatherId.class)
@Getter
@NoArgsConstructor
@AllArgsConstructor
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
    private double maxTemperature;

    @Column(name = "max_uv_index", nullable = false)
    private double maxUVIndex;

    @Column(name = "max_uv_start", nullable = false)
    private double maxUVStart;

    @Column(name = "max_uv_end", nullable = false)
    private double maxUVEnd;

    @Column(name = "pm_10_value", nullable = false)
    private double pm10Value;

    @Column(name = "pm_10_grade", nullable = false)
    private double pm10Grade;

    @Column(name = "pm_25_value", nullable = false)
    private double pm25Value;

    @Column(name = "pm_25_grade", nullable = false)
    private double pm25Grade;

    @Column(name = "sunrise_time", nullable = false)
    private double sunriseTime;

    @Column(name = "sunset_time", nullable = false)
    private double sunSetTime;
}
