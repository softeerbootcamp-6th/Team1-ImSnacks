package com.imsnacks.Nyeoreumnagi.weather.entity;

import com.imsnacks.Nyeoreumnagi.common.enums.WeatherCondition;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Getter
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
    private WeatherCondition weatherCondition;
}
