package com.ImSnacks.NyeoreumnagiBatch.seven_days_weather_forecast.writer;

import com.ImSnacks.NyeoreumnagiBatch.seven_days_weather_forecast.dto.SevenDayTemperatureForecastDto;
import com.ImSnacks.NyeoreumnagiBatch.writer.entity.SevenDayWeatherForecast;
import com.ImSnacks.NyeoreumnagiBatch.writer.repository.SevenDayWeatherForecastRepository;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.batch.item.Chunk;
import org.springframework.batch.item.ItemWriter;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Component
public class SevenDayTemperatureWriter implements ItemWriter<SevenDayTemperatureForecastDto> {
    private final SevenDayWeatherForecastRepository sevenDayWeatherForecastRepository;

    public SevenDayTemperatureWriter(SevenDayWeatherForecastRepository sevenDayWeatherForecastRepository) {
        this.sevenDayWeatherForecastRepository = sevenDayWeatherForecastRepository;
    }

    @Override
    @Transactional
    public void write(Chunk<? extends SevenDayTemperatureForecastDto> chunk) throws Exception {
        log.info("SevenDayTemperatureWriter Chunk size: {}", chunk.size());
        List<SevenDayWeatherForecast> sevenDayWeatherForecasts = new ArrayList<>();

        chunk.getItems().forEach(item -> sevenDayWeatherForecasts.addAll(item.byDayDto().stream().map(dto -> new SevenDayWeatherForecast(
                dto.regionCode(),
                dto.date(),
                dto.maxTemperature(),
                dto.minTemperature(),
                null
        )).toList()));
        sevenDayWeatherForecastRepository.saveAll(sevenDayWeatherForecasts);
    }
}
