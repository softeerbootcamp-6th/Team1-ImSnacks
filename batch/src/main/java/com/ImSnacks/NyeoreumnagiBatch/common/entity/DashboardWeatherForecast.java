package com.ImSnacks.NyeoreumnagiBatch.common.entity;

import com.ImSnacks.NyeoreumnagiBatch.common.enums.WeatherCondition;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
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
