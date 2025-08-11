package com.ImSnacks.NyeoreumnagiBatch;

import com.ImSnacks.NyeoreumnagiBatch.processor.utils.ForecastTimeUtils;
import org.junit.jupiter.api.Test;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

class ForecastTimeUtilsTest {

    @Test
    void _10시간_이후_날짜_포함() {
        boolean result = ForecastTimeUtils.isWithin24Hours(
                "20250803", "0500", "20250803", "1500");
        assertThat(result).isTrue();
    }

    @Test
    void _23시간_후의_날짜_포함() {
        boolean result = ForecastTimeUtils.isWithin24Hours(
                "20250803", "2300", "20250804", "2200");
        assertThat(result).isTrue();
    }

    @Test
    void _24시간_후의_시간_포함() {
        boolean result = ForecastTimeUtils.isWithin24Hours(
                "20250803", "0600", "20250804", "0600");
        assertThat(result).isTrue();
    }

    @Test
    void _24시간_이후의_날짜_미포함() {
        boolean result = ForecastTimeUtils.isWithin24Hours(
                "20250803", "0600", "20250804", "0700");
        assertThat(result).isFalse();
    }

    @Test
    void 기준_시간_이전의_날짜_미포함() {
        boolean result = ForecastTimeUtils.isWithin24Hours(
                "20250803", "0600", "20250803", "0500");
        assertThat(result).isFalse();
    }

    @Test
    void 같은_날짜_포함() {
        boolean result = ForecastTimeUtils.isWithin24Hours(
                "20250803", "0600", "20250803", "0600");
        assertThat(result).isTrue();
    }

    @Test
    void _24시간_내의_시간_정수로_뽑기_성공() {
        assertThat(ForecastTimeUtils.getIntegerFromAPITime(LocalDateTime.of(LocalDate.now(), LocalTime.of(0,0)))).isEqualTo(0);
        assertThat(ForecastTimeUtils.getIntegerFromAPITime(LocalDateTime.of(LocalDate.now(), LocalTime.of(1,0)))).isEqualTo(1);
        assertThat(ForecastTimeUtils.getIntegerFromAPITime(LocalDateTime.of(LocalDate.now(), LocalTime.of(9,30)))).isEqualTo(9);
        assertThat(ForecastTimeUtils.getIntegerFromAPITime(LocalDateTime.of(LocalDate.now(), LocalTime.of(12,30)))).isEqualTo(12);
        assertThat(ForecastTimeUtils.getIntegerFromAPITime(LocalDateTime.of(LocalDate.now(), LocalTime.of(23,59)))).isEqualTo(23);
    }

//    @Test
//    void HHMM_형식이_아닌_경우_예외처리() {
//        assertThatThrownBy(() -> ForecastTimeUtils.getIntegerFromAPITime(LocalDateTime.of(LocalDate.now(), LocalTime.of(9,30))))
//                .isInstanceOf(IllegalArgumentException.class)
//                .hasMessage("시간 형식은 HHmm이어야 합니다.");
//    }

//    @Test
//    void HHMM_형식이_아닌_경우_예외처리2() {
//        assertThatThrownBy(() -> ForecastTimeUtils.getIntegerFromAPITime("12300"))
//                .isInstanceOf(IllegalArgumentException.class)
//                .hasMessage("시간 형식은 HHmm이어야 합니다.");
//    }

//    @Test
//    void 숫자변환_실패_예외처리() {
//        assertThatThrownBy(() -> ForecastTimeUtils.getIntegerFromAPITime("ABCD"))
//                .isInstanceOf(NumberFormatException.class);
//    }

    @Test
    void shouldThrowNullPointerException_whenTimeIsNull() {
        assertThatThrownBy(() -> ForecastTimeUtils.getIntegerFromAPITime(null))
                .isInstanceOf(NullPointerException.class);
    }
}
