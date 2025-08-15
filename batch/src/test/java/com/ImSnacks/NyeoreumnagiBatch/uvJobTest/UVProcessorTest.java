
package com.ImSnacks.NyeoreumnagiBatch.uvJobTest;

import com.ImSnacks.NyeoreumnagiBatch.ultraviolet.processor.UVProcessor;
import com.ImSnacks.NyeoreumnagiBatch.ultraviolet.processor.dto.UVProcessorResponseDto;
import com.ImSnacks.NyeoreumnagiBatch.ultraviolet.reader.dto.UVReaderResponseDto;
import com.ImSnacks.NyeoreumnagiBatch.ultraviolet.reader.dto.UVReaderResponseDtoWithNxNy;
import org.junit.jupiter.api.*;

import java.time.LocalTime;
import java.util.List;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.jupiter.api.Assertions.*;

class UVProcessorTest {
    UVProcessor processor;

    @BeforeEach
    void setUp() { processor = new UVProcessor(); }

    @Test
    void 가장_큰_자외선_시간대가_하나일_경우_성공() throws Exception {
        //given
        UVReaderResponseDto.Item testItem = new UVReaderResponseDto.Item(
                "testCode", "1234567890", "2025081300",
                "1", "2", "1", "3",
                "5", "7", "2", "1", "0", "0", "0", "0",
                "0","0","0","0","0","0","0","0","0","0","0", "0", "0" ,""
        );

        UVReaderResponseDto uvDto = getReaderDTOWithItem(testItem);
        int nx = 60, ny = 120;
        UVReaderResponseDtoWithNxNy withNxNy = new UVReaderResponseDtoWithNxNy(nx, ny, uvDto);

        //when
        UVProcessorResponseDto result = processor.process(withNxNy);

        //then
        assertThat(result.nx()).isEqualTo(60);
        assertThat(result.ny()).isEqualTo(120);
        assertThat(result.maxUVIndex()).isEqualTo(7);
        assertThat(result.maxUVStartTime()).isEqualTo(LocalTime.of(15,0));
        assertThat(result.maxUVEndTime()).isEqualTo(LocalTime.of(18,0));
    }

    @Test
    void 가장_큰_자외선_시간대가_여러_개일_경우_성공() throws Exception {
        //given
        UVReaderResponseDto.Item testItem = new UVReaderResponseDto.Item(
                "testCode", "1234567890", "2025081300",
                "1", "2", "1", "3",
                "5", "7", "7", "1", "0", "0", "0", "0",
                "0","0","0","0","0","0","0","0","0","0","0", "0", "0" ,""
        );

        UVReaderResponseDto uvDto = getReaderDTOWithItem(testItem);
        int nx = 60, ny = 120;
        UVReaderResponseDtoWithNxNy withNxNy = new UVReaderResponseDtoWithNxNy(nx, ny, uvDto);

        //when
        UVProcessorResponseDto result = processor.process(withNxNy);

        //then
        assertThat(result.nx()).isEqualTo(60);
        assertThat(result.ny()).isEqualTo(120);
        assertThat(result.maxUVIndex()).isEqualTo(7);
        assertThat(result.maxUVStartTime()).isEqualTo(LocalTime.of(15,0));
        assertThat(result.maxUVEndTime()).isEqualTo(LocalTime.of(21,0));
    }

    @Test
    void 가장_큰_자외선_시간대가_여러_개일_경우_첫번째만_반환_성공() throws Exception {
        //given
        UVReaderResponseDto.Item testItem = new UVReaderResponseDto.Item(
                "testCode", "1234567890", "2025081300",
                "1", "2", "1", "3",
                "5", "7", "6", "1", "7", "0", "0", "0",
                "0","0","0","0","0","0","0","0","0","0","0", "0", "0" ,""
        );

        UVReaderResponseDto uvDto = getReaderDTOWithItem(testItem);
        int nx = 60, ny = 120;
        UVReaderResponseDtoWithNxNy withNxNy = new UVReaderResponseDtoWithNxNy(nx, ny, uvDto);

        //when
        UVProcessorResponseDto result = processor.process(withNxNy);

        //then
        assertThat(result.nx()).isEqualTo(60);
        assertThat(result.ny()).isEqualTo(120);
        assertThat(result.maxUVIndex()).isEqualTo(7);
        assertThat(result.maxUVStartTime()).isEqualTo(LocalTime.of(15,0));
        assertThat(result.maxUVEndTime()).isEqualTo(LocalTime.of(18,0));
    }

    private UVReaderResponseDto getReaderDTOWithItem(UVReaderResponseDto.Item item){
        UVReaderResponseDto.Items testItems = new UVReaderResponseDto.Items(List.of(item));
        UVReaderResponseDto.Body testBody = new UVReaderResponseDto.Body("JSON", testItems, 1, 1, 1);
        UVReaderResponseDto.Header testHeader = new UVReaderResponseDto.Header("00", "OK");
        UVReaderResponseDto.Response testResponse = new UVReaderResponseDto.Response(testHeader, testBody);
        return new UVReaderResponseDto(testResponse);
    }
}