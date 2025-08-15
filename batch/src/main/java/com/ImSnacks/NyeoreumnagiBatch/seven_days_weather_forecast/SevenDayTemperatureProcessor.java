package com.ImSnacks.NyeoreumnagiBatch.seven_days_weather_forecast;

import com.ImSnacks.NyeoreumnagiBatch.seven_days_weather_forecast.dto.SevenDayTemperatureForecastDto;
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
public class SevenDayTemperatureProcessor implements ItemProcessor<SevenDayTemperatureForecastResponseDto, SevenDayTemperatureForecastDto> {
    private final String baseDate;

    SevenDayTemperatureProcessor(@Value("#{jobParameters['base_date']}") String baseDate) {
        this.baseDate = baseDate;
    }

    @Override
    public SevenDayTemperatureForecastDto process(SevenDayTemperatureForecastResponseDto dto) throws Exception {
        log.info("Processing SevenDay Weather Forecast Data");
        SevenDayTemperatureForecastResponseDto.Item sevenDayTemperatureInfo = dto.getSevenDayTemperatureInfo();
        List<SevenDayTemperatureForecastDto.ByDayDto> byDayDtoList = new ArrayList<>();

        for (int i = 4; i <= 10; i++) {
            LocalDate date = LocalDate.parse(baseDate, DateTimeFormatter.ofPattern("yyyyMMdd")).plusDays(i);
            byDayDtoList.add(new SevenDayTemperatureForecastDto.ByDayDto(
                    sevenDayTemperatureInfo.regId(),
                    date,
                    sevenDayTemperatureInfo.getNextDayTemperatureStatus(i).getSecond(),
                    sevenDayTemperatureInfo.getNextDayTemperatureStatus(i).getFirst()
            ));
        }
        return new SevenDayTemperatureForecastDto(byDayDtoList);
    }
}
