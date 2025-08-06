package com.ImSnacks.NyeoreumnagiBatch.writer;

import com.ImSnacks.NyeoreumnagiBatch.writer.dto.ShortTermWeatherDto;
import com.ImSnacks.NyeoreumnagiBatch.writer.entity.ShortTermWeatherForecast;
import com.ImSnacks.NyeoreumnagiBatch.writer.entity.WeatherRisk;
import com.ImSnacks.NyeoreumnagiBatch.writer.entity.WeatherRiskRepository;
import com.ImSnacks.NyeoreumnagiBatch.writer.repository.WeatherRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.batch.item.Chunk;
import org.springframework.batch.item.ItemWriter;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
@RequiredArgsConstructor
public class WeatherWriter implements ItemWriter<ShortTermWeatherDto> {

    private final WeatherRepository weatherRepository;
    private final WeatherRiskRepository weatherRiskRepository;

    @Override
    public void write(Chunk<? extends ShortTermWeatherDto> chunk)  {
        List<ShortTermWeatherForecast> forecasts = new ArrayList<>();
        List<WeatherRisk> weatherRisks = new ArrayList<>();

        List<? extends ShortTermWeatherDto> items = chunk.getItems();
        items.forEach(item -> {
            item.getWeatherForecastByTimeList().forEach(weatherForecastByTime -> {
                forecasts.add(ShortTermWeatherForecast.builder()
                        .nx(item.getNx())
                        .ny(item.getNy())
                        .fcstTime(weatherForecastByTime.getFcstTime())
                        .precipitation(weatherForecastByTime.getPrecipitation())
                        .temperature(weatherForecastByTime.getTemperature())
                        .humidity(weatherForecastByTime.getHumidity())
                        .windSpeed(weatherForecastByTime.getWindSpeed())
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
