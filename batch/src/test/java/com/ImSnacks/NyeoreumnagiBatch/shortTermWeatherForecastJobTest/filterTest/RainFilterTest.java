package com.ImSnacks.NyeoreumnagiBatch.shortTermWeatherForecastJobTest.filterTest;

import com.ImSnacks.NyeoreumnagiBatch.shortTermWeatherForecast.processor.dto.VilageFcstItemsDto;
import com.ImSnacks.NyeoreumnagiBatch.shortTermWeatherForecast.processor.utils.weatherRiskFilter.RainFilter;
import com.ImSnacks.NyeoreumnagiBatch.shortTermWeatherForecast.processor.utils.weatherRiskFilter.WeatherRiskFilter;
import com.ImSnacks.NyeoreumnagiBatch.shortTermWeatherForecast.writer.dto.ShortTermWeatherDto;
import com.ImSnacks.NyeoreumnagiBatch.common.entity.WeatherRiskType;
import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

class RainFilterTest {

    private static final WeatherRiskFilter filter = new RainFilter();
    // 테스트 기준 시각(고정): 2025-08-05 00:00
    private static final LocalDateTime BASE = LocalDateTime.of(2025, 8, 5, 0, 0);

    // ========== 단일 구간 ==========
    @Test
    void 비에_해당하는_응답만_있는_경우() {
        // given (01~03시 모두 '비')
        Map<LocalDateTime, List<VilageFcstItemsDto>> parameter = new LinkedHashMap<>();
        parameter.put(at(1), List.of(createItem("PCP", at(1), "1mm 미만")));
        parameter.put(at(2), List.of(createItem("PCP", at(2), "19mm")));
        parameter.put(at(3), List.of(createItem("PCP", at(3), "1.5mm")));

        // when
        List<ShortTermWeatherDto.WeatherRiskDto> response = filter.filtering(parameter);

        // then
        assertThat(response.size()).isEqualTo(1);
        assertThat(response.get(0).getStartTime()).isEqualTo(BASE.withHour(1));
        assertThat(response.get(0).getEndTime()).isEqualTo(BASE.withHour(3));
        assertThat(response.get(0).getName()).isEqualTo(WeatherRiskType.RAIN);
    }

    @Test
    void 호우에_해당하는_응답만_있는_경우() {
        // given (01~03시 모두 '호우')
        Map<LocalDateTime, List<VilageFcstItemsDto>> parameter = new LinkedHashMap<>();
        parameter.put(at(1), List.of(createItem("PCP", at(1), "30.0~50.0mm")));
        parameter.put(at(2), List.of(createItem("PCP", at(1), "30.0~50.0mm")));
        parameter.put(at(3), List.of(createItem("PCP", at(1), "30.0~50.0mm")));

        // when
        List<ShortTermWeatherDto.WeatherRiskDto> response = filter.filtering(parameter);

        // then
        assertThat(response.size()).isEqualTo(1);
        assertThat(response.get(0).getStartTime()).isEqualTo(BASE.withHour(1));
        assertThat(response.get(0).getEndTime()).isEqualTo(BASE.withHour(3));
        assertThat(response.get(0).getName()).isEqualTo(WeatherRiskType.HEAVY_RAIN);
    }

    @Test
    void 폭우에_해당하는_응답만_있는_경우() {
        // given (01~03시 모두 '폭우')
        Map<LocalDateTime, List<VilageFcstItemsDto>> parameter = new LinkedHashMap<>();
        parameter.put(at(1), List.of(createItem("PCP", at(1), "50.0mm 이상")));
        parameter.put(at(2), List.of(createItem("PCP", at(2), "50.0mm 이상")));
        parameter.put(at(3), List.of(createItem("PCP", at(3), "50.0mm 이상")));

        // when
        List<ShortTermWeatherDto.WeatherRiskDto> response = filter.filtering(parameter);

        // then
        assertThat(response.size()).isEqualTo(1);
        assertThat(response.get(0).getStartTime()).isEqualTo(BASE.withHour(1));
        assertThat(response.get(0).getEndTime()).isEqualTo(BASE.withHour(3));
        assertThat(response.get(0).getName()).isEqualTo(WeatherRiskType.TORRENTIAL_RAIN);
    }

    // ========== 다중 구간 ==========
    @Test
    void 비에_해당하는_응답이_여러구간_있는_경우() {
        // given
        // (01~02시 RAIN) + (04~05시 RAIN) — 2개 구간
        Map<LocalDateTime, List<VilageFcstItemsDto>> parameter = new LinkedHashMap<>();
        parameter.put(at(1), List.of(createItem("PCP", at(1), "1.7mm")));
        parameter.put(at(2), List.of(createItem("PCP", at(2), "1mm 미만")));
        parameter.put(at(4), List.of(createItem("PCP", at(4), "19.0mm")));
        parameter.put(at(5), List.of(createItem("PCP", at(5), "1mm 미만")));

        // when
        List<ShortTermWeatherDto.WeatherRiskDto> response = filter.filtering(parameter);

        // then
        assertThat(response.size()).isEqualTo(2);
        assertThat(response.get(0).getStartTime()).isEqualTo(BASE.withHour(1));
        assertThat(response.get(0).getEndTime()).isEqualTo(BASE.withHour(2));
        assertThat(response.get(0).getName()).isEqualTo(WeatherRiskType.RAIN);
        assertThat(response.get(1).getStartTime()).isEqualTo(BASE.withHour(4));
        assertThat(response.get(1).getEndTime()).isEqualTo(BASE.withHour(5));
        assertThat(response.get(1).getName()).isEqualTo(WeatherRiskType.RAIN);
    }

    @Test
    void 호우에_해당하는_응답이_여러구간_있는_경우() {
        // given
        // (01~02시 HEAVY_RAIN) + (04~05시 HEAVY_RAIN)
        Map<LocalDateTime, List<VilageFcstItemsDto>> parameter = new LinkedHashMap<>();
        parameter.put(at(1), List.of(createItem("PCP", at(1), "30.0~50.0mm")));
        parameter.put(at(2), List.of(createItem("PCP", at(2), "30.0~50.0mm")));
        parameter.put(at(4), List.of(createItem("PCP", at(4), "30.0~50.0mm")));
        parameter.put(at(5), List.of(createItem("PCP", at(5), "30.0~50.0mm")));

        // when
        List<ShortTermWeatherDto.WeatherRiskDto> response = filter.filtering(parameter);

        // then
        assertThat(response.size()).isEqualTo(2);
        assertThat(response.get(0).getStartTime()).isEqualTo(BASE.withHour(1));
        assertThat(response.get(0).getEndTime()).isEqualTo(BASE.withHour(2));
        assertThat(response.get(0).getName()).isEqualTo(WeatherRiskType.HEAVY_RAIN);
        assertThat(response.get(1).getStartTime()).isEqualTo(BASE.withHour(4));
        assertThat(response.get(1).getEndTime()).isEqualTo(BASE.withHour(5));
        assertThat(response.get(1).getName()).isEqualTo(WeatherRiskType.HEAVY_RAIN);
    }

    @Test
    void 폭우에_해당하는_응답이_여러구간_있는_경우() {
        // given
        // (01~02시 TORRENTIAL_RAIN) + (04~05시 TORRENTIAL_RAIN)
        Map<LocalDateTime, List<VilageFcstItemsDto>> parameter = new LinkedHashMap<>();
        parameter.put(at(1), List.of(createItem("PCP", at(1), "50.0mm 이상")));
        parameter.put(at(2), List.of(createItem("PCP", at(2), "50.0mm 이상")));
        parameter.put(at(4), List.of(createItem("PCP", at(4), "50.0mm 이상")));
        parameter.put(at(5), List.of(createItem("PCP", at(5), "50.0mm 이상")));

        // when
        List<ShortTermWeatherDto.WeatherRiskDto> response = filter.filtering(parameter);

        // then
        assertThat(response.size()).isEqualTo(2);
        assertThat(response.get(0).getStartTime()).isEqualTo(BASE.withHour(1));
        assertThat(response.get(0).getEndTime()).isEqualTo(BASE.withHour(2));
        assertThat(response.get(0).getName()).isEqualTo(WeatherRiskType.TORRENTIAL_RAIN);
        assertThat(response.get(1).getStartTime()).isEqualTo(BASE.withHour(4));
        assertThat(response.get(1).getEndTime()).isEqualTo(BASE.withHour(5));
        assertThat(response.get(1).getName()).isEqualTo(WeatherRiskType.TORRENTIAL_RAIN);
    }

    @Test
    void 비와_호우에_해당하는_응답이_여러구간_있는_경우() {
        // given
        // (01~02시 HEAVY_RAIN) + (03~05시 RAIN)
        Map<LocalDateTime, List<VilageFcstItemsDto>> parameter = new LinkedHashMap<>();
        parameter.put(at(1), List.of(createItem("PCP", at(1), "30.0~50.0mm")));
        parameter.put(at(2), List.of(createItem("PCP", at(2), "30.0~50.0mm")));
        parameter.put(at(3), List.of(createItem("PCP", at(3), "1mm 미만")));
        parameter.put(at(4), List.of(createItem("PCP", at(4), "1mm 미만")));
        parameter.put(at(5), List.of(createItem("PCP", at(5), "1.5mm")));

        // when
        List<ShortTermWeatherDto.WeatherRiskDto> response = filter.filtering(parameter);

        // then
        assertThat(response.size()).isEqualTo(2);
        assertThat(response.get(0).getStartTime()).isEqualTo(BASE.withHour(1));
        assertThat(response.get(0).getEndTime()).isEqualTo(BASE.withHour(2));
        assertThat(response.get(0).getName()).isEqualTo(WeatherRiskType.HEAVY_RAIN);
        assertThat(response.get(1).getStartTime()).isEqualTo(BASE.withHour(3));
        assertThat(response.get(1).getEndTime()).isEqualTo(BASE.withHour(5));
        assertThat(response.get(1).getName()).isEqualTo(WeatherRiskType.RAIN);
    }

    @Test
    void 비와_폭우와_호우에_해당하는_응답이_여러구간_있는_경우() {
        // given
        // (01~02시 HEAVY_RAIN) + (03시 TORRENTIAL_RAIN) + (04~05시 RAIN)
        Map<LocalDateTime, List<VilageFcstItemsDto>> parameter = new LinkedHashMap<>();
        parameter.put(at(1), List.of(createItem("PCP", at(1), "30.0~50.0mm")));
        parameter.put(at(2), List.of(createItem("PCP", at(2), "30.0~50.0mm")));
        parameter.put(at(3), List.of(createItem("PCP", at(3), "50.0mm 이상")));
        parameter.put(at(4), List.of(createItem("PCP", at(4), "1mm 미만")));
        parameter.put(at(5), List.of(createItem("PCP", at(5), "1.5mm")));

        // when
        List<ShortTermWeatherDto.WeatherRiskDto> response = filter.filtering(parameter);

        // then
        assertThat(response.size()).isEqualTo(3);
        assertThat(response.get(0).getStartTime()).isEqualTo(BASE.withHour(1));
        assertThat(response.get(0).getEndTime()).isEqualTo(BASE.withHour(2));
        assertThat(response.get(0).getName()).isEqualTo(WeatherRiskType.HEAVY_RAIN);
        assertThat(response.get(1).getStartTime()).isEqualTo(BASE.withHour(3));
        assertThat(response.get(1).getEndTime()).isEqualTo(BASE.withHour(3));
        assertThat(response.get(1).getName()).isEqualTo(WeatherRiskType.TORRENTIAL_RAIN);
        assertThat(response.get(2).getStartTime()).isEqualTo(BASE.withHour(4));
        assertThat(response.get(2).getEndTime()).isEqualTo(BASE.withHour(5));
        assertThat(response.get(2).getName()).isEqualTo(WeatherRiskType.RAIN);
    }

    @Test
    void 강수량이_없는_경우() {
        // given (모두 강수없음/0 → 빈 결과)
        Map<LocalDateTime, List<VilageFcstItemsDto>> parameter = new LinkedHashMap<>();
        parameter.put(at(1), List.of(createItem("PCP", at(1), "강수없음")));
        parameter.put(at(2), List.of(createItem("PCP", at(2), "강수없음")));
        parameter.put(at(3), List.of(createItem("PCP", at(3), "0")));
        parameter.put(at(4), List.of(createItem("PCP", at(4), "0")));

        // when
        List<ShortTermWeatherDto.WeatherRiskDto> response = filter.filtering(parameter);

        // then
        assertThat(response.size()).isEqualTo(0);
    }

    @Test
    void 다음날로_넘어가는_경우() {
        // given (전일 23시 → 익일 00, 01시 연속 RAIN)
        Map<LocalDateTime, List<VilageFcstItemsDto>> parameter = new LinkedHashMap<>();
        LocalDateTime d23 = BASE.withHour(23);
        LocalDateTime d24 = BASE.plusDays(1).withHour(0);
        LocalDateTime d25 = BASE.plusDays(1).withHour(1);

        parameter.put(d23, List.of(createItem("PCP", at(1), "1mm 미만")));
        parameter.put(d24, List.of(createItem("PCP", at(1), "1mm 미만")));
        parameter.put(d25, List.of(createItem("PCP", at(1), "1mm 미만")));

        // when
        List<ShortTermWeatherDto.WeatherRiskDto> response = filter.filtering(parameter);

        // then
        assertThat(response.size()).isEqualTo(1);
        assertThat(response.get(0).getStartTime()).isEqualTo(BASE.withHour(23));
        assertThat(response.get(0).getEndTime()).isEqualTo(BASE.plusDays(1L).withHour(1));
        assertThat(response.get(0).getName()).isEqualTo(WeatherRiskType.RAIN);
    }

    // ========== 헬퍼 ==========
    private static LocalDateTime at(int hour) {
        // hour: 0~23 → ForecastTimeUtils가 시간→지표(1~24 등)로 바꾼다고 가정
        return BASE.withHour(hour);
    }

    private VilageFcstItemsDto createItem(String category, LocalDateTime fcstDateTime, String value) {
        return new VilageFcstItemsDto(
                category,
                fcstDateTime,
                value,
                60,
                127
        );
    }
}
