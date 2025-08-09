package com.ImSnacks.NyeoreumnagiBatch;

import com.ImSnacks.NyeoreumnagiBatch.writer.*;
import com.ImSnacks.NyeoreumnagiBatch.writer.dto.ShortTermWeatherDto;
import com.ImSnacks.NyeoreumnagiBatch.writer.entity.WeatherRiskRepository;
import com.ImSnacks.NyeoreumnagiBatch.writer.repository.ShortTermWeatherForecast;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.batch.item.Chunk;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
class WeatherWriterTest {
    @Autowired
    private ShortTermWeatherForecast weatherRepository;
    @Autowired
    private WeatherRiskRepository weatherRiskRepository;

    private WeatherWriter writer;

    @BeforeEach
    void setUp() {
        writer = new WeatherWriter(weatherRepository, weatherRiskRepository);
    }

    @AfterEach
    void tearDown() {
        weatherRepository.deleteAll();
        weatherRiskRepository.deleteAll();
    }

    @Test
    void write_shouldPersistWeatherForecasts() {
        // given
        int temperature = 26;
        ShortTermWeatherDto.WeatherForecastByTimeDto forecastByTime = createFakeWeatherForecastByTime(temperature);
        ShortTermWeatherDto weatherDto = createFakeWeatherDto(forecastByTime);


        // when
        writer.write(Chunk.of(weatherDto));

        // then
        List<com.ImSnacks.NyeoreumnagiBatch.writer.entity.ShortTermWeatherForecast> all = weatherRepository.findAll();
        assertEquals(1, all.size());
        assertEquals(temperature, all.get(0).getTemperature());
    }

    private ShortTermWeatherDto createFakeWeatherDto(ShortTermWeatherDto.WeatherForecastByTimeDto forecastByTime) {
        return ShortTermWeatherDto.builder()
                .nx(55)
                .ny(127)
                .weatherForecastByTimeList(List.of(forecastByTime))
                .weatherRiskList(Collections.emptyList())
                .build();
    }

    private ShortTermWeatherDto.WeatherForecastByTimeDto createFakeWeatherForecastByTime(int temperature) {
        return ShortTermWeatherDto.WeatherForecastByTimeDto.builder()
                .temperature(temperature)
                .humidity(60)
                .windSpeed(34.5)
                .fcstTime(11)
                .precipitation(34.5)
                .build();
    }
}
