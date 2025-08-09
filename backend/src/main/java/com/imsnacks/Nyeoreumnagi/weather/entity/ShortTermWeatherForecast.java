package com.imsnacks.Nyeoreumnagi.weather.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "ShortTermWeatherForecast")
@IdClass(ShortTermWeatherForecastId.class)
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ShortTermWeatherForecast {
    @Id
    private int nx;

    @Id
    private int ny;

    @Id
    @Column(name = "fcst_time")
    private int fcstTime;

    @Column(nullable = false)
    private double precipitation;

    @Column(nullable = false)
    private int temperature;

    @Column(nullable = false)
    private int humidity;

    @Column(name = "wind_speed", nullable = false)
    private double windSpeed;
}
