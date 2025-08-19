package com.ImSnacks.NyeoreumnagiBatch.seven_days_weather_forecast.reader;

import com.ImSnacks.NyeoreumnagiBatch.common.repository.UniqueNxNyRepository;
import com.ImSnacks.NyeoreumnagiBatch.seven_days_weather_forecast.dto.SevenDayWeatherForecastResponseDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.batch.core.configuration.annotation.StepScope;
import org.springframework.batch.item.ItemReader;
import org.springframework.batch.item.NonTransientResourceException;
import org.springframework.batch.item.ParseException;
import org.springframework.batch.item.UnexpectedInputException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.List;

@Slf4j
@Component
@StepScope
public class SevenDayWeatherConditionReader implements ItemReader<SevenDayWeatherForecastResponseDto> {
    private final UniqueNxNyRepository uniqueNxNyRepository;
    private static List<String> regCodes = null;
    private final SevenDaysApiCaller apiCaller;
    private static int index = 0;
    private final String baseDate;

    SevenDayWeatherConditionReader(@Value("#{jobParameters['base_date']}") String baseDate,
                                   SevenDaysApiCaller apiCaller,
                                   UniqueNxNyRepository uniqueNxNyRepository)
    {
        this.baseDate = baseDate;
        this.uniqueNxNyRepository = uniqueNxNyRepository;
        this.apiCaller = apiCaller;
    }

    @Override
    public SevenDayWeatherForecastResponseDto read() throws UnexpectedInputException, ParseException, NonTransientResourceException, IOException, InterruptedException {
        log.info("Reading SevenDay Weather Forecast Data");
        if (regCodes == null){
            setRegionCodes();
        }
        if (index >= regCodes.size()) {
            return null;
        }

        String regCode = regCodes.get(index);
        index++;

        try {
            log.info("regCode : {}", regCode);
            return apiCaller.callMidRangeWeatherCondition(baseDate, regCode);

        } catch (Exception e) {
            log.error("API 호출 중 오류!", e);
            throw e;
        }
    }

    private void setRegionCodes(){
        if(regCodes == null) {
            regCodes = uniqueNxNyRepository.findAll().stream().map(
                    nxny -> nxny.getRegionCode().getRegionCode()
            ).toList();
        }
    }
}
