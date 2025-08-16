package com.imsnacks.Nyeoreumnagi.weather.entity;

import com.imsnacks.Nyeoreumnagi.common.enums.WeatherCondition;
import org.junit.jupiter.api.Test;

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.*;

class SevenDayWeatherForecastTest {

    @Test
    void 예보날짜가_오늘이면_오늘을_반환한다() {
        LocalDate baseDate = LocalDate.of(2025, 8, 16);
        SevenDayWeatherForecast forecast = new SevenDayWeatherForecast(
                "11B10101",
                baseDate,
                25,
                15,
                WeatherCondition.SUNNY
        );

        String dayOfWeek = forecast.getDayOfWeek(baseDate);

        assertEquals("오늘", dayOfWeek);
    }

    @Test
    void 예보날짜가_내일이면_내일을_반환한다() {
        LocalDate baseDate = LocalDate.of(2025, 8, 16);
        SevenDayWeatherForecast forecast = new SevenDayWeatherForecast(
                "11B10101",
                baseDate.plusDays(1),
                26,
                16,
                WeatherCondition.CLOUDY
        );

        String dayOfWeek = forecast.getDayOfWeek(baseDate);

        assertEquals("내일", dayOfWeek);
    }

    @Test
    void 오늘과_내일_외의_날짜인_경우_요일명을_반환한다() {
        // Given
        LocalDate baseDate = LocalDate.of(2025, 8, 16); // 2025-08-16은 토요일
        LocalDate testDate = baseDate.plusDays(2); // 2025-08-18은 월요일
        SevenDayWeatherForecast forecast = new SevenDayWeatherForecast(
                "11B10101",
                testDate,
                24,
                14,
                WeatherCondition.CLOUDY_NIGHT
        );

        // When
        String dayOfWeek = forecast.getDayOfWeek(baseDate);

        // Then
        assertEquals("월요일", dayOfWeek);
    }
}
