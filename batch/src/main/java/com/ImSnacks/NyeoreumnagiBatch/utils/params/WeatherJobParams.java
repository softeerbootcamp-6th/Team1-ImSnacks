package com.ImSnacks.NyeoreumnagiBatch.utils.params;

import com.ImSnacks.NyeoreumnagiBatch.reader.ApiRequestValues;
import org.springframework.batch.core.JobParameters;
import org.springframework.batch.core.JobParametersBuilder;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.Arrays;
import java.util.List;

public class WeatherJobParams {
    private static final List<Integer> BASE_TIMES = Arrays.asList(2, 5, 8, 11, 14, 17, 20, 23);

    public static JobParameters get() {
        LocalDate nowDate = LocalDate.now();
        int nowHour = LocalTime.now().getHour();
        if (nowHour < 2) { // 00시, 01시의 경우, 전날 23시를 base로 한다.
            nowHour = 23;
            nowDate = nowDate.minusDays(1);
        }

        String baseDate = nowDate.format(DateTimeFormatter.ofPattern("yyyyMMdd"));
        String baseTime = String.format("%02d00", getBaseTime(nowHour));
        return new JobParametersBuilder()
                .addString(ApiRequestValues.BASE_DATE.toString(), baseDate)
                .addString(ApiRequestValues.BASE_TIME.toString(), baseTime)
                .toJobParameters();
    }

    private static int getBaseTime(int nowHour) {
        assert (nowHour >= 2);
        for (int i = BASE_TIMES.size() - 1; i >= 0; --i) {
            int t = BASE_TIMES.get(i);
            if (t <= nowHour) {
                return t;
            }
        }
        assert (false);
        return 0;
    }
}