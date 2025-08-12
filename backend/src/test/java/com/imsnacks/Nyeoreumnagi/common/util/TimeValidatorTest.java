package com.imsnacks.Nyeoreumnagi.common.util;

import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;

import static com.imsnacks.Nyeoreumnagi.common.util.TimeValidator.validateTime;
import static org.assertj.core.api.Assertions.*;

class TimeValidatorTest {

    @Test
    void 정상_시간범위인_경우_true를_반환한다() {
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime startTime = now.plusHours(1);

        boolean validated = validateTime(now, startTime);

        assertThat(validated).isTrue();
    }

    @Test
    void startTime이_endTime보다_나중이면_false를_반환한다() {
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime startTime = now.minusHours(1);

        boolean validated = validateTime(now, startTime);

        assertThat(validated).isFalse();
    }

    @Test
    void 시간_범위가_30분_미만이면_false를_반환한다() {
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime startTime = now.plusMinutes(29);

        boolean validated = validateTime(now, startTime);

        assertThat(validated).isFalse();
    }

    @Test
    void 시간_범위가_24시간_초과이면_false를_반환한다() {
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime startTime = now.plusHours(24).plusMinutes(1);

        boolean validated = validateTime(now, startTime);

        assertThat(validated).isFalse();
    }
}