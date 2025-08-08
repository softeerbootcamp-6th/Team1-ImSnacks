package com.imsnacks.Nyeoreumnagi.work.dto.request;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.time.LocalDateTime;

public record ResisterMyWorkRequest(
                                    long recommendedWorkId,
                                    long myCropId,
                                    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm")
                                    LocalDateTime startTime,
                                    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm")
                                    LocalDateTime endTime) {
}
