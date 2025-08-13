package com.ImSnacks.NyeoreumnagiBatch.sunRiseSet.processor;

import com.ImSnacks.NyeoreumnagiBatch.sunRiseSet.processor.dto.SunRiseSetProcessorResponseDto;
import com.ImSnacks.NyeoreumnagiBatch.sunRiseSet.reader.dto.SunRiseSetReaderResponseDtoWithNxNy;
import org.springframework.batch.item.ItemProcessor;

public class SunRiseSetProcessor implements ItemProcessor<SunRiseSetReaderResponseDtoWithNxNy, SunRiseSetProcessorResponseDto> {
    @Override
    public SunRiseSetProcessorResponseDto process(SunRiseSetReaderResponseDtoWithNxNy item) throws Exception {
        return null;
    }
}
