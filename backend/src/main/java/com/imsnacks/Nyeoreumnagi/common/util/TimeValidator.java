package com.imsnacks.Nyeoreumnagi.common.util;

import java.time.LocalDateTime;

public class TimeValidator {
    public static boolean validateTime(LocalDateTime startTime, LocalDateTime endTime) {

        if(startTime.isAfter(endTime)) {
            return false;
        }

        return true;
    }
}
