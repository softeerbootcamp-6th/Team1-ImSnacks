package com.ImSnacks.NyeoreumnagiBatch;

import com.ImSnacks.NyeoreumnagiBatch.utils.params.WeatherJobParams;
import org.junit.jupiter.api.Test;
import org.springframework.batch.core.JobParameters;

public class WeatherJobParamsTest {
    @Test
    void 현재_기준_호출_시_JobParams_출력() {
        JobParameters params = WeatherJobParams.get();
        System.out.println(params.toString());
    }
}
