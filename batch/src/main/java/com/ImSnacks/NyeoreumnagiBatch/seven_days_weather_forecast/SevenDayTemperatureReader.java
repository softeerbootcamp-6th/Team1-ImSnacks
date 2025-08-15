package com.ImSnacks.NyeoreumnagiBatch.seven_days_weather_forecast;

import com.ImSnacks.NyeoreumnagiBatch.seven_days_weather_forecast.dto.SevenDayTemperatureForecastResponseDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.batch.core.configuration.annotation.StepScope;
import org.springframework.batch.item.ItemReader;
import org.springframework.batch.item.NonTransientResourceException;
import org.springframework.batch.item.ParseException;
import org.springframework.batch.item.UnexpectedInputException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import java.util.List;

@Slf4j
@Component
@StepScope
public class SevenDayTemperatureReader implements ItemReader<SevenDayTemperatureForecastResponseDto> {
    private final JdbcTemplate jdbcTemplate;
    private static List<String> midTempRegionCodes = null;
    private final SevenDaysApiCaller apiCaller;
    private static int index = 0;
    private final String baseDate;

    SevenDayTemperatureReader(@Value("#{jobParameters['base_date']}") String baseDate,
                                   SevenDaysApiCaller apiCaller,
                                   JdbcTemplate jdbcTemplate)
    {
        this.baseDate = baseDate;
        this.jdbcTemplate = jdbcTemplate;
        this.apiCaller = apiCaller;
    }

    @Override
    public SevenDayTemperatureForecastResponseDto read() throws Exception, UnexpectedInputException, ParseException, NonTransientResourceException {
        log.info("Reading SevenDay Temperature Forecast Data");
        Thread.sleep(2000);
        if (midTempRegionCodes == null){
            midTempRegionCodes = jdbcTemplate.query(
                    "SELECT region_code FROM MID_TEMP_REGION_CODE",
                    (rs, rowNum) -> rs.getString("region_code"));
            log.info("midTempRegionCodes.size() : {}", midTempRegionCodes.size());
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
}
