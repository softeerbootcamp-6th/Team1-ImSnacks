package com.ImSnacks.NyeoreumnagiBatch.dailyTemperature.writer;

import com.ImSnacks.NyeoreumnagiBatch.dailyTemperature.processor.dto.DailyTemperatureProcessorResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.batch.item.Chunk;
import org.springframework.batch.item.ItemWriter;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class DailyTemperatureWriter implements ItemWriter<DailyTemperatureProcessorResponseDto> {

    @Override
    public void write(Chunk<? extends DailyTemperatureProcessorResponseDto> chunk) throws Exception {

    }
}
