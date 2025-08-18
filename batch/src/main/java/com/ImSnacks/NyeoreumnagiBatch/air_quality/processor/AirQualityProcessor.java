package com.ImSnacks.NyeoreumnagiBatch.air_quality.processor;

import com.ImSnacks.NyeoreumnagiBatch.air_quality.processor.dto.AirQualityResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.batch.core.configuration.annotation.StepScope;
import org.springframework.batch.item.ItemProcessor;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@StepScope
public class AirQualityProcessor implements ItemProcessor<AirQualityResponse, AirQualityResponse> {
    @Override
    public AirQualityResponse process(AirQualityResponse dto) throws Exception {
        log.info("Processing Air Quality API Request");

        return new AirQualityResponse(
                dto.stationName(),
                dto.pm10Grade(),
                dto.pm10Value(),
                dto.pm25Grade(),
                dto.pm25Value()
        );

    }
}
