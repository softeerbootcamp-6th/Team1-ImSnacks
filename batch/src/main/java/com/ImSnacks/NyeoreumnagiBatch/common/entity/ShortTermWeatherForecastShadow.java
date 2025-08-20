package com.ImSnacks.NyeoreumnagiBatch.common.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Entity
@Table(name = "short_term_weather_forecast_shadow")
@IdClass(ShortTermWeatherForecastId.class)
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EntityListeners(AuditingEntityListener.class)
public class ShortTermWeatherForecastShadow {
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

    @Column(name = "wind_direction", nullable = false)
    private int wind_direction;

    @LastModifiedDate
    @Column(name = "update_at")
    private LocalDateTime updateAt;
}
