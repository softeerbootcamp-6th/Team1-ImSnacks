package com.ImSnacks.NyeoreumnagiBatch.filterTest;

import com.ImSnacks.NyeoreumnagiBatch.reader.dto.VilageFcstResponseDto;
import com.ImSnacks.NyeoreumnagiBatch.processor.utils.weatherRiskFilter.TemperatureFilter;
import com.ImSnacks.NyeoreumnagiBatch.processor.utils.weatherRiskFilter.WeatherRiskFilter;
import com.ImSnacks.NyeoreumnagiBatch.writer.dto.ShortTermWeatherDto;
import com.ImSnacks.NyeoreumnagiBatch.writer.entity.WeatherRiskType;
import org.junit.jupiter.api.Test;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

public class TemperatureFilterTest {
    private static final WeatherRiskFilter filter = new TemperatureFilter();

    @Test
    void 서리만_있는_경우(){
        //given
        Map<String, List<VilageFcstResponseDto.Item>> parameter = new LinkedHashMap<>();
        parameter.put("0100", List.of(
                createItem("TMP", "250805", "0000", "250805", "0100", "-5")
        ));
        parameter.put("0200", List.of(
                createItem("TMP", "250805", "0000", "250805", "0100", "-5")
        ));
        parameter.put("0300", List.of(
                createItem("TMP", "250805", "0000", "250805", "0300", "-8")
        ));
        //when
        List<ShortTermWeatherDto.WeatherRiskDto> response = filter.filtering(parameter);
        //then
        assertThat(response.size()).isEqualTo(1);
        assertThat(response.get(0).getStartTime()).isEqualTo(1);
        assertThat(response.get(0).getEndTime()).isEqualTo(3);
        assertThat(response.get(0).getName()).isEqualTo(WeatherRiskType.FROST);
    }

    @Test
    void 이상고온만_있는_경우(){
        //given
        Map<String, List<VilageFcstResponseDto.Item>> parameter = new LinkedHashMap<>();
        parameter.put("0100", List.of(
                createItem("TMP", "250805", "0000", "250805", "0100", "31")
        ));
        parameter.put("0200", List.of(
                createItem("TMP", "250805", "0000", "250805", "0100", "35")
        ));
        parameter.put("0300", List.of(
                createItem("TMP", "250805", "0000", "250805", "0300", "30")
        ));
        //when
        List<ShortTermWeatherDto.WeatherRiskDto> response = filter.filtering(parameter);
        //then
        assertThat(response.size()).isEqualTo(1);
        assertThat(response.get(0).getStartTime()).isEqualTo(1);
        assertThat(response.get(0).getEndTime()).isEqualTo(2);
        assertThat(response.get(0).getName()).isEqualTo(WeatherRiskType.ABNORMAL_HEAT);
    }

    @Test
    void 아무것도_없는_경우(){
        //given
        Map<String, List<VilageFcstResponseDto.Item>> parameter = new LinkedHashMap<>();
        parameter.put("0100", List.of(
                createItem("TMP", "250805", "0000", "250805", "0100", "30")
        ));
        parameter.put("0200", List.of(
                createItem("TMP", "250805", "0000", "250805", "0100", "-5")
        ));
        parameter.put("0300", List.of(
                createItem("TMP", "250805", "0000", "250805", "0300", "-1")
        ));
        //when
        List<ShortTermWeatherDto.WeatherRiskDto> response = filter.filtering(parameter);
        //then
        assertThat(response.size()).isEqualTo(0);
    }

    @Test
    void 서리가_여러개_있는_경우(){
        //given
        Map<String, List<VilageFcstResponseDto.Item>> parameter = new LinkedHashMap<>();
        parameter.put("0100", List.of(
                createItem("TMP", "250805", "0000", "250805", "0100", "-5")
        ));
        parameter.put("0200", List.of(
                createItem("TMP", "250805", "0000", "250805", "0100", "-5")
        ));
        parameter.put("0400", List.of(
                createItem("TMP", "250805", "0000", "250805", "0300", "-8")
        ));
        parameter.put("0500", List.of(
                createItem("TMP", "250805", "0000", "250805", "0300", "-8")
        ));
        //when
        List<ShortTermWeatherDto.WeatherRiskDto> response = filter.filtering(parameter);
        //then
        assertThat(response.size()).isEqualTo(2);
        assertThat(response.get(0).getStartTime()).isEqualTo(1);
        assertThat(response.get(0).getEndTime()).isEqualTo(2);
        assertThat(response.get(0).getName()).isEqualTo(WeatherRiskType.FROST);
        assertThat(response.get(1).getStartTime()).isEqualTo(4);
        assertThat(response.get(1).getEndTime()).isEqualTo(5);
        assertThat(response.get(1).getName()).isEqualTo(WeatherRiskType.FROST);
    }

    @Test
    void 이상기온이_여러개_있는_경우(){
        //given
        Map<String, List<VilageFcstResponseDto.Item>> parameter = new LinkedHashMap<>();
        parameter.put("0100", List.of(
                createItem("TMP", "250805", "0000", "250805", "0100", "445")
        ));
        parameter.put("0200", List.of(
                createItem("TMP", "250805", "0000", "250805", "0100", "43")
        ));
        parameter.put("0400", List.of(
                createItem("TMP", "250805", "0000", "250805", "0300", "76")
        ));
        parameter.put("0500", List.of(
                createItem("TMP", "250805", "0000", "250805", "0500", "53")
        ));
        //when
        List<ShortTermWeatherDto.WeatherRiskDto> response = filter.filtering(parameter);
        //then
        assertThat(response.size()).isEqualTo(2);
        assertThat(response.get(0).getStartTime()).isEqualTo(1);
        assertThat(response.get(0).getEndTime()).isEqualTo(2);
        assertThat(response.get(0).getName()).isEqualTo(WeatherRiskType.ABNORMAL_HEAT);
        assertThat(response.get(1).getStartTime()).isEqualTo(4);
        assertThat(response.get(1).getEndTime()).isEqualTo(5);
        assertThat(response.get(1).getName()).isEqualTo(WeatherRiskType.ABNORMAL_HEAT);
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
