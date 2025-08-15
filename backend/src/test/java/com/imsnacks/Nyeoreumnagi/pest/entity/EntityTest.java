package com.imsnacks.Nyeoreumnagi.pest.entity;

import org.junit.jupiter.api.Test;

import java.time.Month;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

public class EntityTest {

    @Test
    void PestCondition_생성_성공() {
        PestCondition cond = PestCondition.builder()
                .startMonth(Month.APRIL)
                .startMonthPhase(PestCondition.MonthPhase.EARLY)
                .endMonth(Month.AUGUST)
                .endMonthPhase(PestCondition.MonthPhase.LATE)
                .build();
        assertThat(cond.getStartMonth()).isEqualTo(Month.APRIL);
        assertThat(cond.getStartMonthPhase()).isEqualTo(PestCondition.MonthPhase.EARLY);
        assertThat(cond.getEndMonth()).isEqualTo(Month.AUGUST);
        assertThat(cond.getEndMonthPhase()).isEqualTo(PestCondition.MonthPhase.LATE);
    }
}
