package com.imsnacks.Nyeoreumnagi.common.util;

import java.time.Duration;
import java.time.LocalDateTime;

public class TimeValidator {
    private static final long MIN_MINUTES = 30;
    private static final long MAX_HOURS = 24;

    public static boolean validateTime(LocalDateTime startTime, LocalDateTime endTime) {
        if(startTime.isAfter(endTime)) {
            return false;
        }
        long minutes = Duration.between(startTime, endTime).toMinutes();
        return minutes >= MIN_MINUTES && minutes <= MAX_HOURS * 60;
    }
}
