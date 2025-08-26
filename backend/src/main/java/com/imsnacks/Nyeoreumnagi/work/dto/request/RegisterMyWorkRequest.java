package com.imsnacks.Nyeoreumnagi.work.dto.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.imsnacks.Nyeoreumnagi.work.exception.WorkException;

import java.time.LocalDateTime;

import static com.imsnacks.Nyeoreumnagi.work.exception.WorkResponseStatus.*;

public record RegisterMyWorkRequest(
        Long recommendedWorkId,
        Long myCropId,
        @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm")
        LocalDateTime startTime,
        @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm")
        LocalDateTime endTime) {
    public void validate() {
        if (recommendedWorkId == null) {
            throw new WorkException(NULL_RECOMMENDED_WORK_ID);
        }
        if (startTime == null){
            throw new WorkException(NULL_START_TIME);
        }
        if (endTime == null){
            throw new WorkException(NULL_END_TIME);
        }
    }
}
