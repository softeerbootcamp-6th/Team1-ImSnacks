package com.imsnacks.Nyeoreumnagi.work.event;

import java.time.LocalDate;

public record MyWorkCompletedEvent(long memberId, long workId,
                                   double latitude, double longitude, LocalDate date) {}