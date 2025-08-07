package com.imsnacks.Nyeoreumnagi.common.util;

import java.time.LocalTime;
import java.time.format.DateTimeFormatter;

public class TimeValidator {
    public static boolean validateTime(String startTime, String endTime) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HHmm");
        LocalTime startTimeFormatted = LocalTime.parse(startTime, formatter);
        LocalTime endTimeFormatted = LocalTime.parse(endTime, formatter);

        if(startTimeFormatted.isAfter(endTimeFormatted)) {
            return false;
        }

        return true;
    }
}
