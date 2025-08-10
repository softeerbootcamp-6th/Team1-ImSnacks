package com.imsnacks.Nyeoreumnagi.work.dto.response;

public record GetMyWorksOfTodayResponse(
        Long id,
        String cropName,
        String workName,
        String workTime,
        String startTime,
        String endTime
) {
}
