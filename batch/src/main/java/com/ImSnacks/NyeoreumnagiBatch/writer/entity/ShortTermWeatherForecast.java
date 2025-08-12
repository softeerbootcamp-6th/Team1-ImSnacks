package com.ImSnacks.NyeoreumnagiBatch.writer.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.Table;
import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.Builder;

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

    @Column(name = "snow", nullable = false)
    private double snow;

    @Column(name = "sky_status", nullable = false)
    private int skyStatus;
}
