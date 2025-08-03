package com.ImSnacks.NyeoreumnagiBatch;

import com.ImSnacks.NyeoreumnagiBatch.utils.ForecastTimeUtils;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.*;

class ForecastTimeUtilsTest {

    @Test
    void testWithin24Hours_SameDay() {
        boolean result = ForecastTimeUtils.isWithin24Hours(
                "20250803", "0500", "20250803", "1500");
        assertThat(result).isTrue();
    }

    @Test
    void testWithin24Hours_NextDay() {
        boolean result = ForecastTimeUtils.isWithin24Hours(
                "20250803", "2300", "20250804", "2200");
        assertThat(result).isTrue();
    }

    @Test
    void testExactly24Hours() {
        boolean result = ForecastTimeUtils.isWithin24Hours(
                "20250803", "0600", "20250804", "0600");
        assertThat(result).isTrue();
    }

    @Test
    void testOver24Hours() {
        boolean result = ForecastTimeUtils.isWithin24Hours(
                "20250803", "0600", "20250804", "0700");
        assertThat(result).isFalse();
    }

    @Test
    void testBeforeBaseTime() {
        boolean result = ForecastTimeUtils.isWithin24Hours(
                "20250803", "0600", "20250803", "0500");
        assertThat(result).isFalse();
    }

    @Test
    void testSameTime() {
        boolean result = ForecastTimeUtils.isWithin24Hours(
                "20250803", "0600", "20250803", "0600");
        assertThat(result).isTrue();
    }

    @Test
    void shouldReturnCorrectHour_whenValidTimeGiven() {
        assertThat(ForecastTimeUtils.getIntegerFromAPITime("0000")).isEqualTo(0);
        assertThat(ForecastTimeUtils.getIntegerFromAPITime("0100")).isEqualTo(1);
        assertThat(ForecastTimeUtils.getIntegerFromAPITime("0930")).isEqualTo(9);
        assertThat(ForecastTimeUtils.getIntegerFromAPITime("1230")).isEqualTo(12);
        assertThat(ForecastTimeUtils.getIntegerFromAPITime("2359")).isEqualTo(23);
    }

    @Test
    void shouldThrowIllegalArgumentException_whenTimeLengthIsTooShort() {
        assertThatThrownBy(() -> ForecastTimeUtils.getIntegerFromAPITime("930"))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessage("시간 형식은 HHMM이어야 합니다.");
    }

    @Test
    void shouldThrowIllegalArgumentException_whenTimeLengthIsTooLong() {
        assertThatThrownBy(() -> ForecastTimeUtils.getIntegerFromAPITime("12300"))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessage("시간 형식은 HHMM이어야 합니다.");
    }

    @Test
    void shouldThrowNumberFormatException_whenTimeContainsNonNumericCharacters() {
        assertThatThrownBy(() -> ForecastTimeUtils.getIntegerFromAPITime("ABCD"))
                .isInstanceOf(NumberFormatException.class);
    }

    @Test
    void shouldThrowNullPointerException_whenTimeIsNull() {
        assertThatThrownBy(() -> ForecastTimeUtils.getIntegerFromAPITime(null))
                .isInstanceOf(NullPointerException.class);
    }
}
