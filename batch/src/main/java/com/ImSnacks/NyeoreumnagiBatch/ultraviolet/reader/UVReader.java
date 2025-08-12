package com.ImSnacks.NyeoreumnagiBatch.ultraviolet.reader;

import com.ImSnacks.NyeoreumnagiBatch.ultraviolet.reader.dto.UVReaderResponseDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.batch.core.configuration.annotation.StepScope;
import org.springframework.batch.item.ItemReader;
import org.springframework.batch.item.NonTransientResourceException;
import org.springframework.batch.item.ParseException;
import org.springframework.batch.item.UnexpectedInputException;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@StepScope
public class UVReader implements ItemReader<UVReaderResponseDto> {
    @Override
    public UVReaderResponseDto read() throws Exception, UnexpectedInputException, ParseException, NonTransientResourceException {
        return null;
    }
}
