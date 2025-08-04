package com.ImSnacks.NyeoreumnagiBatch;

import com.ImSnacks.NyeoreumnagiBatch.writer.*;
import com.ImSnacks.NyeoreumnagiBatch.writer.dto.ShortTermWeatherDto;
import com.ImSnacks.NyeoreumnagiBatch.writer.entity.ShortTermWeatherForecast;
import com.ImSnacks.NyeoreumnagiBatch.writer.entity.WeatherRiskRepository;
import com.ImSnacks.NyeoreumnagiBatch.writer.repository.WeatherRepository;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.batch.item.Chunk;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;

import java.time.LocalDate;
import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
@Transactional
@Rollback
class WeatherWriterTest {
    @Autowired
    private WeatherRepository weatherRepository;
    @Autowired
    private WeatherRiskRepository weatherRiskRepository;

    private WeatherWriter writer;

    @BeforeEach
    void setUp() {
        writer = new WeatherWriter(weatherRepository, weatherRiskRepository);
    }

    @Test
    void write_shouldPersistWeatherForecasts() {
        // given
        int temperature = 26;
        ShortTermWeatherDto.WeatherForecastByTime forecastByTime = createFakeWeatherForecastByTime(temperature);
        ShortTermWeatherDto weatherDto = createFakeWeatherDto(forecastByTime);


        // when
        writer.write(Chunk.of(weatherDto));

        // then
        List<ShortTermWeatherForecast> all = weatherRepository.findAll();
        assertEquals(1, all.size());
        assertEquals(temperature, all.get(0).getTemperature());
    }

    private ShortTermWeatherDto createFakeWeatherDto(ShortTermWeatherDto.WeatherForecastByTime forecastByTime) {
        return ShortTermWeatherDto.builder()
                .nx(55)
                .ny(127)
                .weatherForecastByTimeList(List.of(forecastByTime))
                .weatherRiskList(Collections.emptyList())
                .build();
    }

    private ShortTermWeatherDto.WeatherForecastByTime createFakeWeatherForecastByTime(int temperature) {
        return ShortTermWeatherDto.WeatherForecastByTime.builder()
                .temperature(temperature)
                .humidity(60)
                .windSpeed(34.5)
                .fcstTime(11)
                .precipitation(34.5)
                .build();
    }
}
