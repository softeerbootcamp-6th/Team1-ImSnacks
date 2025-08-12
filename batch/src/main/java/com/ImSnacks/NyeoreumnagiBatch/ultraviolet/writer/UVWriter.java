package com.ImSnacks.NyeoreumnagiBatch.ultraviolet.writer;

import com.ImSnacks.NyeoreumnagiBatch.ultraviolet.processor.dto.UVProcessorResponseDto;
import org.springframework.batch.item.Chunk;
import org.springframework.batch.item.ItemWriter;

public class UVWriter implements ItemWriter<UVProcessorResponseDto> {
    @Override
    public void write(Chunk<? extends UVProcessorResponseDto> chunk) throws Exception {

    }
}
