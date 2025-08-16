package com.ImSnacks.NyeoreumnagiBatch.dailyTemperature.writer;

import com.ImSnacks.NyeoreumnagiBatch.common.entity.DashboardWeatherForecast;
import com.ImSnacks.NyeoreumnagiBatch.common.repository.DashboardWeatherForecastRepository;
import com.ImSnacks.NyeoreumnagiBatch.dailyTemperature.processor.dto.DailyTemperatureProcessorResponseDto;
import com.ImSnacks.NyeoreumnagiBatch.daily_high.processor.dto.DailyHighProcessorResponseDto;
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
public class DailyTemperatureWriter implements ItemWriter<DailyTemperatureProcessorResponseDto> {

    private final DashboardWeatherForecastRepository dashboardWeatherForecastRepository;

    @Override
    public void write(Chunk<? extends DailyTemperatureProcessorResponseDto> chunk) throws Exception {
        log.info("Writing Daily Temperature started");

        List<? extends DailyTemperatureProcessorResponseDto> items = chunk.getItems();

        List<DashboardWeatherForecast> result = new ArrayList<>();
        for (DailyTemperatureProcessorResponseDto item : items) {
            for(DailyTemperatureProcessorResponseDto.TemperaturePerTime dto : item.temperaturePerTime()){
                result.add(new DashboardWeatherForecast(item.nx(), item.ny(), dto.fcstTime(), dto.temperature(), dto.weatherCondition()));
            }
        }
        dashboardWeatherForecastRepository.saveAll(result);
    }
}
