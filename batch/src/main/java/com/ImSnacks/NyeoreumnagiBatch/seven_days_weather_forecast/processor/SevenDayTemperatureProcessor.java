package com.ImSnacks.NyeoreumnagiBatch.seven_days_weather_forecast.processor;

import com.ImSnacks.NyeoreumnagiBatch.common.entity.SevenDayWeatherForecast;
import com.ImSnacks.NyeoreumnagiBatch.seven_days_weather_forecast.dto.SevenDayTemperatureForecastResponseDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.batch.core.configuration.annotation.StepScope;
import org.springframework.batch.item.ItemProcessor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Component
@StepScope
public class SevenDayTemperatureProcessor implements ItemProcessor<SevenDayTemperatureForecastResponseDto, List<SevenDayWeatherForecast>> {
    private final String baseDate;

    SevenDayTemperatureProcessor(@Value("#{jobParameters['base_date']}") String baseDate) {
        this.baseDate = baseDate;
    }

    @Override
    public List<SevenDayWeatherForecast> process(SevenDayTemperatureForecastResponseDto dto) throws Exception {
        log.info("Processing SevenDay Weather Forecast Data into Entity List");
        SevenDayTemperatureForecastResponseDto.Item sevenDayTemperatureInfo = dto.getSevenDayTemperatureInfo();
        List<SevenDayWeatherForecast> forecastList = new ArrayList<>();
        LocalDate startDate = LocalDate.parse(baseDate, DateTimeFormatter.ofPattern("yyyyMMdd"));

        for (int i = 4; i <= 10; i++) {
            LocalDate forecastDate = startDate.plusDays(i);
            forecastList.add(new SevenDayWeatherForecast(
                    sevenDayTemperatureInfo.regId(),
                    forecastDate,
                    sevenDayTemperatureInfo.getNextDayTemperatureStatus(i).getSecond(),
                    sevenDayTemperatureInfo.getNextDayTemperatureStatus(i).getFirst(),
                    null
            ));
        }
        return forecastList;
    }
}
