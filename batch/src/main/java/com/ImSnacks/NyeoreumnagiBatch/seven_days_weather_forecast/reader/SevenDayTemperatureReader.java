package com.ImSnacks.NyeoreumnagiBatch.seven_days_weather_forecast.reader;

import com.ImSnacks.NyeoreumnagiBatch.seven_days_weather_forecast.dto.SevenDayTemperatureForecastResponseDto;
import com.ImSnacks.NyeoreumnagiBatch.seven_days_weather_forecast.entity.MidTempRegionCode;
import com.ImSnacks.NyeoreumnagiBatch.seven_days_weather_forecast.repository.MidTempRegionCodeRepository;
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
public class SevenDayTemperatureReader implements ItemReader<SevenDayTemperatureForecastResponseDto> {
    private final MidTempRegionCodeRepository midTempRegionCodeRepository;
    private static List<String> midTempRegionCodes = null;
    private final SevenDaysApiCaller apiCaller;
    private int index = 0;
    private final String baseDate;

    SevenDayTemperatureReader(@Value("#{jobParameters['base_date']}") String baseDate,
                                   SevenDaysApiCaller apiCaller,
                              MidTempRegionCodeRepository midTempRegionCodeRepository)
    {
        this.baseDate = baseDate;
        this.midTempRegionCodeRepository = midTempRegionCodeRepository;
        this.apiCaller = apiCaller;
    }

    @Override
    public SevenDayTemperatureForecastResponseDto read() throws UnexpectedInputException, ParseException, NonTransientResourceException, InterruptedException, IOException {
        log.info("Reading SevenDay Temperature Forecast Data");
        Thread.sleep(2000);
        if (midTempRegionCodes == null){
            setNxNy();
        }
        if (index >= midTempRegionCodes.size()) {
            return null;
        }

        String regCode = midTempRegionCodes.get(index);
        index++;

        try {
            log.info("regCode : {}", regCode);

            return apiCaller.callMidRangeTemperature(baseDate, regCode);
        } catch (Exception e) {
            log.error("API 호출 중 오류!", e);
            throw e;
        }
    }

    private void setNxNy() {
        List<MidTempRegionCode> all = midTempRegionCodeRepository.findAll();
        midTempRegionCodes = all.stream().map(a -> a.getRegionCode()).toList();
    }
}
