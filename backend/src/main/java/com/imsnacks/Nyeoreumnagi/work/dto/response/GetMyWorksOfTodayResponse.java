package com.imsnacks.Nyeoreumnagi.work.dto.response;

public record GetMyWorksOfTodayResponse(
        Long myWorkId,
        String myCropName,
        String myWorkName,
        String workTime,
        String startTime,
        String endTime
) {
}
