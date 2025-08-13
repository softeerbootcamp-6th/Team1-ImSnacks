package com.ImSnacks.NyeoreumnagiBatch.sunRiseSet.reader;

import com.ImSnacks.NyeoreumnagiBatch.sunRiseSet.reader.dto.SunRiseSetReaderResponseDto;
import org.springframework.batch.item.ItemReader;
import org.springframework.batch.item.NonTransientResourceException;
import org.springframework.batch.item.ParseException;
import org.springframework.batch.item.UnexpectedInputException;

public class SunRiseSetReader implements ItemReader<SunRiseSetReaderResponseDto> {
    @Override
    public SunRiseSetReaderResponseDto read() throws Exception, UnexpectedInputException, ParseException, NonTransientResourceException {
        return null;
    }
}
