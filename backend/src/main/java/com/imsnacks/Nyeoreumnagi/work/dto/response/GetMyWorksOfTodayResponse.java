package com.imsnacks.Nyeoreumnagi.work.dto.response;

import com.imsnacks.Nyeoreumnagi.work.entity.WorkStatus;

public record GetMyWorksOfTodayResponse(
        Long myWorkId,
        String myCropName,
        String myWorkName,
        String workTime,
        String startTime,
        String endTime,
        WorkStatus status
) {
}
