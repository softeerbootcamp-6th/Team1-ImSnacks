package com.imsnacks.Nyeoreumnagi.weather.entity;

import com.imsnacks.Nyeoreumnagi.common.enums.WeatherCondition;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@IdClass(DashboardWeatherForecastId.class)
public class DashboardWeatherForecast {
    @Id
    private int nx;
    @Id
    private int ny;
    @Id
    @Column(name = "fcst_time")
    private int fcstTime;

    @Column(name = "temperature", nullable = false)
    Integer temperature;

    @Enumerated(EnumType.STRING)
    @Column(name = "sky_status", nullable = false)
    WeatherCondition weatherCondition;
}
