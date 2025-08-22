package com.ImSnacks.NyeoreumnagiBatch.shortTermWeatherForecast.processor.utils;

import com.ImSnacks.NyeoreumnagiBatch.shortTermWeatherForecast.reader.dto.VilageFcstResponseDto;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;

public class ForecastTimeUtils {

    public static boolean isWithin24Hours(String baseDate, String baseTime, String fcstDate, String fcstTime) {
        DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyyMMddHHmm");

        LocalDateTime baseDateTime = LocalDateTime.parse(baseDate + baseTime, dateFormatter);
        LocalDateTime fcstDateTime = LocalDateTime.parse(fcstDate + fcstTime, dateFormatter);

        long secondsDiff = ChronoUnit.SECONDS.between(baseDateTime, fcstDateTime);

        return secondsDiff >= 0 && secondsDiff <= (24+3) * 60 * 60;
    }

    public static boolean isWithin24Hours(VilageFcstResponseDto.Item item) {
        return isWithin24Hours(item.getBaseDate(), item.getBaseTime(), item.getFcstDate(), item.getFcstTime());
    }

    //HHMM 형태의 문자열을 HH 정수형으로 반환
    public static int getIntegerFromAPITime(LocalDateTime fcstDateTime) {
        return fcstDateTime.getHour();
    }
}
