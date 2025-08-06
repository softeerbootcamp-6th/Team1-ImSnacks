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
        String baseDate = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyyMMdd"));
        String baseTime = String.format("%02d", getBaseTime());
        return new JobParametersBuilder()
                .addString(ApiRequestValues.BASE_DATE.toString(), baseDate)
                .addString(ApiRequestValues.BASE_TIME.toString(), baseTime)
                .toJobParameters();
    }

    private static int getBaseTime() {
        int nowHour = LocalTime.now().getHour();
        for (int t : BASE_TIMES) {
            if (t <= nowHour) {
                return t;
            }
        }
        return BASE_TIMES.get(BASE_TIMES.size() - 1);
    }
}