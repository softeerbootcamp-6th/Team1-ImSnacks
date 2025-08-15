package com.ImSnacks.NyeoreumnagiBatch.common.params;

import com.ImSnacks.NyeoreumnagiBatch.shortTermWeatherForecast.reader.ApiRequestValues;
import com.ImSnacks.NyeoreumnagiBatch.sunRiseSet.reader.enums.SunRiseSetApiRequestValue;
import com.ImSnacks.NyeoreumnagiBatch.ultraviolet.reader.enums.UVApiRequestValue;
import org.springframework.batch.core.JobParameters;
import org.springframework.batch.core.JobParametersBuilder;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.Arrays;
import java.util.List;

public class JobParams {
    private static final List<Integer> BASE_TIMES = Arrays.asList(2, 5, 8, 11, 14, 17, 20, 23);

    public static JobParameters getWeatherJobParam() {
        LocalDate nowDate = LocalDate.now(ZoneId.of("Asia/Seoul"));
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

    public static JobParameters getUVJobParam(){
        LocalDate nowDate = LocalDate.now(ZoneId.of("Asia/Seoul"));
        String baseDate = nowDate.format(DateTimeFormatter.ofPattern("yyyyMMdd"));
        return new JobParametersBuilder()
                .addString(UVApiRequestValue.TIME.toString(), baseDate + "00")
                .toJobParameters();
    }

    public static JobParameters getSunRiseSetJobParam(){
        LocalDate nowDate = LocalDate.now(ZoneId.of("Asia/Seoul"));
        String baseDate = nowDate.format(DateTimeFormatter.ofPattern("yyyyMMdd"));
        return new JobParametersBuilder()
                .addString(SunRiseSetApiRequestValue.LOCDATE.toString(), baseDate)
                .toJobParameters();
    }

    public static JobParameters getDailyHighJobParam(){
        LocalDateTime nowDateTime = LocalDateTime.now(ZoneId.of("Asia/Seoul"));
        String baseDate = nowDateTime.format(DateTimeFormatter.ofPattern("yyyyMMddHHmm"));
        return new JobParametersBuilder()
                .addString("LocalDate", baseDate)
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