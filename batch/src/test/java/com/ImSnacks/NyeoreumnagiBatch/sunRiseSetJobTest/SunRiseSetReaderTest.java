package com.ImSnacks.NyeoreumnagiBatch.sunRiseSetJobTest;

import com.ImSnacks.NyeoreumnagiBatch.common.entity.NxNyId;
import com.ImSnacks.NyeoreumnagiBatch.common.entity.UniqueNxNy;
import com.ImSnacks.NyeoreumnagiBatch.common.repository.UniqueNxNyRepository;
import com.ImSnacks.NyeoreumnagiBatch.seven_days_weather_forecast.entity.MidTempRegionCode;
import com.ImSnacks.NyeoreumnagiBatch.sunRiseSet.reader.SunRiseSetApiCaller;
import com.ImSnacks.NyeoreumnagiBatch.sunRiseSet.reader.SunRiseSetReader;
import com.ImSnacks.NyeoreumnagiBatch.sunRiseSet.reader.dto.SunRiseSetReaderResponseDto;
import com.ImSnacks.NyeoreumnagiBatch.sunRiseSet.reader.dto.SunRiseSetReaderResponseDtoWithNxNy;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.List;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.mockito.ArgumentMatchers.anyDouble;
import static org.mockito.Mockito.anyString;
import static org.mockito.Mockito.when;

class SunRiseSetReaderTest {

    @Mock
    SunRiseSetApiCaller apiCaller;
    @Mock
    UniqueNxNyRepository uniqueNxNyRepository;
    SunRiseSetReader reader;

    @BeforeEach
    void setup() {
        MockitoAnnotations.openMocks(this);
        List<UniqueNxNy> areaCodes = List.of(new UniqueNxNy(new NxNyId(60,120), new MidTempRegionCode("11B10101","서울"), "1100000000", 34.1, 127.1));

        when(uniqueNxNyRepository.findAll()).thenReturn(areaCodes);
        reader = new SunRiseSetReader("20250813", apiCaller, uniqueNxNyRepository);
        // Static 변수 초기화 강제
        try {
            java.lang.reflect.Field locationField = SunRiseSetReader.class.getDeclaredField("location");
            locationField.setAccessible(true); locationField.set(null, null);
            java.lang.reflect.Field idxField = SunRiseSetReader.class.getDeclaredField("locationIndex");
            idxField.setAccessible(true); idxField.setInt(null, 0);
        } catch (Exception e) { throw new RuntimeException(e);}
    }

    @Test
    void 일출몰_Reader_DTO_생성_성공() throws Exception {
        //given
        SunRiseSetReaderResponseDto dummyDto = new SunRiseSetReaderResponseDto(null,null,null);
        when(apiCaller.call(anyString(), anyDouble(), anyDouble())).thenReturn(dummyDto);

        //when
        SunRiseSetReaderResponseDtoWithNxNy dtoWith = reader.read();

        //then
        assertNotNull(dtoWith);
        assertThat(dtoWith.nx()).isEqualTo(60);
        assertThat(dtoWith.ny()).isEqualTo(120);
        assertThat(dtoWith.dto()).isEqualTo(dummyDto);
    }

    @Test
    void 인덱스가_nx_ny_리스트를_넘을_경우_null_반환() throws Exception {
        java.lang.reflect.Field idxField = SunRiseSetReader.class.getDeclaredField("locationIndex");
        idxField.setAccessible(true); idxField.setInt(null, 99);

        assertNull(reader.read());
    }
}
