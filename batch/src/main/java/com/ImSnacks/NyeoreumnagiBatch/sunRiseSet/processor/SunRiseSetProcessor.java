package com.ImSnacks.NyeoreumnagiBatch.sunRiseSet.processor;

import com.ImSnacks.NyeoreumnagiBatch.sunRiseSet.processor.dto.SunRiseSetProcessorResponseDto;
import com.ImSnacks.NyeoreumnagiBatch.sunRiseSet.reader.dto.SunRiseSetReaderResponseDtoWithNxNy;
import lombok.extern.slf4j.Slf4j;
import org.springframework.batch.item.ItemProcessor;
import org.springframework.stereotype.Component;

import java.time.LocalTime;
import java.time.format.DateTimeFormatter;

@Slf4j
@Component
public class SunRiseSetProcessor implements ItemProcessor<SunRiseSetReaderResponseDtoWithNxNy, SunRiseSetProcessorResponseDto> {
    @Override
    public SunRiseSetProcessorResponseDto process(SunRiseSetReaderResponseDtoWithNxNy item) throws Exception {
        log.info("Processing SunRiseSet Processor");

        LocalTime sunRiseTime = parseStringToLocalTime(item.dto().getSunRise());
        LocalTime sunSetTime = parseStringToLocalTime(item.dto().getSunset());
        int nx = item.nx();
        int ny = item.ny();

        return new SunRiseSetProcessorResponseDto(nx, ny, sunRiseTime, sunSetTime);
    }

    private LocalTime parseStringToLocalTime(String str) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HHmm");
        return LocalTime.parse(str, formatter);
    }
}
