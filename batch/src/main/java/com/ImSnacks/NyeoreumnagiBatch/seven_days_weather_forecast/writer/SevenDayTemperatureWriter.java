package com.ImSnacks.NyeoreumnagiBatch.seven_days_weather_forecast.writer;

import com.ImSnacks.NyeoreumnagiBatch.common.entity.SevenDayWeatherForecast;
import com.ImSnacks.NyeoreumnagiBatch.seven_days_weather_forecast.repository.SevenDayWeatherForecastRepository;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.batch.item.Chunk;
import org.springframework.batch.item.ItemWriter;
import org.springframework.stereotype.Component;

import java.util.List;

@Slf4j
@Component
public class SevenDayTemperatureWriter implements ItemWriter<List<SevenDayWeatherForecast>> {
    private final SevenDayWeatherForecastRepository sevenDayWeatherForecastRepository;

    public SevenDayTemperatureWriter(SevenDayWeatherForecastRepository sevenDayWeatherForecastRepository) {
        this.sevenDayWeatherForecastRepository = sevenDayWeatherForecastRepository;
    }

    @Override
    @Transactional
    public void write(Chunk<? extends List<SevenDayWeatherForecast>> chunk) {
        log.info("SevenDayTemperatureWriter writing {} chunks.", chunk.size());

        List<SevenDayWeatherForecast> flattenedList = chunk.getItems().stream()
                .flatMap(List::stream)
                .toList();

        sevenDayWeatherForecastRepository.saveAll(flattenedList);
    }
}
