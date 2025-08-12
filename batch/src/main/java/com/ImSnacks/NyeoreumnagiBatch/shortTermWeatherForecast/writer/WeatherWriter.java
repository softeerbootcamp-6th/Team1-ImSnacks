package com.ImSnacks.NyeoreumnagiBatch.shortTermWeatherForecast.writer;

import com.ImSnacks.NyeoreumnagiBatch.shortTermWeatherForecast.writer.entity.ShortTermWeatherForecast;
import com.ImSnacks.NyeoreumnagiBatch.shortTermWeatherForecast.writer.dto.ShortTermWeatherDto;
import com.ImSnacks.NyeoreumnagiBatch.shortTermWeatherForecast.writer.entity.WeatherRisk;
import com.ImSnacks.NyeoreumnagiBatch.shortTermWeatherForecast.writer.entity.WeatherRiskRepository;
import lombok.extern.slf4j.Slf4j;
import com.ImSnacks.NyeoreumnagiBatch.shortTermWeatherForecast.writer.repository.ShortTermWeatherForecastRepository;
import org.springframework.batch.core.StepExecution;
import org.springframework.batch.core.StepExecutionListener;
import org.springframework.batch.core.configuration.annotation.StepScope;
import org.springframework.batch.item.Chunk;
import org.springframework.batch.item.ItemWriter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Component
@StepScope
public class WeatherWriter implements ItemWriter<ShortTermWeatherDto>, StepExecutionListener {
    @Autowired
    private ShortTermWeatherForecastRepository weatherRepository;
    @Autowired
    private WeatherRiskRepository weatherRiskRepository;

    private Long jobExecutionId;

    @Override
    public void beforeStep(StepExecution stepExecution) {
        this.jobExecutionId = stepExecution.getJobExecution().getId();
    }

    @Override
    public void write(Chunk<? extends ShortTermWeatherDto> chunk) {
        log.info("writing data...");
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
                        .snow(weatherForecastByTime.getSnow())
                        .skyStatus(weatherForecastByTime.getSkyStatus())
                        .build());
            });

            item.getWeatherRiskList().forEach(weatherRisk -> {
                weatherRisks.add(WeatherRisk.builder()
                        .name(weatherRisk.getName())
                        .jobExecutionId(jobExecutionId)
                        .startTime(weatherRisk.getStartTime())
                        .endTime(weatherRisk.getEndTime())
                        .nx(item.getNx())
                        .ny(item.getNy())
                        .build());
            });

        });
        weatherRepository.saveAll(forecasts);
        weatherRiskRepository.saveAll(weatherRisks);
    }
}
