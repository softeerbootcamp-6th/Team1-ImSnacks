package com.imsnacks.Nyeoreumnagi.work.dto.response;

import com.imsnacks.Nyeoreumnagi.work.entity.WorkStatus;

import java.time.LocalDate;
import java.util.List;

public record GetMyWorksOfWeeklyResponse(
        LocalDate date,
        List<WorkCardData> workCardData
) {
    public record WorkCardData(
            long myWorkId,
            String myCropName,
            String myWorkName,
            String myWorkTime,
            WorkStatus status
    ){}
}
