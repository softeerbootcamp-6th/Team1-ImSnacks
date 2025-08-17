package com.ImSnacks.NyeoreumnagiBatch.common.entity;

import com.ImSnacks.NyeoreumnagiBatch.common.enums.WeatherCondition;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@IdClass(SevenDayWeatherForecastId.class)
public class SevenDayWeatherForecast {
    @Id
    private String regionCode;
    @Id
    private LocalDate date;
    private int maxTemperature;
    private int minTemperature;
    @Enumerated(EnumType.STRING)
    @Column(nullable = true)
    private WeatherCondition weatherCondition;
}
