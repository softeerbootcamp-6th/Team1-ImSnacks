package com.ImSnacks.NyeoreumnagiBatch.writer;

import com.ImSnacks.NyeoreumnagiBatch.writer.dto.ShortTermWeatherDto;
import com.ImSnacks.NyeoreumnagiBatch.writer.entity.ShortTermWeatherForecast;
import com.ImSnacks.NyeoreumnagiBatch.writer.entity.WeatherRisk;
import com.ImSnacks.NyeoreumnagiBatch.writer.entity.WeatherRiskRepository;
import com.ImSnacks.NyeoreumnagiBatch.writer.repository.WeatherRepository;
import org.springframework.batch.core.configuration.annotation.StepScope;
import org.springframework.batch.item.Chunk;
import org.springframework.batch.item.ItemWriter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Component
@StepScope
public class WeatherWriter implements ItemWriter<ShortTermWeatherDto> {

    @Autowired
    private WeatherRepository weatherRepository;
    @Autowired
    private WeatherRiskRepository weatherRiskRepository;

    private final String baseDate;

    WeatherWriter(@Value("#{jobParameters['base_date']}") String baseDate)
    {
        this.baseDate = baseDate;
    }

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
                                .fcstDate(LocalDate.parse(baseDate, DateTimeFormatter.ofPattern("yyyyMMdd")))
                        .startTime(weatherRisk.getStartTime())
                        .endTime(weatherRisk.getEndTime())
                        .build());
            });

        });
        weatherRepository.saveAll(forecasts);
        weatherRiskRepository.saveAll(weatherRisks);
    }
}
