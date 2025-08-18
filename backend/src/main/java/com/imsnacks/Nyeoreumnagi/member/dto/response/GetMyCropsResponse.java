package com.imsnacks.Nyeoreumnagi.member.dto.response;

public record GetMyCropsResponse(
        Long myCropId,
        String myCropName,
        Integer daysFromStartDate,
        String lifeCycle
) {
}
