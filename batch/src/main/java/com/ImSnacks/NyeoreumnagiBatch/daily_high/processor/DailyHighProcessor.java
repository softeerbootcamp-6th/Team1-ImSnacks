package com.ImSnacks.NyeoreumnagiBatch.daily_high.processor;

import com.ImSnacks.NyeoreumnagiBatch.daily_high.processor.dto.DailyHighProcessorResponseDto;
import com.ImSnacks.NyeoreumnagiBatch.daily_high.reader.dto.DailyHighReaderResponseDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.batch.item.ItemProcessor;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class DailyHighProcessor implements ItemProcessor<DailyHighReaderResponseDto, DailyHighProcessorResponseDto> {
    @Override
    public DailyHighProcessorResponseDto process(DailyHighReaderResponseDto item) throws Exception {
        return null;
    }
}
