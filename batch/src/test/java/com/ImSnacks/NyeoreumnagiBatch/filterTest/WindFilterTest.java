package com.ImSnacks.NyeoreumnagiBatch.filterTest;

import com.ImSnacks.NyeoreumnagiBatch.reader.dto.VilageFcstResponseDto;
import com.ImSnacks.NyeoreumnagiBatch.processor.utils.weatherRiskFilter.WeatherRiskFilter;
import com.ImSnacks.NyeoreumnagiBatch.processor.utils.weatherRiskFilter.WindFilter;
import com.ImSnacks.NyeoreumnagiBatch.writer.dto.ShortTermWeatherDto;
import com.ImSnacks.NyeoreumnagiBatch.writer.entity.WeatherRiskType;
import org.junit.jupiter.api.Test;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

public class WindFilterTest {
    private static final WeatherRiskFilter filter = new WindFilter();

    @Test
    void 강풍이_하나의_구간만_있을_때(){
        //given
        Map<String, List<VilageFcstResponseDto.Item>> parameter = new LinkedHashMap<>();
        parameter.put("0100", List.of(
                createItem("WSD", "250805", "0000", "250805", "0100", "15")
        ));
        parameter.put("0200", List.of(
                createItem("WSD", "250805", "0000", "250805", "0200", "25.4")
        ));
        parameter.put("0300", List.of(
                createItem("WSD", "250805", "0000", "250805", "0300", "3.2")
        ));
        //when
        List<ShortTermWeatherDto.WeatherRiskDto> response = filter.filtering(parameter);
        //then
        assertThat(response.size()).isEqualTo(1);
        assertThat(response.get(0).getStartTime()).isEqualTo(1);
        assertThat(response.get(0).getEndTime()).isEqualTo(2);
        assertThat(response.get(0).getName()).isEqualTo(WeatherRiskType.STRONG_WIND);
    }

    @Test
    void 강풍이_여러_구간에_있을_때(){
        //given
        Map<String, List<VilageFcstResponseDto.Item>> parameter = new LinkedHashMap<>();
        parameter.put("0100", List.of(
                createItem("WSD", "250805", "0000", "250805", "0100", "15")
        ));
        parameter.put("0200", List.of(
                createItem("WSD", "250805", "0000", "250805", "0200", "25.4")
        ));
        parameter.put("0400", List.of(
                createItem("WSD", "250805", "0000", "250805", "0400", "24.5")
        ));
        parameter.put("0500", List.of(
                createItem("WSD", "250805", "0000", "250805", "0500", "3.2")
        ));
        //when
        List<ShortTermWeatherDto.WeatherRiskDto> response = filter.filtering(parameter);
        //then
        assertThat(response.size()).isEqualTo(2);
        assertThat(response.get(0).getStartTime()).isEqualTo(1);
        assertThat(response.get(0).getEndTime()).isEqualTo(2);
        assertThat(response.get(0).getName()).isEqualTo(WeatherRiskType.STRONG_WIND);
        assertThat(response.get(1).getStartTime()).isEqualTo(4);
        assertThat(response.get(1).getEndTime()).isEqualTo(4);
        assertThat(response.get(1).getName()).isEqualTo(WeatherRiskType.STRONG_WIND);
    }

    @Test
    void 바람이_안_불_때(){
        //given
        Map<String, List<VilageFcstResponseDto.Item>> parameter = new LinkedHashMap<>();
        parameter.put("0100", List.of(
                createItem("WSD", "250805", "0000", "250805", "0100", "12")
        ));
        parameter.put("0200", List.of(
                createItem("WSD", "250805", "0000", "250805", "0200", "13")
        ));
        parameter.put("0400", List.of(
                createItem("WSD", "250805", "0000", "250805", "0400", "2")
        ));
        parameter.put("0500", List.of(
                createItem("WSD", "250805", "0000", "250805", "0500", "3.2")
        ));
        //when
        List<ShortTermWeatherDto.WeatherRiskDto> response = filter.filtering(parameter);
        //then
        assertThat(response.size()).isEqualTo(0);
    }

    private VilageFcstResponseDto.Item createItem(String category, String baseDate, String baseTime, String fcstDate, String fcstTime, String value) {
        VilageFcstResponseDto.Item item = new VilageFcstResponseDto.Item();
        item.setCategory(category);
        item.setBaseDate(baseDate);
        item.setBaseTime(baseTime);
        item.setFcstDate(fcstDate);
        item.setFcstTime(fcstTime);
        item.setFcstValue(value);
        item.setNx(60);
        item.setNy(127);
        return item;
    }
}
