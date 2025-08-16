package com.imsnacks.Nyeoreumnagi.work.dto.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.imsnacks.Nyeoreumnagi.work.exception.WorkException;
import com.imsnacks.Nyeoreumnagi.work.exception.WorkResponseStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

import static com.imsnacks.Nyeoreumnagi.work.exception.WorkResponseStatus.*;

public record ModifyMyWorkRequest(
        @NotNull
        Long myWorkId,
        @NotBlank
        @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm")
        LocalDateTime startTime,
        @NotBlank
        @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm")
        LocalDateTime endTime
) {
    public void validate() {
        if (myWorkId == null) {
            throw new WorkException(NULL_MY_WORK_ID);
        }
        if (startTime == null) {
            throw new WorkException(NULL_START_TIME);
        }
        if (endTime == null) {
            throw new WorkException(NULL_END_TIME);
        }
    }
}
