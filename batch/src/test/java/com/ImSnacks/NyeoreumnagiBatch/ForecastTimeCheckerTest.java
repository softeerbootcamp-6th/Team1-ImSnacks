package com.ImSnacks.NyeoreumnagiBatch;

import com.ImSnacks.NyeoreumnagiBatch.utils.ForecastTimeChecker;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.*;

class ForecastTimeCheckerTest {

    @Test
    void testWithin24Hours_SameDay() {
        boolean result = ForecastTimeChecker.isWithin24Hours(
                "20250803", "0500", "20250803", "1500");
        assertThat(result).isTrue();
    }

    @Test
    void testWithin24Hours_NextDay() {
        boolean result = ForecastTimeChecker.isWithin24Hours(
                "20250803", "2300", "20250804", "2200");
        assertThat(result).isTrue();
    }

    @Test
    void testExactly24Hours() {
        boolean result = ForecastTimeChecker.isWithin24Hours(
                "20250803", "0600", "20250804", "0600");
        assertThat(result).isTrue();
    }

    @Test
    void testOver24Hours() {
        boolean result = ForecastTimeChecker.isWithin24Hours(
                "20250803", "0600", "20250804", "0700");
        assertThat(result).isFalse();
    }

    @Test
    void testBeforeBaseTime() {
        boolean result = ForecastTimeChecker.isWithin24Hours(
                "20250803", "0600", "20250803", "0500");
        assertThat(result).isFalse();
    }

    @Test
    void testSameTime() {
        boolean result = ForecastTimeChecker.isWithin24Hours(
                "20250803", "0600", "20250803", "0600");
        assertThat(result).isTrue();
    }
}
