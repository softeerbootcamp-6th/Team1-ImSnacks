package com.ImSnacks.NyeoreumnagiBatch.filterTest;

import com.ImSnacks.NyeoreumnagiBatch.reader.dto.VilageFcstResponseDto;
import com.ImSnacks.NyeoreumnagiBatch.utils.weatherRiskFilter.RainFilter;
import com.ImSnacks.NyeoreumnagiBatch.utils.weatherRiskFilter.WeatherRiskFilter;
import com.ImSnacks.NyeoreumnagiBatch.writer.dto.ShortTermWeatherDto;
import com.ImSnacks.NyeoreumnagiBatch.writer.entity.WeatherRiskType;
import org.junit.jupiter.api.Test;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

public class RainFilterTest {
    private static final WeatherRiskFilter filter = new RainFilter();

    @Test
    void 비에_해당하는_응답만_있는_경우(){
        //given
        Map<String, List<VilageFcstResponseDto.Item>> parameter = new LinkedHashMap<>();
        parameter.put("0100", List.of(
                createItem("PCP", "250805", "0000", "250804", "0100", "1mm 미만")
        ));
        parameter.put("0200", List.of(
                createItem("PCP", "250805", "0000", "250804", "0100", "19mm")
        ));
        parameter.put("0300", List.of(
                createItem("PCP", "250805", "0000", "250804", "0100", "1.5mm")
        ));

        //when
        List<ShortTermWeatherDto.WeatherRiskDto> response = filter.filtering(parameter);

        //then
        assertThat(response.size()).isEqualTo(1);
        assertThat(response.get(0).getStartTime()).isEqualTo(1);
        assertThat(response.get(0).getEndTime()).isEqualTo(3);
        assertThat(response.get(0).getName()).isEqualTo(WeatherRiskType.RAIN);
    }

    @Test
    void 호우에_해당하는_응답만_있는_경우(){
        //given
        Map<String, List<VilageFcstResponseDto.Item>> parameter = Map.of(
                "0100", List.of(
                        createItem("PCP", "250805", "0000", "250804", "0100", "30.0~50.0mm")
                ),
                "0200", List.of(
                        createItem("PCP", "250805", "0000", "250804", "0100", "30.0~50.0mm")
                ),
                "0300", List.of(
                        createItem("PCP", "250805", "0000", "250804", "0100", "30.0~50.0mm")
                )
        );

        //when
        List<ShortTermWeatherDto.WeatherRiskDto> response = filter.filtering(parameter);

        //then
        assertThat(response.size()).isEqualTo(1);
        assertThat(response.get(0).getStartTime()).isEqualTo(1);
        assertThat(response.get(0).getEndTime()).isEqualTo(3);
        assertThat(response.get(0).getName()).isEqualTo(WeatherRiskType.HEAVY_RAIN);
    }

    @Test
    void 폭우에_해당하는_응답만_있는_경우(){
        //given
        Map<String, List<VilageFcstResponseDto.Item>> parameter = Map.of(
                "0100", List.of(
                        createItem("PCP", "250805", "0000", "250804", "0100", "50.0mm 이상")
                ),
                "0200", List.of(
                        createItem("PCP", "250805", "0000", "250804", "0100", "50.0mm 이상")
                ),
                "0300", List.of(
                        createItem("PCP", "250805", "0000", "250804", "0100", "50.0mm 이상")
                )
        );

        //when
        List<ShortTermWeatherDto.WeatherRiskDto> response = filter.filtering(parameter);

        //then
        assertThat(response.size()).isEqualTo(1);
        assertThat(response.get(0).getStartTime()).isEqualTo(1);
        assertThat(response.get(0).getEndTime()).isEqualTo(3);
        assertThat(response.get(0).getName()).isEqualTo(WeatherRiskType.TORRENTIAL_RAIN);
    }

    @Test
    void 비에_해당하는_응답이_여러구간_있는_경우(){
        //given
        Map<String, List<VilageFcstResponseDto.Item>> parameter = new LinkedHashMap<>();
        parameter.put("0100", List.of(
                createItem("PCP", "250805", "0000", "250804", "0100", "1.7mm")
        ));
        parameter.put("0200", List.of(
                createItem("PCP", "250805", "0000", "250804", "0100", "1mm 미만")
        ));
        parameter.put("0400", List.of(
                createItem("PCP", "250805", "0000", "250804", "0100", "19.0mm")
        ));
        parameter.put("0500", List.of(
                createItem("PCP", "250805", "0000", "250804", "0100", "1mm 미만")
        ));

        //when
        List<ShortTermWeatherDto.WeatherRiskDto> response = filter.filtering(parameter);

        //then
        assertThat(response.size()).isEqualTo(2);
        assertThat(response.get(0).getStartTime()).isEqualTo(1);
        assertThat(response.get(0).getEndTime()).isEqualTo(2);
        assertThat(response.get(0).getName()).isEqualTo(WeatherRiskType.RAIN);
        assertThat(response.get(1).getStartTime()).isEqualTo(4);
        assertThat(response.get(1).getEndTime()).isEqualTo(5);
        assertThat(response.get(1).getName()).isEqualTo(WeatherRiskType.RAIN);
    }

    @Test
    void 호우에_해당하는_응답이_여러구간_있는_경우(){
        //given
        Map<String, List<VilageFcstResponseDto.Item>> parameter = Map.of(
                "0100", List.of(
                        createItem("PCP", "250805", "0000", "250804", "0100", "30.0~50.0mm")
                ),
                "0200", List.of(
                        createItem("PCP", "250805", "0000", "250804", "0100", "30.0~50.0mm")
                ),
                "0400", List.of(
                        createItem("PCP", "250805", "0000", "250804", "0100", "30.0~50.0mm")
                ),
                "0500", List.of(
                        createItem("PCP", "250805", "0000", "250804", "0100", "30.0~50.0mm")
                )
        );

        //when
        List<ShortTermWeatherDto.WeatherRiskDto> response = filter.filtering(parameter);

        //then
        assertThat(response.size()).isEqualTo(2);
        assertThat(response.get(0).getStartTime()).isEqualTo(1);
        assertThat(response.get(0).getEndTime()).isEqualTo(2);
        assertThat(response.get(0).getName()).isEqualTo(WeatherRiskType.HEAVY_RAIN);
        assertThat(response.get(1).getStartTime()).isEqualTo(4);
        assertThat(response.get(1).getEndTime()).isEqualTo(5);
        assertThat(response.get(1).getName()).isEqualTo(WeatherRiskType.HEAVY_RAIN);
    }

    @Test
    void 폭우에_해당하는_응답이_여러구간_있는_경우(){
        //given
        Map<String, List<VilageFcstResponseDto.Item>> parameter = Map.of(
                "0100", List.of(
                        createItem("PCP", "250805", "0000", "250804", "0100", "50.0mm 이상")
                ),
                "0200", List.of(
                        createItem("PCP", "250805", "0000", "250804", "0100", "50.0mm 이상")
                ),
                "0400", List.of(
                        createItem("PCP", "250805", "0000", "250804", "0100", "50.0mm 이상")
                ),
                "0500", List.of(
                        createItem("PCP", "250805", "0000", "250804", "0100", "50.0mm 이상")
                )
        );

        //when
        List<ShortTermWeatherDto.WeatherRiskDto> response = filter.filtering(parameter);

        //then
        assertThat(response.size()).isEqualTo(2);
        assertThat(response.get(0).getStartTime()).isEqualTo(1);
        assertThat(response.get(0).getEndTime()).isEqualTo(2);
        assertThat(response.get(0).getName()).isEqualTo(WeatherRiskType.TORRENTIAL_RAIN);
        assertThat(response.get(1).getStartTime()).isEqualTo(4);
        assertThat(response.get(1).getEndTime()).isEqualTo(5);
        assertThat(response.get(1).getName()).isEqualTo(WeatherRiskType.TORRENTIAL_RAIN);
    }

    @Test
    void 비와_호우에_해당하는_응답이_여러구간_있는_경우(){
        //given
        Map<String, List<VilageFcstResponseDto.Item>> parameter = Map.of(
                "0100", List.of(
                        createItem("PCP", "250805", "0000", "250804", "0100", "30.0~50.0mm")
                ),
                "0200", List.of(
                        createItem("PCP", "250805", "0000", "250804", "0100", "30.0~50.0mm")
                ),
                "0300", List.of(
                        createItem("PCP", "250805", "0000", "250804", "0100", "1mm 미만")
                ),
                "0400", List.of(
                        createItem("PCP", "250805", "0000", "250804", "0100", "1mm 미만")
                ),
                "0500", List.of(
                        createItem("PCP", "250805", "0000", "250804", "0100", "1.5mm")
                )
        );

        //when
        List<ShortTermWeatherDto.WeatherRiskDto> response = filter.filtering(parameter);

        //then
        assertThat(response.size()).isEqualTo(2);
        assertThat(response.get(0).getStartTime()).isEqualTo(1);
        assertThat(response.get(0).getEndTime()).isEqualTo(2);
        assertThat(response.get(0).getName()).isEqualTo(WeatherRiskType.HEAVY_RAIN);
        assertThat(response.get(1).getStartTime()).isEqualTo(3);
        assertThat(response.get(1).getEndTime()).isEqualTo(5);
        assertThat(response.get(1).getName()).isEqualTo(WeatherRiskType.RAIN);
    }

    @Test
    void 비와_폭우와_호우에_해당하는_응답이_여러구간_있는_경우(){
        //given
        Map<String, List<VilageFcstResponseDto.Item>> parameter = Map.of(
                "0100", List.of(
                        createItem("PCP", "250805", "0000", "250804", "0100", "30.0~50.0mm")
                ),
                "0200", List.of(
                        createItem("PCP", "250805", "0000", "250804", "0100", "30.0~50.0mm")
                ),
                "0300", List.of(
                        createItem("PCP", "250805", "0000", "250804", "0100", "50.0mm 이상")
                ),
                "0400", List.of(
                        createItem("PCP", "250805", "0000", "250804", "0100", "1mm 미만")
                ),
                "0500", List.of(
                        createItem("PCP", "250805", "0000", "250804", "0100", "1.5mm")
                )
        );

        //when
        List<ShortTermWeatherDto.WeatherRiskDto> response = filter.filtering(parameter);

        //then
        assertThat(response.size()).isEqualTo(3);
        assertThat(response.get(0).getStartTime()).isEqualTo(1);
        assertThat(response.get(0).getEndTime()).isEqualTo(2);
        assertThat(response.get(0).getName()).isEqualTo(WeatherRiskType.HEAVY_RAIN);
        assertThat(response.get(1).getStartTime()).isEqualTo(3);
        assertThat(response.get(1).getEndTime()).isEqualTo(3);
        assertThat(response.get(1).getName()).isEqualTo(WeatherRiskType.TORRENTIAL_RAIN);
        assertThat(response.get(2).getStartTime()).isEqualTo(4);
        assertThat(response.get(2).getEndTime()).isEqualTo(5);
        assertThat(response.get(2).getName()).isEqualTo(WeatherRiskType.RAIN);
    }

    @Test
    void 강수량이_없는_경우(){
        //given
        Map<String, List<VilageFcstResponseDto.Item>> parameter = Map.of(
                "0100", List.of(
                        createItem("PCP", "250805", "0000", "250804", "0100", "강수없음")
                ),
                "0200", List.of(
                        createItem("PCP", "250805", "0000", "250804", "0100", "강수없음")
                ),
                "0300", List.of(
                        createItem("PCP", "250805", "0000", "250804", "0100", "0")
                ),
                "0500", List.of(
                        createItem("PCP", "250805", "0000", "250804", "0100", "0")
                )
        );

        //when
        List<ShortTermWeatherDto.WeatherRiskDto> response = filter.filtering(parameter);

        //then
        assertThat(response.size()).isEqualTo(0);
    }

    @Test
    void 다음날로_넘어가는_경우(){
        //given
        Map<String, List<VilageFcstResponseDto.Item>> parameter = Map.of(
                "2300", List.of(
                        createItem("PCP", "250805", "0000", "250804", "0100", "1mm 미만")
                ),
                "0000", List.of(
                        createItem("PCP", "250805", "0000", "250804", "0100", "1mm 미만")
                ),
                "0100", List.of(
                        createItem("PCP", "250805", "0000", "250804", "0100", "1mm 미만")
                )
        );

        //when
        List<ShortTermWeatherDto.WeatherRiskDto> response = filter.filtering(parameter);

        //then
        assertThat(response.size()).isEqualTo(1);
        assertThat(response.get(0).getStartTime()).isEqualTo(23);
        assertThat(response.get(0).getEndTime()).isEqualTo(1);
        assertThat(response.get(0).getName()).isEqualTo(WeatherRiskType.RAIN);
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
