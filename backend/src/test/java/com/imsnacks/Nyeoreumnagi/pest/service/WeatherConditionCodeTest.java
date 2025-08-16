package com.imsnacks.Nyeoreumnagi.pest.service;

import com.imsnacks.Nyeoreumnagi.pest.service.WeatherConditionCode.HumidityLevel;
import com.imsnacks.Nyeoreumnagi.pest.service.WeatherConditionCode.RainLevel;
import com.imsnacks.Nyeoreumnagi.pest.service.WeatherConditionCode.TemperatureLevel;
import com.imsnacks.Nyeoreumnagi.weather.entity.ShortTermWeatherForecast;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

public class WeatherConditionCodeTest {

    private final int 저온 = TemperatureLevel.LevelBoundary.LOW_TO_MID.getThresholdValue() - 1;
    private final int 보통기온 = TemperatureLevel.LevelBoundary.LOW_TO_MID.getThresholdValue();
    private final int 고온 = TemperatureLevel.LevelBoundary.MID_TO_HIGH.getThresholdValue();

    private final int 건조 = HumidityLevel.LevelBoundary.LOW_TO_MID.getThresholdValue() - 1;
    private final int 보통습도 = HumidityLevel.LevelBoundary.LOW_TO_MID.getThresholdValue();
    private final int 다습 = HumidityLevel.LevelBoundary.MID_TO_HIGH.getThresholdValue();

    private final double 비없음 = RainLevel.LevelBoundary.RAIN.getThresholdValue() - 0.42;
    private final double 비있음 = RainLevel.LevelBoundary.RAIN.getThresholdValue() + 0.42;


    ShortTermWeatherForecast makeForecast(int temperature, int humidity, double precipitation) {
        return ShortTermWeatherForecast.builder()
                .temperature(temperature)
                .humidity(humidity)
                .precipitation(precipitation)
                .build();
    }

    List<ShortTermWeatherForecast> getFcstList(int temperature, int humidity, double precipitation, int count) {
        return IntStream.range(0, count)
                .mapToObj(i -> makeForecast(temperature, humidity, precipitation))
                .collect(Collectors.toList());
    }

    List<ShortTermWeatherForecast> mixRain(List<ShortTermWeatherForecast> list, double 강수) {
        List<ShortTermWeatherForecast> copy = new ArrayList<>(list);
        copy.set(0, makeForecast(copy.get(0).getTemperature(), copy.get(0).getHumidity(), 강수));
        return copy;
    }

    @Test
    public void 하나의_예보가_있을때_저온_건조_비없음() {
        ShortTermWeatherForecast fcst = ShortTermWeatherForecast.builder()
                .temperature(저온)
                .humidity(건조)
                .precipitation(비없음)
                .build();
        WeatherConditionCode code = WeatherConditionCode.of(List.of(fcst));

        assertThat(code.temperatureLevel()).isEqualTo(TemperatureLevel.LOW);
        assertThat(code.humidityLevel()).isEqualTo(HumidityLevel.LOW);
        assertThat(code.rainLevel()).isEqualTo(RainLevel.NONE);
    }

    @Test
    public void 하나의_예보가_있을때_저온_건조_비있음() {
        ShortTermWeatherForecast fcst = ShortTermWeatherForecast.builder()
                .temperature(저온)
                .humidity(건조)
                .precipitation(비있음)
                .build();
        WeatherConditionCode code = WeatherConditionCode.of(List.of(fcst));

        assertThat(code.temperatureLevel()).isEqualTo(TemperatureLevel.LOW);
        assertThat(code.humidityLevel()).isEqualTo(HumidityLevel.LOW);
        assertThat(code.rainLevel()).isEqualTo(RainLevel.RAIN);
    }

    @Test
    public void 하나의_예보가_있을때_저온_보통습도_비없음() {
        ShortTermWeatherForecast fcst = ShortTermWeatherForecast.builder()
                .temperature(저온)
                .humidity(보통습도)
                .precipitation(비없음)
                .build();
        WeatherConditionCode code = WeatherConditionCode.of(List.of(fcst));

        assertThat(code.temperatureLevel()).isEqualTo(TemperatureLevel.LOW);
        assertThat(code.humidityLevel()).isEqualTo(HumidityLevel.MID);
        assertThat(code.rainLevel()).isEqualTo(RainLevel.NONE);
    }

    @Test
    public void 하나의_예보가_있을때_저온_보통습도_비있음() {
        ShortTermWeatherForecast fcst = ShortTermWeatherForecast.builder()
                .temperature(저온)
                .humidity(보통습도)
                .precipitation(비있음)
                .build();
        WeatherConditionCode code = WeatherConditionCode.of(List.of(fcst));

        assertThat(code.temperatureLevel()).isEqualTo(TemperatureLevel.LOW);
        assertThat(code.humidityLevel()).isEqualTo(HumidityLevel.MID);
        assertThat(code.rainLevel()).isEqualTo(RainLevel.RAIN);
    }

    @Test
    public void 하나의_예보가_있을때_저온_다습_비없음() {
        ShortTermWeatherForecast fcst = ShortTermWeatherForecast.builder()
                .temperature(저온)
                .humidity(다습)
                .precipitation(비없음)
                .build();
        WeatherConditionCode code = WeatherConditionCode.of(List.of(fcst));

        assertThat(code.temperatureLevel()).isEqualTo(TemperatureLevel.LOW);
        assertThat(code.humidityLevel()).isEqualTo(HumidityLevel.HIGH);
        assertThat(code.rainLevel()).isEqualTo(RainLevel.NONE);
    }

    @Test
    public void 하나의_예보가_있을때_저온_다습_비있음() {
        ShortTermWeatherForecast fcst = ShortTermWeatherForecast.builder()
                .temperature(저온)
                .humidity(다습)
                .precipitation(비있음)
                .build();
        WeatherConditionCode code = WeatherConditionCode.of(List.of(fcst));

        assertThat(code.temperatureLevel()).isEqualTo(TemperatureLevel.LOW);
        assertThat(code.humidityLevel()).isEqualTo(HumidityLevel.HIGH);
        assertThat(code.rainLevel()).isEqualTo(RainLevel.RAIN);
    }

    @Test
    public void 하나의_예보가_있을때_보통기온_건조_비없음() {
        ShortTermWeatherForecast fcst = ShortTermWeatherForecast.builder()
                .temperature(보통기온)
                .humidity(건조)
                .precipitation(비없음)
                .build();
        WeatherConditionCode code = WeatherConditionCode.of(List.of(fcst));

        assertThat(code.temperatureLevel()).isEqualTo(TemperatureLevel.MID);
        assertThat(code.humidityLevel()).isEqualTo(HumidityLevel.LOW);
        assertThat(code.rainLevel()).isEqualTo(RainLevel.NONE);
    }

    @Test
    public void 하나의_예보가_있을때_보통기온_건조_비있음() {
        ShortTermWeatherForecast fcst = ShortTermWeatherForecast.builder()
                .temperature(보통기온)
                .humidity(건조)
                .precipitation(비있음)
                .build();
        WeatherConditionCode code = WeatherConditionCode.of(List.of(fcst));

        assertThat(code.temperatureLevel()).isEqualTo(TemperatureLevel.MID);
        assertThat(code.humidityLevel()).isEqualTo(HumidityLevel.LOW);
        assertThat(code.rainLevel()).isEqualTo(RainLevel.RAIN);
    }

    @Test
    public void 하나의_예보가_있을때_보통기온_보통습도_비없음() {
        ShortTermWeatherForecast fcst = ShortTermWeatherForecast.builder()
                .temperature(보통기온)
                .humidity(보통습도)
                .precipitation(비없음)
                .build();
        WeatherConditionCode code = WeatherConditionCode.of(List.of(fcst));

        assertThat(code.temperatureLevel()).isEqualTo(TemperatureLevel.MID);
        assertThat(code.humidityLevel()).isEqualTo(HumidityLevel.MID);
        assertThat(code.rainLevel()).isEqualTo(RainLevel.NONE);
    }

    @Test
    public void 하나의_예보가_있을때_보통기온_보통습도_비있음() {
        ShortTermWeatherForecast fcst = ShortTermWeatherForecast.builder()
                .temperature(보통기온)
                .humidity(보통습도)
                .precipitation(비있음)
                .build();
        WeatherConditionCode code = WeatherConditionCode.of(List.of(fcst));

        assertThat(code.temperatureLevel()).isEqualTo(TemperatureLevel.MID);
        assertThat(code.humidityLevel()).isEqualTo(HumidityLevel.MID);
        assertThat(code.rainLevel()).isEqualTo(RainLevel.RAIN);
    }

    @Test
    public void 하나의_예보가_있을때_보통기온_다습_비없음() {
        ShortTermWeatherForecast fcst = ShortTermWeatherForecast.builder()
                .temperature(보통기온)
                .humidity(다습)
                .precipitation(비없음)
                .build();
        WeatherConditionCode code = WeatherConditionCode.of(List.of(fcst));

        assertThat(code.temperatureLevel()).isEqualTo(TemperatureLevel.MID);
        assertThat(code.humidityLevel()).isEqualTo(HumidityLevel.HIGH);
        assertThat(code.rainLevel()).isEqualTo(RainLevel.NONE);
    }

    @Test
    public void 하나의_예보가_있을때_보통기온_다습_비있음() {
        ShortTermWeatherForecast fcst = ShortTermWeatherForecast.builder()
                .temperature(보통기온)
                .humidity(다습)
                .precipitation(비있음)
                .build();
        WeatherConditionCode code = WeatherConditionCode.of(List.of(fcst));

        assertThat(code.temperatureLevel()).isEqualTo(TemperatureLevel.MID);
        assertThat(code.humidityLevel()).isEqualTo(HumidityLevel.HIGH);
        assertThat(code.rainLevel()).isEqualTo(RainLevel.RAIN);
    }

// === 고온 ===

    @Test
    public void 하나의_예보가_있을때_고온_건조_비없음() {
        ShortTermWeatherForecast fcst = ShortTermWeatherForecast.builder()
                .temperature(고온)
                .humidity(건조)
                .precipitation(비없음)
                .build();
        WeatherConditionCode code = WeatherConditionCode.of(List.of(fcst));

        assertThat(code.temperatureLevel()).isEqualTo(TemperatureLevel.HIGH);
        assertThat(code.humidityLevel()).isEqualTo(HumidityLevel.LOW);
        assertThat(code.rainLevel()).isEqualTo(RainLevel.NONE);
    }

    @Test
    public void 하나의_예보가_있을때_고온_건조_비있음() {
        ShortTermWeatherForecast fcst = ShortTermWeatherForecast.builder()
                .temperature(고온)
                .humidity(건조)
                .precipitation(비있음)
                .build();
        WeatherConditionCode code = WeatherConditionCode.of(List.of(fcst));

        assertThat(code.temperatureLevel()).isEqualTo(TemperatureLevel.HIGH);
        assertThat(code.humidityLevel()).isEqualTo(HumidityLevel.LOW);
        assertThat(code.rainLevel()).isEqualTo(RainLevel.RAIN);
    }

    @Test
    public void 하나의_예보가_있을때_고온_보통습도_비없음() {
        ShortTermWeatherForecast fcst = ShortTermWeatherForecast.builder()
                .temperature(고온)
                .humidity(보통습도)
                .precipitation(비없음)
                .build();
        WeatherConditionCode code = WeatherConditionCode.of(List.of(fcst));

        assertThat(code.temperatureLevel()).isEqualTo(TemperatureLevel.HIGH);
        assertThat(code.humidityLevel()).isEqualTo(HumidityLevel.MID);
        assertThat(code.rainLevel()).isEqualTo(RainLevel.NONE);
    }

    @Test
    public void 하나의_예보가_있을때_고온_보통습도_비있음() {
        ShortTermWeatherForecast fcst = ShortTermWeatherForecast.builder()
                .temperature(고온)
                .humidity(보통습도)
                .precipitation(비있음)
                .build();
        WeatherConditionCode code = WeatherConditionCode.of(List.of(fcst));

        assertThat(code.temperatureLevel()).isEqualTo(TemperatureLevel.HIGH);
        assertThat(code.humidityLevel()).isEqualTo(HumidityLevel.MID);
        assertThat(code.rainLevel()).isEqualTo(RainLevel.RAIN);
    }

    @Test
    public void 하나의_예보가_있을때_고온_다습_비없음() {
        ShortTermWeatherForecast fcst = ShortTermWeatherForecast.builder()
                .temperature(고온)
                .humidity(다습)
                .precipitation(비없음)
                .build();
        WeatherConditionCode code = WeatherConditionCode.of(List.of(fcst));

        assertThat(code.temperatureLevel()).isEqualTo(TemperatureLevel.HIGH);
        assertThat(code.humidityLevel()).isEqualTo(HumidityLevel.HIGH);
        assertThat(code.rainLevel()).isEqualTo(RainLevel.NONE);
    }

    @Test
    public void 하나의_예보가_있을때_고온_다습_비있음() {
        ShortTermWeatherForecast fcst = ShortTermWeatherForecast.builder()
                .temperature(고온)
                .humidity(다습)
                .precipitation(비있음)
                .build();
        WeatherConditionCode code = WeatherConditionCode.of(List.of(fcst));

        assertThat(code.temperatureLevel()).isEqualTo(TemperatureLevel.HIGH);
        assertThat(code.humidityLevel()).isEqualTo(HumidityLevel.HIGH);
        assertThat(code.rainLevel()).isEqualTo(RainLevel.RAIN);
    }

    @Test
    void 기온_LOW_습도_LOW_비없음() {
        var fcstList = getFcstList(저온, 건조, 비없음, 10);
        fcstList.addAll(getFcstList(고온, 다습, 비없음, 3));
        var expected = WeatherConditionCode.of(fcstList);

        assertThat(expected.temperatureLevel()).isEqualTo(TemperatureLevel.LOW);
        assertThat(expected.humidityLevel()).isEqualTo(HumidityLevel.LOW);
        assertThat(expected.rainLevel()).isEqualTo(RainLevel.NONE);
    }

    @Test
    void 기온_LOW_습도_LOW_비있음() {
        var fcstList = getFcstList(저온, 건조, 비없음, 10);
        fcstList.addAll(getFcstList(고온, 다습, 비있음, 3));
        var expected = WeatherConditionCode.of(fcstList);

        assertThat(expected.temperatureLevel()).isEqualTo(TemperatureLevel.LOW);
        assertThat(expected.humidityLevel()).isEqualTo(HumidityLevel.LOW);
        assertThat(expected.rainLevel()).isEqualTo(RainLevel.RAIN);
    }

    @Test
    void 기온_LOW_습도_MID_비없음() {
        var fcstList = getFcstList(저온, 보통습도, 비없음, 10);
        fcstList.addAll(getFcstList(고온, 보통습도, 비없음, 4));
        // 보통(중간)이 가장 많지만, LOW 또는 HIGH가 하나라도 있으면 LOW/HIGH 우선
        // 여기선 LOW가 하나도 없으니 보통 그대로 테스트
        var expected = WeatherConditionCode.of(fcstList);

        assertThat(expected.temperatureLevel()).isEqualTo(TemperatureLevel.LOW);
        assertThat(expected.humidityLevel()).isEqualTo(HumidityLevel.MID);
        assertThat(expected.rainLevel()).isEqualTo(RainLevel.NONE);
    }

    @Test
    void 기온_LOW_습도_MID_비있음() {
        var fcstList = getFcstList(저온, 보통습도, 비있음, 10);
        var expected = WeatherConditionCode.of(fcstList);

        assertThat(expected.temperatureLevel()).isEqualTo(TemperatureLevel.LOW);
        assertThat(expected.humidityLevel()).isEqualTo(HumidityLevel.MID);
        assertThat(expected.rainLevel()).isEqualTo(RainLevel.RAIN);
    }

    @Test
    void 기온_LOW_습도_HIGH_비없음() {
        var fcstList = getFcstList(저온, 건조, 비없음, 5);
        fcstList.addAll(getFcstList(저온, 다습, 비없음, 5));
        var expected = WeatherConditionCode.of(fcstList);

        assertThat(expected.temperatureLevel()).isEqualTo(TemperatureLevel.LOW);
        assertThat(expected.humidityLevel()).isEqualTo(HumidityLevel.HIGH); // HIGH 우선
        assertThat(expected.rainLevel()).isEqualTo(RainLevel.NONE);
    }

    @Test
    void 기온_LOW_습도_HIGH_비있음() {
        var fcstList = getFcstList(저온, 건조, 비없음, 5);
        fcstList.addAll(getFcstList(저온, 다습, 비있음, 5));
        var expected = WeatherConditionCode.of(fcstList);

        assertThat(expected.temperatureLevel()).isEqualTo(TemperatureLevel.LOW);
        assertThat(expected.humidityLevel()).isEqualTo(HumidityLevel.HIGH);
        assertThat(expected.rainLevel()).isEqualTo(RainLevel.RAIN);
    }

    @Test
    void 기온_MID_습도_LOW_비없음() {
        var fcstList = getFcstList(보통기온, 건조, 비없음, 10);
        var expected = WeatherConditionCode.of(fcstList);

        assertThat(expected.temperatureLevel()).isEqualTo(TemperatureLevel.MID);
        assertThat(expected.humidityLevel()).isEqualTo(HumidityLevel.LOW);
        assertThat(expected.rainLevel()).isEqualTo(RainLevel.NONE);
    }

    @Test
    void 기온_MID_습도_LOW_비있음() {
        var fcstList = getFcstList(보통기온, 건조, 비있음, 10);
        var expected = WeatherConditionCode.of(fcstList);

        assertThat(expected.temperatureLevel()).isEqualTo(TemperatureLevel.MID);
        assertThat(expected.humidityLevel()).isEqualTo(HumidityLevel.LOW);
        assertThat(expected.rainLevel()).isEqualTo(RainLevel.RAIN);
    }

    @Test
    void 기온_MID_습도_MID_비없음() {
        var fcstList = getFcstList(보통기온, 보통습도, 비없음, 10);
        var expected = WeatherConditionCode.of(fcstList);

        assertThat(expected.temperatureLevel()).isEqualTo(TemperatureLevel.MID);
        assertThat(expected.humidityLevel()).isEqualTo(HumidityLevel.MID);
        assertThat(expected.rainLevel()).isEqualTo(RainLevel.NONE);
    }

    @Test
    void 기온_MID_습도_MID_비있음() {
        var fcstList = getFcstList(보통기온, 보통습도, 비있음, 10);
        var expected = WeatherConditionCode.of(fcstList);

        assertThat(expected.temperatureLevel()).isEqualTo(TemperatureLevel.MID);
        assertThat(expected.humidityLevel()).isEqualTo(HumidityLevel.MID);
        assertThat(expected.rainLevel()).isEqualTo(RainLevel.RAIN);
    }

    @Test
    void 기온_MID_습도_HIGH_비없음() {
        var fcstList = getFcstList(보통기온, 보통습도, 비없음, 8);
        fcstList.addAll(getFcstList(보통기온, 다습, 비없음, 2));
        var expected = WeatherConditionCode.of(fcstList);

        assertThat(expected.temperatureLevel()).isEqualTo(TemperatureLevel.MID);
        assertThat(expected.humidityLevel()).isEqualTo(HumidityLevel.HIGH);
        assertThat(expected.rainLevel()).isEqualTo(RainLevel.NONE);
    }

    @Test
    void 기온_MID_습도_HIGH_비있음() {
        var fcstList = getFcstList(보통기온, 보통습도, 비없음, 8);
        fcstList.addAll(getFcstList(보통기온, 다습, 비있음, 2));
        var expected = WeatherConditionCode.of(fcstList);

        assertThat(expected.temperatureLevel()).isEqualTo(TemperatureLevel.MID);
        assertThat(expected.humidityLevel()).isEqualTo(HumidityLevel.HIGH);
        assertThat(expected.rainLevel()).isEqualTo(RainLevel.RAIN);
    }

    @Test
    void 기온_HIGH_습도_LOW_비없음() {
        var fcstList = getFcstList(고온, 건조, 비없음, 5);
        fcstList.addAll(getFcstList(고온, 다습, 비없음, 5)); // LOW + HIGH 섞임 → HIGH 우선
        var expected = WeatherConditionCode.of(fcstList);

        assertThat(expected.temperatureLevel()).isEqualTo(TemperatureLevel.HIGH);
        assertThat(expected.humidityLevel()).isEqualTo(HumidityLevel.HIGH);
        assertThat(expected.rainLevel()).isEqualTo(RainLevel.NONE);
    }

    @Test
    void 기온_HIGH_습도_LOW_비있음() {
        var fcstList = getFcstList(고온, 건조, 비없음, 5);
        fcstList.addAll(getFcstList(고온, 다습, 비있음, 5));
        var expected = WeatherConditionCode.of(fcstList);

        assertThat(expected.temperatureLevel()).isEqualTo(TemperatureLevel.HIGH);
        assertThat(expected.humidityLevel()).isEqualTo(HumidityLevel.HIGH);
        assertThat(expected.rainLevel()).isEqualTo(RainLevel.RAIN);
    }

    @Test
    void 기온_HIGH_습도_MID_비없음() {
        var fcstList = getFcstList(고온, 보통습도, 비없음, 8);
        fcstList.addAll(getFcstList(고온, 다습, 비없음, 2)); // MID + HIGH 혼합 → HIGH 우선
        var expected = WeatherConditionCode.of(fcstList);

        assertThat(expected.temperatureLevel()).isEqualTo(TemperatureLevel.HIGH);
        assertThat(expected.humidityLevel()).isEqualTo(HumidityLevel.HIGH);
        assertThat(expected.rainLevel()).isEqualTo(RainLevel.NONE);
    }

    @Test
    void 기온_HIGH_습도_MID_비있음() {
        var fcstList = getFcstList(고온, 보통습도, 비없음, 8);
        fcstList.addAll(getFcstList(고온, 다습, 비있음, 2));
        var expected = WeatherConditionCode.of(fcstList);

        assertThat(expected.temperatureLevel()).isEqualTo(TemperatureLevel.HIGH);
        assertThat(expected.humidityLevel()).isEqualTo(HumidityLevel.HIGH);
        assertThat(expected.rainLevel()).isEqualTo(RainLevel.RAIN);
    }

    @Test
    void 기온_HIGH_습도_HIGH_비없음() {
        var fcstList = getFcstList(고온, 다습, 비없음, 10);
        var expected = WeatherConditionCode.of(fcstList);

        assertThat(expected.temperatureLevel()).isEqualTo(TemperatureLevel.HIGH);
        assertThat(expected.humidityLevel()).isEqualTo(HumidityLevel.HIGH);
        assertThat(expected.rainLevel()).isEqualTo(RainLevel.NONE);
    }

    @Test
    void 기온_HIGH_습도_HIGH_비있음() {
        var fcstList = getFcstList(고온, 다습, 비있음, 10);
        var expected = WeatherConditionCode.of(fcstList);

        assertThat(expected.temperatureLevel()).isEqualTo(TemperatureLevel.HIGH);
        assertThat(expected.humidityLevel()).isEqualTo(HumidityLevel.HIGH);
        assertThat(expected.rainLevel()).isEqualTo(RainLevel.RAIN);
    }

}
