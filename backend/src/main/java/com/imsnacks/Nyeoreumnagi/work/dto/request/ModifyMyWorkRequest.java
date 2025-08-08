package com.imsnacks.Nyeoreumnagi.work.dto.request;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.time.LocalDateTime;

public record ModifyMyWorkRequest(
                                  long myWorkId,
                                  @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm")
                                  LocalDateTime startTime,
                                  @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm")
                                  LocalDateTime endTime
                                  ) {
}
