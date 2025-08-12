package com.ImSnacks.NyeoreumnagiBatch.ultraviolet.writer;

import com.ImSnacks.NyeoreumnagiBatch.ultraviolet.processor.dto.UVProcessorResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.batch.item.Chunk;
import org.springframework.batch.item.ItemWriter;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class UVWriter implements ItemWriter<UVProcessorResponseDto> {

    private final

    @Override
    public void write(Chunk<? extends UVProcessorResponseDto> chunk) throws Exception {
        log.info("Writing UV started");
    }
}
