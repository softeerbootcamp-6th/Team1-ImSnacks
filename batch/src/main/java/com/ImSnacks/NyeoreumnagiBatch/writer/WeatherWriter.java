package com.ImSnacks.NyeoreumnagiBatch.writer;

import com.ImSnacks.NyeoreumnagiBatch.writer.dto.ShortTermWeatherDto;
import com.ImSnacks.NyeoreumnagiBatch.writer.entity.WeatherRisk;
import com.ImSnacks.NyeoreumnagiBatch.writer.entity.WeatherRiskRepository;
import com.ImSnacks.NyeoreumnagiBatch.writer.repository.ShortTermWeatherForecast;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.batch.item.Chunk;
import org.springframework.batch.item.ItemWriter;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Component
@RequiredArgsConstructor
public class WeatherWriter implements ItemWriter<ShortTermWeatherDto> {

    private final ShortTermWeatherForecast weatherRepository;
    private final WeatherRiskRepository weatherRiskRepository;

    @Override
    public void write(Chunk<? extends ShortTermWeatherDto> chunk)  {
        log.info("writing data...");
        List<com.ImSnacks.NyeoreumnagiBatch.writer.entity.ShortTermWeatherForecast> forecasts = new ArrayList<>();
        List<WeatherRisk> weatherRisks = new ArrayList<>();

        List<? extends ShortTermWeatherDto> items = chunk.getItems();
        items.forEach(item -> {
            item.getWeatherForecastByTimeList().forEach(weatherForecastByTime -> {
                forecasts.add(com.ImSnacks.NyeoreumnagiBatch.writer.entity.ShortTermWeatherForecast.builder()
                        .nx(item.getNx())
                        .ny(item.getNy())
                        .fcstTime(weatherForecastByTime.getFcstTime())
                        .precipitation(weatherForecastByTime.getPrecipitation())
                        .temperature(weatherForecastByTime.getTemperature())
                        .humidity(weatherForecastByTime.getHumidity())
                        .windSpeed(weatherForecastByTime.getWindSpeed())
                        .snow(weatherForecastByTime.getSnow())
                        .skyStatus(weatherForecastByTime.getSkyStatus())
                        .build());
            });

            item.getWeatherRiskList().forEach(weatherRisk -> {
                weatherRisks.add(WeatherRisk.builder()
                        .name(weatherRisk.getName())
                        .startTime(weatherRisk.getStartTime())
                        .endTime(weatherRisk.getEndTime())
                        .build());
            });

        });
        weatherRepository.saveAll(forecasts);
        weatherRiskRepository.saveAll(weatherRisks);
    }
}
