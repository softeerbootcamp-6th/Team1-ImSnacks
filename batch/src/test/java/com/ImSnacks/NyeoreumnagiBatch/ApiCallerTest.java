package com.ImSnacks.NyeoreumnagiBatch;

import com.ImSnacks.NyeoreumnagiBatch.reader.ApiCaller;
import com.ImSnacks.NyeoreumnagiBatch.reader.ApiRequestValues;

import com.ImSnacks.NyeoreumnagiBatch.reader.dto.VilageFcstResponseDto;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
@Transactional
@Rollback
public class ApiCallerTest {

    private static final Logger log = LoggerFactory.getLogger(ApiCallerTest.class);

    @Test
    void shouldReturnExpectedUrl() {
        // given
        String baseDate = "20250804";
        String baseTime = "0500";
        int nx = 61;
        int ny = 128;

        // when
        String actual = ApiCaller.buildUriString(baseDate, baseTime, nx, ny);

        log.debug(actual);

        // then
        // API authKey는 제외
        //String expected = String.format("%s?authKey&numOfRows=1000&pageNo=1&dataType=JSON&base_date=%s&base_time=%s&nx=%d&ny=%d", ApiRequestValues.URI.toString(), baseDate, baseTime, nx, ny);
        //assertEquals(expected, actual);
    }

    @Test
    void shouldReturnExpectedDto() {
        // given
        String baseDate = "20250805";
        String baseTime = "0500";
        int nx = 61;
        int ny = 128;

        // when
        VilageFcstResponseDto actual = ApiCaller.call(baseDate, baseTime, nx, ny);

        // then
        log.debug(actual.toString());
    }
}
