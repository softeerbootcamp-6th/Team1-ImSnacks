package com.ImSnacks.NyeoreumnagiBatch.ultraviolet.processor;

import com.ImSnacks.NyeoreumnagiBatch.ultraviolet.processor.dto.UVProcessorResponseDto;
import com.ImSnacks.NyeoreumnagiBatch.ultraviolet.reader.dto.UVReaderResponseDto;
import org.springframework.batch.item.ItemProcessor;

public class UVProcessor implements ItemProcessor<UVReaderResponseDto, UVProcessorResponseDto> {
    @Override
    public UVProcessorResponseDto process(UVReaderResponseDto item) throws Exception {
        return null;
    }
}
