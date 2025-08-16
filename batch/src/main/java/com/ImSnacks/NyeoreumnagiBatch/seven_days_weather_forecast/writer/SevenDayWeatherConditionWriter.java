package com.ImSnacks.NyeoreumnagiBatch.seven_days_weather_forecast.writer;

import com.ImSnacks.NyeoreumnagiBatch.seven_days_weather_forecast.dto.SevenDayWeatherConditionDto;
import com.ImSnacks.NyeoreumnagiBatch.seven_days_weather_forecast.entity.MidTempRegionCode;
import com.ImSnacks.NyeoreumnagiBatch.seven_days_weather_forecast.repository.MidTempRegionCodeRepository;
import com.ImSnacks.NyeoreumnagiBatch.writer.repository.SevenDayWeatherForecastRepository;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.batch.item.Chunk;
import org.springframework.batch.item.ItemWriter;
import org.springframework.stereotype.Component;

import java.util.List;

@Slf4j
@Component
public class SevenDayWeatherConditionWriter implements ItemWriter<SevenDayWeatherConditionDto> {
    private final SevenDayWeatherForecastRepository sevenDayWeatherForecastRepository;
    private final MidTempRegionCodeRepository midTempRegionCodeRepository;

    public SevenDayWeatherConditionWriter(SevenDayWeatherForecastRepository sevenDayWeatherForecastRepository, MidTempRegionCodeRepository midTempRegionCodeRepository) {
        this.sevenDayWeatherForecastRepository = sevenDayWeatherForecastRepository;
        this.midTempRegionCodeRepository = midTempRegionCodeRepository;
    }

    @Override
    @Transactional
    public void write(Chunk<? extends SevenDayWeatherConditionDto> chunk) {
        log.info("Write Chunk size: {}", chunk.size());


        chunk.getItems().forEach(item -> item.byDayDto().forEach(byDayDto ->
        {
            List<MidTempRegionCode> midTempRegionCodes = midTempRegionCodeRepository.findByLandRegionCode_RegId(byDayDto.regionCode());
            for(MidTempRegionCode code: midTempRegionCodes){
                sevenDayWeatherForecastRepository.updateWeatherByRegionAndDateTime(code.getRegionCode(), byDayDto.date(), byDayDto.weatherCondition());
            }
        }));
    }
}
