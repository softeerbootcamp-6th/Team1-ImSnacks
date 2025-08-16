
package com.ImSnacks.NyeoreumnagiBatch.sunRiseSetJobTest;

import com.ImSnacks.NyeoreumnagiBatch.sunRiseSet.processor.SunRiseSetProcessor;
import com.ImSnacks.NyeoreumnagiBatch.sunRiseSet.processor.dto.SunRiseSetProcessorResponseDto;
import com.ImSnacks.NyeoreumnagiBatch.sunRiseSet.reader.dto.SunRiseSetReaderResponseDto;
import com.ImSnacks.NyeoreumnagiBatch.sunRiseSet.reader.dto.SunRiseSetReaderResponseDtoWithNxNy;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.time.LocalTime;
import java.util.List;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

class SunRiseSetProcessorTest {
    SunRiseSetProcessor processor;

    @BeforeEach
    void setUp() { processor = new SunRiseSetProcessor(); }

    @Test
    void 일출몰_성공() throws Exception {
        //given
        SunRiseSetReaderResponseDto.Item testItem = new SunRiseSetReaderResponseDto.Item(
                "","","","","","","","","","","","","","","","0525","1920",""
        );

        SunRiseSetReaderResponseDto sunRiseSetDto = getReaderDTOWithItem(testItem);
        int nx = 60, ny = 120;
        SunRiseSetReaderResponseDtoWithNxNy withNxNy = new SunRiseSetReaderResponseDtoWithNxNy(nx, ny, sunRiseSetDto);

        //when
        SunRiseSetProcessorResponseDto result = processor.process(withNxNy);

        //then
        assertThat(result.nx()).isEqualTo(60);
        assertThat(result.ny()).isEqualTo(120);
        assertThat(result.sunRise()).isEqualTo(LocalTime.of(5,25));
        assertThat(result.sunSet()).isEqualTo(LocalTime.of(19,20));
    }

    private SunRiseSetReaderResponseDto getReaderDTOWithItem(SunRiseSetReaderResponseDto.Item item){
        SunRiseSetReaderResponseDto.Items testItems = new SunRiseSetReaderResponseDto.Items(List.of(item));
        SunRiseSetReaderResponseDto.Body testBody = new SunRiseSetReaderResponseDto.Body(testItems, 0,0,0);
        SunRiseSetReaderResponseDto.Header testHeader = new SunRiseSetReaderResponseDto.Header("00", "OK");
        return new SunRiseSetReaderResponseDto(null, testHeader, testBody);
    }
}