package com.ImSnacks.NyeoreumnagiBatch.shortTermWeatherForecast.processor;

import com.ImSnacks.NyeoreumnagiBatch.common.entity.UniqueNxNy;
import com.ImSnacks.NyeoreumnagiBatch.shortTermWeatherForecast.reader.ApiCaller;
import com.ImSnacks.NyeoreumnagiBatch.shortTermWeatherForecast.reader.dto.VilageFcstResponseDto;
import com.ImSnacks.NyeoreumnagiBatch.shortTermWeatherForecast.writer.dto.ShortTermWeatherDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.batch.core.configuration.annotation.StepScope;
import org.springframework.batch.item.ItemProcessor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Slf4j
@RequiredArgsConstructor
@StepScope
@Component
public class ImprovedWeatherProcessor implements ItemProcessor<UniqueNxNy, ShortTermWeatherDto> {

    private final WeatherProcessor processor;
    //private final AsyncApiCaller apiCaller;
    @Autowired
    private final ApiCaller apiCaller;
    @Value("#{jobParameters['base_date']}")
    private String baseDate;
    @Value("#{jobParameters['base_time']}")
    private String baseTime;

    @Override
    public ShortTermWeatherDto process(UniqueNxNy loc) throws Exception {
        int nx = loc.getId().getNx();
        int ny = loc.getId().getNy();

        log.info("Processing nx={}, ny={} with Thread: {}", nx, ny, Thread.currentThread().getName());

        VilageFcstResponseDto response = apiCaller.call(baseDate, baseTime, nx, ny);
        if (response == null || response.getWeatherInfo() == null || response.getWeatherInfo().isEmpty()) {
            log.warn("API response is empty for nx={}, ny={}", loc.getId().getNx(), loc.getId().getNy());
            return null; // Writer로 전달하지 않고 건너뜀
        }

        return processor.process(response);
    }

}
