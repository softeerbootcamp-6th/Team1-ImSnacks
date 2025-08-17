package com.imsnacks.Nyeoreumnagi.weather.entity;

import com.imsnacks.Nyeoreumnagi.common.enums.WeatherCondition;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.format.TextStyle;
import java.util.Locale;

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

    public String getDayOfWeek(LocalDate baseDate) {
        if (date.isEqual(baseDate)) {
            return "오늘";
        }
        if (date.isEqual(baseDate.plusDays(1))) {
            return "내일";
        }
        return date.getDayOfWeek().getDisplayName(TextStyle.FULL, Locale.KOREA);
    }
}
