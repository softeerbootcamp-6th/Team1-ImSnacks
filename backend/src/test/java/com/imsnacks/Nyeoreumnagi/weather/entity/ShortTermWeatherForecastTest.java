package com.imsnacks.Nyeoreumnagi.weather.entity;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import java.time.LocalTime;

import com.imsnacks.Nyeoreumnagi.common.enums.WeatherCondition;
import com.imsnacks.Nyeoreumnagi.weather.service.projection_entity.SunriseSunSetTime;
import org.junit.jupiter.api.Test;

class ShortTermWeatherForecastTest {

    @Test
    void 적설량이_1_이상이면_SNOW_반환() {
        // given
        SunriseSunSetTime time = mock(SunriseSunSetTime.class);
        ShortTermWeatherForecast f = ShortTermWeatherForecast.builder()
                .snow(2)
                .build();

        // when
        WeatherCondition result = f.getWeatherCondition(time);

        // then
        assertThat(result).isEqualTo(WeatherCondition.SNOW);
    }

    @Test
    void 강수량이_30_이상_HEAVY_RAIN_반환() {
        //given
        SunriseSunSetTime time = mock(SunriseSunSetTime.class);
        ShortTermWeatherForecast f = ShortTermWeatherForecast.builder()
                .snow(0)
                .precipitation(35)
                .build();

        //when
        WeatherCondition result = f.getWeatherCondition(time);

        //then
        assertThat(result).isEqualTo(WeatherCondition.HEAVY_RAIN);
    }

    @Test
    void 강수량이_30_이하_1_이상이면_RAIN_반환() {
        //given
        SunriseSunSetTime time = mock(SunriseSunSetTime.class);
        ShortTermWeatherForecast f = ShortTermWeatherForecast.builder()
                .snow(0)
                .precipitation(12)
                .build();

        //when
        WeatherCondition result = f.getWeatherCondition(time);

        //then
        assertThat(result).isEqualTo(WeatherCondition.RAIN);
    }

    @Test
    void 풍속이_14_이상이면_STRONG_WIND_반환() {
        //given
        SunriseSunSetTime time = mock(SunriseSunSetTime.class);
        ShortTermWeatherForecast f = ShortTermWeatherForecast.builder()
                .snow(0)
                .precipitation(0)
                .windSpeed(15)
                .build();

        //when
        WeatherCondition result = f.getWeatherCondition(time);

        //then
        assertThat(result).isEqualTo(WeatherCondition.STRONG_WIND);
    }

    @Test
    void 시간대가_낮이고_하늘상태코드가_1_이면_SUNNY_반환() {
        //given
        SunriseSunSetTime time = mock(SunriseSunSetTime.class);
        ShortTermWeatherForecast f = ShortTermWeatherForecast.builder()
                .snow(0)
                .precipitation(0)
                .windSpeed(3)
                .fcstTime(15)
                .skyStatus(1)
                .build();
        when(time.getSunriseTime()).thenReturn(LocalTime.of(6,0));
        when(time.getSunSetTime()).thenReturn(LocalTime.of(19,0));

        //when
        WeatherCondition result = f.getWeatherCondition(time);

        //then
        assertThat(result).isEqualTo(WeatherCondition.SUNNY);
    }

    @Test
    void 시간대가_낮이고_하늘상태코드가_3_이면_LESS_CLOUDY_반환() {
        //given
        SunriseSunSetTime time = mock(SunriseSunSetTime.class);
        ShortTermWeatherForecast f = ShortTermWeatherForecast.builder()
                .snow(0)
                .precipitation(0)
                .windSpeed(3)
                .fcstTime(15)
                .skyStatus(3)
                .build();
        when(time.getSunriseTime()).thenReturn(LocalTime.of(6,0));
        when(time.getSunSetTime()).thenReturn(LocalTime.of(19,0));

        //when
        WeatherCondition result = f.getWeatherCondition(time);

        //then
        assertThat(result).isEqualTo(WeatherCondition.LESS_CLOUDY);
    }

    @Test
    void 시간대가_낮이고_하늘상태코드가_4_이면_CLOUDY_반환() {
        //given
        SunriseSunSetTime time = mock(SunriseSunSetTime.class);
        ShortTermWeatherForecast f = ShortTermWeatherForecast.builder()
                .snow(0)
                .precipitation(0)
                .windSpeed(3)
                .fcstTime(15)
                .skyStatus(4)
                .build();
        when(time.getSunriseTime()).thenReturn(LocalTime.of(6,0));
        when(time.getSunSetTime()).thenReturn(LocalTime.of(19,0));

        //when
        WeatherCondition result = f.getWeatherCondition(time);

        //then
        assertThat(result).isEqualTo(WeatherCondition.CLOUDY);
    }

    @Test
    void 시간대가_밤이고_하늘상태코드가_1_이면_NIGHT_반환() {
        //given
        SunriseSunSetTime time = mock(SunriseSunSetTime.class);
        ShortTermWeatherForecast f = ShortTermWeatherForecast.builder()
                .snow(0)
                .precipitation(0)
                .windSpeed(3)
                .fcstTime(20)
                .skyStatus(1)
                .build();
        when(time.getSunriseTime()).thenReturn(LocalTime.of(6,0));
        when(time.getSunSetTime()).thenReturn(LocalTime.of(19,0));

        //when
        WeatherCondition result = f.getWeatherCondition(time);

        //then
        assertThat(result).isEqualTo(WeatherCondition.NIGHT);
    }

    @Test
    void 시간대가_밤이고_하늘상태코드가_3_이면_CLOUY_NIGHT_반환() {
        //given
        SunriseSunSetTime time = mock(SunriseSunSetTime.class);
        ShortTermWeatherForecast f = ShortTermWeatherForecast.builder()
                .snow(0)
                .precipitation(0)
                .windSpeed(3)
                .fcstTime(20)
                .skyStatus(3)
                .build();
        when(time.getSunriseTime()).thenReturn(LocalTime.of(6,0));
        when(time.getSunSetTime()).thenReturn(LocalTime.of(19,0));

        //when
        WeatherCondition result = f.getWeatherCondition(time);

        //then
        assertThat(result).isEqualTo(WeatherCondition.CLOUDY_NIGHT);
    }

    @Test
    void 시간대가_밤이고_하늘상태코드가_4_이면_CLOUY_NIGHT_반환() {
        //given
        SunriseSunSetTime time = mock(SunriseSunSetTime.class);
        ShortTermWeatherForecast f = ShortTermWeatherForecast.builder()
                .snow(0)
                .precipitation(0)
                .windSpeed(3)
                .fcstTime(20)
                .skyStatus(4)
                .build();
        when(time.getSunriseTime()).thenReturn(LocalTime.of(6,0));
        when(time.getSunSetTime()).thenReturn(LocalTime.of(19,0));

        //when
        WeatherCondition result = f.getWeatherCondition(time);

        //then
        assertThat(result).isEqualTo(WeatherCondition.CLOUDY_NIGHT);
    }
}