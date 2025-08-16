package com.ImSnacks.NyeoreumnagiBatch.DailyTemperature.processor;

import com.ImSnacks.NyeoreumnagiBatch.DailyTemperature.processor.dto.DailyTemperatureProcessorResponseDto;
import com.ImSnacks.NyeoreumnagiBatch.DailyTemperature.reader.dto.DailyTemperatureReaderResponseDto;
import com.ImSnacks.NyeoreumnagiBatch.common.enums.WeatherCondition;
import lombok.extern.slf4j.Slf4j;
import org.springframework.batch.item.ItemProcessor;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Component
public class DailyTemperatureProcessor implements ItemProcessor<DailyTemperatureReaderResponseDto, DailyTemperatureProcessorResponseDto> {
    @Override
    public DailyTemperatureProcessorResponseDto process(DailyTemperatureReaderResponseDto item) throws Exception {
        log.info("Processing Daily Temperature Processor");

        int nx = item.items().get(0).getNx();
        int ny = item.items().get(0).getNy();

        List<DailyTemperatureProcessorResponseDto.TemperaturePerTime> temperaturePerTimeList = new ArrayList<>();
//        item.items().forEach(i -> {
//            int temperature = i.getTemperature();
//            int fcstTime = i.getFcstTime();
//            WeatherCondition weatherCondition =
//        })

        return null;
    }
}
