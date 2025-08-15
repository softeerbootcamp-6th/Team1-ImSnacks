package com.ImSnacks.NyeoreumnagiBatch.uvJobTest;

import com.ImSnacks.NyeoreumnagiBatch.common.entity.NxNyId;
import com.ImSnacks.NyeoreumnagiBatch.common.entity.UniqueNxNy;
import com.ImSnacks.NyeoreumnagiBatch.common.repository.UniqueNxNyRepository;
import com.ImSnacks.NyeoreumnagiBatch.seven_days_weather_forecast.entity.MidTempRegionCode;
import com.ImSnacks.NyeoreumnagiBatch.ultraviolet.reader.UVApiCaller;
import com.ImSnacks.NyeoreumnagiBatch.ultraviolet.reader.UVReader;
import com.ImSnacks.NyeoreumnagiBatch.ultraviolet.reader.dto.UVReaderResponseDto;
import com.ImSnacks.NyeoreumnagiBatch.ultraviolet.reader.dto.UVReaderResponseDtoWithNxNy;
import org.junit.jupiter.api.*;
import org.mockito.*;

import java.util.*;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

class UVReaderTest {

    @Mock
    UVApiCaller apiCaller;
    @Mock
    UniqueNxNyRepository uniqueNxNyRepository;
    UVReader reader;

    @BeforeEach
    void setup() {
        MockitoAnnotations.openMocks(this);
        List<UniqueNxNy> areaCodes = List.of(new UniqueNxNy(new NxNyId(60,120), new MidTempRegionCode("11B10101","서울"), "1100000000", 34.1, 127.1));
        when(uniqueNxNyRepository.findAll()).thenReturn(areaCodes);
        reader = new UVReader("2025081300", apiCaller, uniqueNxNyRepository);
        // Static 변수 초기화 강제
        try {
            java.lang.reflect.Field areaCodesField = UVReader.class.getDeclaredField("areaCodes");
            areaCodesField.setAccessible(true); areaCodesField.set(null, null);
            java.lang.reflect.Field idxField = UVReader.class.getDeclaredField("areaCodesIndex");
            idxField.setAccessible(true); idxField.setInt(null, 0);
        } catch (Exception e) { throw new RuntimeException(e);}
    }

    @Test
    void 자외선_Reader_DTO_생성_성공() throws Exception {
        //given
        UVReaderResponseDto dummyDto = new UVReaderResponseDto(null);
        when(apiCaller.call(anyString(), anyString())).thenReturn(dummyDto);

        //when
        UVReaderResponseDtoWithNxNy dtoWith = reader.read();

        //then
        assertNotNull(dtoWith);
        assertThat(dtoWith.getNx()).isEqualTo(60);
        assertThat(dtoWith.getNy()).isEqualTo(120);
        assertThat(dtoWith.getDto()).isEqualTo(dummyDto);
    }

    @Test
    void 인덱스가_nx_ny_리스트를_넘을_경우_null_반환() throws Exception {
        java.lang.reflect.Field idxField = UVReader.class.getDeclaredField("areaCodesIndex");
        idxField.setAccessible(true); idxField.setInt(null, 99);

        assertNull(reader.read());
    }
}
