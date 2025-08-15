package com.ImSnacks.NyeoreumnagiBatch.seven_days_weather_forecast;

import com.ImSnacks.NyeoreumnagiBatch.seven_days_weather_forecast.dto.SevenDayWeatherForecastResponseDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.batch.core.configuration.annotation.StepScope;
import org.springframework.batch.item.ItemReader;
import org.springframework.batch.item.NonTransientResourceException;
import org.springframework.batch.item.ParseException;
import org.springframework.batch.item.UnexpectedInputException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.List;

@Slf4j
@Component
@StepScope
public class SevenDayWeatherConditionReader implements ItemReader<SevenDayWeatherForecastResponseDto> {
    private final JdbcTemplate jdbcTemplate;
    private static List<String> regCodes = null;
    private final SevenDaysApiCaller apiCaller;
    private static int index = 0;
    private final String baseDate;

    SevenDayWeatherConditionReader(@Value("#{jobParameters['base_date']}") String baseDate,
                                   SevenDaysApiCaller apiCaller,
                                   JdbcTemplate jdbcTemplate)
    {
        this.baseDate = baseDate;
        this.jdbcTemplate = jdbcTemplate;
        this.apiCaller = apiCaller;
    }

    @Override
    public SevenDayWeatherForecastResponseDto read() throws UnexpectedInputException, ParseException, NonTransientResourceException, IOException, InterruptedException {
        log.info("Reading SevenDay Weather Forecast Data");
        if (regCodes == null){
            regCodes = jdbcTemplate.query(
                    "SELECT reg_id FROM MID_LAND_FORECAST_REGION_CODE",
                    (rs, rowNum) -> rs.getString("reg_id")
            );
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
}
