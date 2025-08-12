package com.ImSnacks.NyeoreumnagiBatch.filterTest;

import com.ImSnacks.NyeoreumnagiBatch.shortTermWeatherForecast.processor.dto.VilageFcstItemsDto;
import com.ImSnacks.NyeoreumnagiBatch.shortTermWeatherForecast.processor.utils.weatherRiskFilter.TemperatureFilter;
import com.ImSnacks.NyeoreumnagiBatch.shortTermWeatherForecast.processor.utils.weatherRiskFilter.WeatherRiskFilter;
import com.ImSnacks.NyeoreumnagiBatch.shortTermWeatherForecast.writer.dto.ShortTermWeatherDto;
import com.ImSnacks.NyeoreumnagiBatch.common.entity.WeatherRiskType;
import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

class TemperatureFilterTest {

    private static final WeatherRiskFilter filter = new TemperatureFilter();
    private static final LocalDateTime BASE = LocalDateTime.of(2025, 8, 5, 0, 0);

    @Test
    void 서리만_있는_경우() {
        Map<LocalDateTime, List<VilageFcstItemsDto>> parameter = new LinkedHashMap<>();
        parameter.put(at(1), List.of(createItem("TMP", at(1), "-5")));
        parameter.put(at(2), List.of(createItem("TMP", at(2), "-5")));
        parameter.put(at(3), List.of(createItem("TMP", at(3), "-8")));

        List<ShortTermWeatherDto.WeatherRiskDto> response = filter.filtering(parameter);

        assertThat(response.size()).isEqualTo(1);
        assertThat(response.get(0).getStartTime()).isEqualTo(at(1));
        assertThat(response.get(0).getEndTime()).isEqualTo(at(3));
        assertThat(response.get(0).getName()).isEqualTo(WeatherRiskType.FROST);
    }

    @Test
    void 이상고온만_있는_경우() {
        Map<LocalDateTime, List<VilageFcstItemsDto>> parameter = new LinkedHashMap<>();
        parameter.put(at(1), List.of(createItem("TMP", at(1), "31")));
        parameter.put(at(2), List.of(createItem("TMP", at(2), "35")));
        parameter.put(at(3), List.of(createItem("TMP", at(3), "30")));

        List<ShortTermWeatherDto.WeatherRiskDto> response = filter.filtering(parameter);

        assertThat(response.size()).isEqualTo(1);
        assertThat(response.get(0).getStartTime()).isEqualTo(at(1));
        assertThat(response.get(0).getEndTime()).isEqualTo(at(2));
        assertThat(response.get(0).getName()).isEqualTo(WeatherRiskType.ABNORMAL_HEAT);
    }

    @Test
    void 아무것도_없는_경우() {
        Map<LocalDateTime, List<VilageFcstItemsDto>> parameter = new LinkedHashMap<>();
        parameter.put(at(1), List.of(createItem("TMP", at(1), "30")));
        parameter.put(at(2), List.of(createItem("TMP", at(2), "-5")));
        parameter.put(at(3), List.of(createItem("TMP", at(3), "-1")));

        List<ShortTermWeatherDto.WeatherRiskDto> response = filter.filtering(parameter);

        assertThat(response.size()).isEqualTo(0);
    }

    @Test
    void 서리가_여러개_있는_경우() {
        Map<LocalDateTime, List<VilageFcstItemsDto>> parameter = new LinkedHashMap<>();
        parameter.put(at(1), List.of(createItem("TMP", at(1), "-5")));
        parameter.put(at(2), List.of(createItem("TMP", at(2), "-5")));
        parameter.put(at(4), List.of(createItem("TMP", at(4), "-8")));
        parameter.put(at(5), List.of(createItem("TMP", at(5), "-8")));

        List<ShortTermWeatherDto.WeatherRiskDto> response = filter.filtering(parameter);

        assertThat(response.size()).isEqualTo(2);
        assertThat(response.get(0).getStartTime()).isEqualTo(at(1));
        assertThat(response.get(0).getEndTime()).isEqualTo(at(2));
        assertThat(response.get(0).getName()).isEqualTo(WeatherRiskType.FROST);
        assertThat(response.get(1).getStartTime()).isEqualTo(at(4));
        assertThat(response.get(1).getEndTime()).isEqualTo(at(5));
        assertThat(response.get(1).getName()).isEqualTo(WeatherRiskType.FROST);
    }

    @Test
    void 이상기온이_여러개_있는_경우() {
        Map<LocalDateTime, List<VilageFcstItemsDto>> parameter = new LinkedHashMap<>();
        parameter.put(at(1), List.of(createItem("TMP", at(1), "45")));
        parameter.put(at(2), List.of(createItem("TMP", at(2), "43")));
        parameter.put(at(4), List.of(createItem("TMP", at(4), "76")));
        parameter.put(at(5), List.of(createItem("TMP", at(5), "53")));

        List<ShortTermWeatherDto.WeatherRiskDto> response = filter.filtering(parameter);

        assertThat(response.size()).isEqualTo(2);
        assertThat(response.get(0).getStartTime()).isEqualTo(at(1));
        assertThat(response.get(0).getEndTime()).isEqualTo(at(2));
        assertThat(response.get(0).getName()).isEqualTo(WeatherRiskType.ABNORMAL_HEAT);
        assertThat(response.get(1).getStartTime()).isEqualTo(at(4));
        assertThat(response.get(1).getEndTime()).isEqualTo(at(5));
        assertThat(response.get(1).getName()).isEqualTo(WeatherRiskType.ABNORMAL_HEAT);
    }

    // 헬퍼 메서드
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
