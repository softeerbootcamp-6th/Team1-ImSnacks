package com.imsnacks.Nyeoreumnagi.work.event;

import com.imsnacks.Nyeoreumnagi.work.entity.WorkStatus;

import java.time.LocalDate;

public record MyWorkCompletedEvent(long memberId, long workId,
                                   double latitude, double longitude, WorkStatus workStatus, LocalDate date) {}
