package com.ImSnacks.NyeoreumnagiBatch.utils;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;

public class ForecastTimeChecker {

    public static boolean isWithin24Hours(String baseDate, String baseTime, String fcstDate, String fcstTime) {
        DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyyMMddHHmm");

        LocalDateTime baseDateTime = LocalDateTime.parse(baseDate + baseTime, dateFormatter);
        LocalDateTime fcstDateTime = LocalDateTime.parse(fcstDate + fcstTime, dateFormatter);

        long secondsDiff = ChronoUnit.SECONDS.between(baseDateTime, fcstDateTime);

        return secondsDiff >= 0 && secondsDiff <= 24 * 60 * 60;
    }

}
