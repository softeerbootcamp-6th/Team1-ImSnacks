package com.ImSnacks.NyeoreumnagiBatch.filterTest;

import com.ImSnacks.NyeoreumnagiBatch.shortTermWeatherForecast.processor.dto.VilageFcstItemsDto;
import com.ImSnacks.NyeoreumnagiBatch.shortTermWeatherForecast.processor.utils.weatherRiskFilter.WeatherRiskFilter;
import com.ImSnacks.NyeoreumnagiBatch.shortTermWeatherForecast.processor.utils.weatherRiskFilter.WindFilter;
import com.ImSnacks.NyeoreumnagiBatch.shortTermWeatherForecast.writer.dto.ShortTermWeatherDto;
import com.ImSnacks.NyeoreumnagiBatch.shortTermWeatherForecast.writer.entity.WeatherRiskType;
import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

class WindFilterTest {

    private static final WeatherRiskFilter filter = new WindFilter();
    private static final LocalDateTime BASE = LocalDateTime.of(2025, 8, 5, 0, 0);

    @Test
    void 강풍이_하나의_구간만_있을_때() {
        // given
        Map<LocalDateTime, List<VilageFcstItemsDto>> parameter = new LinkedHashMap<>();
        parameter.put(at(1), List.of(createItem("WSD", at(1), "15")));
        parameter.put(at(2), List.of(createItem("WSD", at(2), "25.4")));
        parameter.put(at(3), List.of(createItem("WSD", at(3), "3.2")));

        // when
        List<ShortTermWeatherDto.WeatherRiskDto> response = filter.filtering(parameter);

        // then
        assertThat(response.size()).isEqualTo(1);
        assertThat(response.get(0).getStartTime()).isEqualTo(at(1));
        assertThat(response.get(0).getEndTime()).isEqualTo(at(2));
        assertThat(response.get(0).getName()).isEqualTo(WeatherRiskType.STRONG_WIND);
    }

    @Test
    void 강풍이_여러_구간에_있을_때() {
        // given
        Map<LocalDateTime, List<VilageFcstItemsDto>> parameter = new LinkedHashMap<>();
        parameter.put(at(1), List.of(createItem("WSD", at(1), "15")));
        parameter.put(at(2), List.of(createItem("WSD", at(2), "25.4")));
        parameter.put(at(4), List.of(createItem("WSD", at(4), "24.5")));
        parameter.put(at(5), List.of(createItem("WSD", at(5), "3.2")));

        // when
        List<ShortTermWeatherDto.WeatherRiskDto> response = filter.filtering(parameter);

        // then
        assertThat(response.size()).isEqualTo(2);
        assertThat(response.get(0).getStartTime()).isEqualTo(at(1));
        assertThat(response.get(0).getEndTime()).isEqualTo(at(2));
        assertThat(response.get(0).getName()).isEqualTo(WeatherRiskType.STRONG_WIND);
        assertThat(response.get(1).getStartTime()).isEqualTo(at(4));
        assertThat(response.get(1).getEndTime()).isEqualTo(at(4));
        assertThat(response.get(1).getName()).isEqualTo(WeatherRiskType.STRONG_WIND);
    }

    @Test
    void 바람이_안_불_때() {
        // given
        Map<LocalDateTime, List<VilageFcstItemsDto>> parameter = new LinkedHashMap<>();
        parameter.put(at(1), List.of(createItem("WSD", at(1), "12")));
        parameter.put(at(2), List.of(createItem("WSD", at(2), "13")));
        parameter.put(at(3), List.of(createItem("WSD", at(3), "2")));
        parameter.put(at(4), List.of(createItem("WSD", at(4), "3.2")));

        // when
        List<ShortTermWeatherDto.WeatherRiskDto> response = filter.filtering(parameter);

        // then
        assertThat(response.size()).isEqualTo(0);
    }

    // ========= 헬퍼 메서드 =========
    private static LocalDateTime at(int hour) {
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
