package com.ImSnacks.NyeoreumnagiBatch.writer;

import com.ImSnacks.NyeoreumnagiBatch.writer.dto.ShortTermWeatherDto;
import com.ImSnacks.NyeoreumnagiBatch.writer.entity.WeatherRisk;
import com.ImSnacks.NyeoreumnagiBatch.writer.entity.WeatherRiskRepository;
import com.ImSnacks.NyeoreumnagiBatch.writer.repository.WeatherRepository;
import org.springframework.batch.core.StepExecution;
import org.springframework.batch.core.StepExecutionListener;
import org.springframework.batch.core.configuration.annotation.StepScope;
import org.springframework.batch.item.Chunk;
import org.springframework.batch.item.ItemWriter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
@StepScope
public class WeatherWriter implements ItemWriter<ShortTermWeatherDto>, StepExecutionListener {
    @Autowired
    private WeatherRepository weatherRepository;
    @Autowired
    private WeatherRiskRepository weatherRiskRepository;

    private Long jobExecutionId;

    @Override
    public void beforeStep(StepExecution stepExecution) {
        this.jobExecutionId = stepExecution.getJobExecution().getId();
    }

    @Override
    public void write(Chunk<? extends ShortTermWeatherDto> chunk) {
        List<ShortTermWeatherForecast> forecasts = new ArrayList<>();
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
