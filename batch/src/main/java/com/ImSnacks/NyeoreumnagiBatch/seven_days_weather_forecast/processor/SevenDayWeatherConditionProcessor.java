package com.ImSnacks.NyeoreumnagiBatch.seven_days_weather_forecast.processor;

import com.ImSnacks.NyeoreumnagiBatch.seven_days_weather_forecast.dto.SevenDayWeatherForecastResponseDto;
import com.ImSnacks.NyeoreumnagiBatch.seven_days_weather_forecast.dto.SevenDayWeatherConditionDto;
import com.ImSnacks.NyeoreumnagiBatch.common.enums.WeatherCondition;
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
public class SevenDayWeatherConditionProcessor implements ItemProcessor<SevenDayWeatherForecastResponseDto, SevenDayWeatherConditionDto> {
    private final String baseDate;

    SevenDayWeatherConditionProcessor(@Value("#{jobParameters['base_date']}") String baseDate) {
        this.baseDate = baseDate;
    }

    @Override
    public SevenDayWeatherConditionDto process(SevenDayWeatherForecastResponseDto dto) {
        log.info("Processing SevenDay Weather Forecast Data");
        SevenDayWeatherForecastResponseDto.Item sevenDayWeatherInfo = dto.getSevenDayWeatherInfo();
        List<SevenDayWeatherConditionDto.ByDayDto> byDayDtoList = getSevenDayWeatherConditionFromToday(sevenDayWeatherInfo);
        return new SevenDayWeatherConditionDto(byDayDtoList);
    }

    private List<SevenDayWeatherConditionDto.ByDayDto> getSevenDayWeatherConditionFromToday(SevenDayWeatherForecastResponseDto.Item sevenDayWeatherInfo) {
        List<SevenDayWeatherConditionDto.ByDayDto> byDayDtoList = new ArrayList<>();

        for (int i = 4; i <= 10; i++) {
            LocalDate date = LocalDate.parse(baseDate, DateTimeFormatter.ofPattern("yyyyMMdd")).plusDays(i);
            byDayDtoList.add(new SevenDayWeatherConditionDto.ByDayDto(
                    sevenDayWeatherInfo.regId(),
                    date,
                    WeatherCondition.fromApiString(sevenDayWeatherInfo.getNextDayWeatherStatus(i))
            ));
        }
        return byDayDtoList;
    }
}
