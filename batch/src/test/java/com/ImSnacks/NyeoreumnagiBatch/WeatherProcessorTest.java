package com.ImSnacks.NyeoreumnagiBatch;

import com.ImSnacks.NyeoreumnagiBatch.reader.dto.VilageFcstResponseDto;
import com.ImSnacks.NyeoreumnagiBatch.processor.WeatherProcessor;
import com.ImSnacks.NyeoreumnagiBatch.writer.dto.ShortTermWeatherDto;
import com.ImSnacks.NyeoreumnagiBatch.writer.entity.WeatherRiskType;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDateTime;
import java.util.List;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

@SpringBootTest
public class WeatherProcessorTest {

    @Autowired
    private WeatherProcessor processor;

    // 테스트 기준 시각(고정): 2025-08-05 00:00
    private static final LocalDateTime BASE = LocalDateTime.of(2025, 8, 4, 0, 0);

    @Test
    void 네가지_카테고리만_있고_24시간_내의_데이터만_있을_때_엔티티_매핑_성공() throws Exception {
        //given
        List<VilageFcstResponseDto.Item> items = List.of(
                createItem("PCP", "20250804", "0000","20250804","0100", "1.1mm"),
                createItem("REH", "20250804", "0000","20250804","0100", "78"),
                createItem("TMP", "20250804", "0000","20250804","0100", "23"),
                createItem("WSD", "20250804", "0000","20250804","0100", "3.2")
        );
        VilageFcstResponseDto parameter = createMockVilageFcstResponse(items);

        //when
        ShortTermWeatherDto response = processor.process(parameter);

        //then
        assertThat(response.getWeatherForecastByTimeList().size()).isEqualTo(1);
        assertThat(response.getWeatherForecastByTimeList().get(0).getFcstTime()).isEqualTo(1);
        assertThat(response.getWeatherForecastByTimeList().get(0).getPrecipitation()).isEqualTo(1.1);
        assertThat(response.getWeatherForecastByTimeList().get(0).getTemperature()).isEqualTo(23);
        assertThat(response.getWeatherForecastByTimeList().get(0).getHumidity()).isEqualTo(78);
        assertThat(response.getWeatherForecastByTimeList().get(0).getWindSpeed()).isEqualTo(3.2);
    }

    @Test
    void 네가지_카테고리_중_일부가_없고_24시간_내의_데이터만_있을_때_엔티티_매핑_성공() throws Exception {
        //given
        List<VilageFcstResponseDto.Item> items = List.of(
                createItem("PCP", "20250804", "0000","20250804","0100", "1.1mm"),
                createItem("REH", "20250804", "0000","20250804","0100", "78")
        );
        VilageFcstResponseDto parameter = createMockVilageFcstResponse(items);

        //when
        ShortTermWeatherDto response = processor.process(parameter);

        //then
        assertThat(response.getWeatherForecastByTimeList().size()).isEqualTo(1);
        assertThat(response.getWeatherForecastByTimeList().get(0).getFcstTime()).isEqualTo(1);
        assertThat(response.getWeatherForecastByTimeList().get(0).getPrecipitation()).isEqualTo(1.1);
        assertThat(response.getWeatherForecastByTimeList().get(0).getTemperature()).isEqualTo(0);
        assertThat(response.getWeatherForecastByTimeList().get(0).getHumidity()).isEqualTo(78);
        assertThat(response.getWeatherForecastByTimeList().get(0).getWindSpeed()).isEqualTo(0);
    }

    @Test
    void 네가지_카테고리_외의_다른_것도_있고_24시간_내의_데이터만_있을_때_엔티티_매핑_성공() throws Exception {
        //given
        List<VilageFcstResponseDto.Item> items = List.of(
                createItem("PCP", "20250804", "0000","20250804","0100", "1.1mm"),
                createItem("REH", "20250804", "0000","20250804","0100", "78"),
                createItem("TMP", "20250804", "0000","20250804","0100", "23"),
                createItem("WSD", "20250804", "0000","20250804","0100", "3.2"),
                createItem("SAD", "20250804", "0000","20250804","0100", "1.1mm"),
                createItem("HAPPY", "20250804", "0000","20250804","0100", "78"),
                createItem("SOFTEER", "20250804", "0000","20250804","0100", "23"),
                createItem("HI", "20250804", "0000","20250804","0100", "3.2")
        );
        VilageFcstResponseDto parameter = createMockVilageFcstResponse(items);

        //when
        ShortTermWeatherDto response = processor.process(parameter);

        //then
        assertThat(response.getWeatherForecastByTimeList().size()).isEqualTo(1);
        assertThat(response.getWeatherForecastByTimeList().get(0).getFcstTime()).isEqualTo(1);
        assertThat(response.getWeatherForecastByTimeList().get(0).getPrecipitation()).isEqualTo(1.1);
        assertThat(response.getWeatherForecastByTimeList().get(0).getTemperature()).isEqualTo(23);
        assertThat(response.getWeatherForecastByTimeList().get(0).getHumidity()).isEqualTo(78);
        assertThat(response.getWeatherForecastByTimeList().get(0).getWindSpeed()).isEqualTo(3.2);
    }

    @Test
    void 네가지_카테고리_외의_다른_것도_있고_24시간_이후의_데이터도_있을_때_엔티티_매핑_성공() throws Exception {
        //given
        List<VilageFcstResponseDto.Item> items = List.of(
                createItem("PCP", "20250804", "0000","20250804","0100", "1.1mm"),
                createItem("REH", "20250804", "0000","20250804","0100", "78"),
                createItem("TMP", "20250804", "0000","20250804","0100", "23"),
                createItem("WSD", "20250804", "0000","20250804","0100", "3.2"),
                createItem("PCP", "20250804", "0000","20250805","0100", "4.4mm"),
                createItem("REH", "20250804", "0000","20250805","0100", "45"),
                createItem("TMP", "20250804", "0000","20250805","0100", "13"),
                createItem("WSD", "20250804", "0000","20250805","0100", "7.8")
        );
        VilageFcstResponseDto parameter = createMockVilageFcstResponse(items);

        //when
        ShortTermWeatherDto response = processor.process(parameter);

        //then
        assertThat(response.getWeatherForecastByTimeList().size()).isEqualTo(1);
        assertThat(response.getWeatherForecastByTimeList().get(0).getFcstTime()).isEqualTo(1);
        assertThat(response.getWeatherForecastByTimeList().get(0).getPrecipitation()).isEqualTo(1.1);
        assertThat(response.getWeatherForecastByTimeList().get(0).getTemperature()).isEqualTo(23);
        assertThat(response.getWeatherForecastByTimeList().get(0).getHumidity()).isEqualTo(78);
        assertThat(response.getWeatherForecastByTimeList().get(0).getWindSpeed()).isEqualTo(3.2);
    }

    @Test
    void 네가지_카테고리_외의_다른_것도_있고_24시간_이전의_데이터도_있을_때_엔티티_매핑_성공() throws Exception {
        //given
        List<VilageFcstResponseDto.Item> items = List.of(
                createItem("PCP", "20250804", "0000","20250804","0100", "1.1mm"),
                createItem("REH", "20250804", "0000","20250804","0100", "78"),
                createItem("TMP", "20250804", "0000","20250804","0100", "23"),
                createItem("WSD", "20250804", "0000","20250804","0100", "3.2"),
                createItem("PCP", "20250805", "0000","20250803","0100", "4.4mm"),
                createItem("REH", "20250805", "0000","20250803","0100", "45"),
                createItem("TMP", "20250805", "0000","20250803","0100", "13"),
                createItem("WSD", "20250805", "0000","20250803","0100", "7.8")
        );
        VilageFcstResponseDto parameter = createMockVilageFcstResponse(items);

        //when
        ShortTermWeatherDto response = processor.process(parameter);

        //then
        assertThat(response.getWeatherForecastByTimeList().size()).isEqualTo(1);
        assertThat(response.getWeatherForecastByTimeList().get(0).getFcstTime()).isEqualTo(1);
        assertThat(response.getWeatherForecastByTimeList().get(0).getPrecipitation()).isEqualTo(1.1);
        assertThat(response.getWeatherForecastByTimeList().get(0).getTemperature()).isEqualTo(23);
        assertThat(response.getWeatherForecastByTimeList().get(0).getHumidity()).isEqualTo(78);
        assertThat(response.getWeatherForecastByTimeList().get(0).getWindSpeed()).isEqualTo(3.2);
    }

    @Test
    void 비_판단_성공() throws Exception {
        //given
        List<VilageFcstResponseDto.Item> items = List.of(
                createItem("PCP", "20250804", "0000","20250804","0100", "1.1mm"),
                createItem("REH", "20250804", "0000","20250804","0100", "78"),
                createItem("TMP", "20250804", "0000","20250804","0100", "23"),
                createItem("WSD", "20250804", "0000","20250804","0100", "3.2"),
                createItem("PCP", "20250804", "0000","20250804","0200", "4.4mm"),
                createItem("REH", "20250804", "0000","20250804","0200", "45"),
                createItem("TMP", "20250804", "0000","20250804","0200", "13"),
                createItem("WSD", "20250804", "0000","20250804","0200", "7.8")
        );
        VilageFcstResponseDto parameter = createMockVilageFcstResponse(items);

        //when
        ShortTermWeatherDto response = processor.process(parameter);

        //then
        assertThat(response.getWeatherRiskList().size()).isEqualTo(1);
        assertThat(response.getWeatherRiskList().get(0).getStartTime()).isEqualTo(BASE.withHour(1));
        assertThat(response.getWeatherRiskList().get(0).getEndTime()).isEqualTo(BASE.withHour(2));
        assertThat(response.getWeatherRiskList().get(0).getName()).isEqualTo(WeatherRiskType.RAIN);
    }

    @Test
    void 비_여러_구간_판단_성공() throws Exception {
        //given
        List<VilageFcstResponseDto.Item> items = List.of(
                createItem("PCP", "20250804", "0000","20250804","0100", "1.1mm"),
                createItem("REH", "20250804", "0000","20250804","0100", "78"),
                createItem("TMP", "20250804", "0000","20250804","0100", "23"),
                createItem("WSD", "20250804", "0000","20250804","0100", "3.2"),
                createItem("PCP", "20250804", "0000","20250804","0300", "4.4mm"),
                createItem("REH", "20250804", "0000","20250804","0300", "45"),
                createItem("TMP", "20250804", "0000","20250804","0300", "13"),
                createItem("WSD", "20250804", "0000","20250804","0300", "7.8")
        );
        VilageFcstResponseDto parameter = createMockVilageFcstResponse(items);

        //when
        ShortTermWeatherDto response = processor.process(parameter);

        //then
        assertThat(response.getWeatherRiskList().size()).isEqualTo(2);
        assertThat(response.getWeatherRiskList().get(0).getStartTime()).isEqualTo(BASE.withHour(1));
        assertThat(response.getWeatherRiskList().get(0).getEndTime()).isEqualTo(BASE.withHour(1));
        assertThat(response.getWeatherRiskList().get(0).getName()).isEqualTo(WeatherRiskType.RAIN);
        assertThat(response.getWeatherRiskList().get(1).getStartTime()).isEqualTo(BASE.withHour(3));
        assertThat(response.getWeatherRiskList().get(1).getEndTime()).isEqualTo(BASE.withHour(3));
        assertThat(response.getWeatherRiskList().get(1).getName()).isEqualTo(WeatherRiskType.RAIN);
    }

    @Test
    void 호우_판단_성공() throws Exception {
        //given
        List<VilageFcstResponseDto.Item> items = List.of(
                createItem("PCP", "20250804", "0000","20250804","0100", "30.0~50.0mm"),
                createItem("REH", "20250804", "0000","20250804","0100", "78"),
                createItem("TMP", "20250804", "0000","20250804","0100", "23"),
                createItem("WSD", "20250804", "0000","20250804","0100", "3.2"),
                createItem("PCP", "20250804", "0000","20250804","0200", "30.0~50.0mm"),
                createItem("REH", "20250804", "0000","20250804","0200", "45"),
                createItem("TMP", "20250804", "0000","20250804","0200", "13"),
                createItem("WSD", "20250804", "0000","20250804","0200", "7.8")
        );
        VilageFcstResponseDto parameter = createMockVilageFcstResponse(items);

        //when
        ShortTermWeatherDto response = processor.process(parameter);

        //then
        assertThat(response.getWeatherRiskList().size()).isEqualTo(1);
        assertThat(response.getWeatherRiskList().get(0).getStartTime()).isEqualTo(BASE.withHour(1));
        assertThat(response.getWeatherRiskList().get(0).getEndTime()).isEqualTo(BASE.withHour(2));
        assertThat(response.getWeatherRiskList().get(0).getName()).isEqualTo(WeatherRiskType.HEAVY_RAIN);
    }

    @Test
    void 호우_여러_구간_판단_성공() throws Exception {
        //given
        List<VilageFcstResponseDto.Item> items = List.of(
                createItem("PCP", "20250804", "0000","20250804","0100", "30.0~50.0mm"),
                createItem("REH", "20250804", "0000","20250804","0100", "78"),
                createItem("TMP", "20250804", "0000","20250804","0100", "23"),
                createItem("WSD", "20250804", "0000","20250804","0100", "3.2"),
                createItem("PCP", "20250804", "0000","20250804","0300", "30.0~50.0mm"),
                createItem("REH", "20250804", "0000","20250804","0300", "45"),
                createItem("TMP", "20250804", "0000","20250804","0300", "13"),
                createItem("WSD", "20250804", "0000","20250804","0300", "7.8")
        );
        VilageFcstResponseDto parameter = createMockVilageFcstResponse(items);

        //when
        ShortTermWeatherDto response = processor.process(parameter);

        //then
        assertThat(response.getWeatherRiskList().size()).isEqualTo(2);
        assertThat(response.getWeatherRiskList().get(0).getStartTime()).isEqualTo(BASE.withHour(1));
        assertThat(response.getWeatherRiskList().get(0).getEndTime()).isEqualTo(BASE.withHour(1));
        assertThat(response.getWeatherRiskList().get(0).getName()).isEqualTo(WeatherRiskType.HEAVY_RAIN);
        assertThat(response.getWeatherRiskList().get(1).getStartTime()).isEqualTo(BASE.withHour(3));
        assertThat(response.getWeatherRiskList().get(1).getEndTime()).isEqualTo(BASE.withHour(3));
        assertThat(response.getWeatherRiskList().get(1).getName()).isEqualTo(WeatherRiskType.HEAVY_RAIN);
    }

    @Test
    void 이상고온_판단_성공() throws Exception {
        //given
        List<VilageFcstResponseDto.Item> items = List.of(
                createItem("PCP", "20250804", "0000","20250804","0100", "0"),
                createItem("REH", "20250804", "0000","20250804","0100", "78"),
                createItem("TMP", "20250804", "0000","20250804","0100", "31"),
                createItem("WSD", "20250804", "0000","20250804","0100", "3.2"),
                createItem("PCP", "20250804", "0000","20250804","0200", "0"),
                createItem("REH", "20250804", "0000","20250804","0200", "31"),
                createItem("TMP", "20250804", "0000","20250804","0200", "31"),
                createItem("WSD", "20250804", "0000","20250804","0200", "7.8")
        );
        VilageFcstResponseDto parameter = createMockVilageFcstResponse(items);

        //when
        ShortTermWeatherDto response = processor.process(parameter);

        //then
        assertThat(response.getWeatherRiskList().size()).isEqualTo(1);
        assertThat(response.getWeatherRiskList().get(0).getStartTime()).isEqualTo(BASE.withHour(1));
        assertThat(response.getWeatherRiskList().get(0).getEndTime()).isEqualTo(BASE.withHour(2));
        assertThat(response.getWeatherRiskList().get(0).getName()).isEqualTo(WeatherRiskType.ABNORMAL_HEAT);
    }

    @Test
    void 이상고온_여러_구간_판단_성공() throws Exception {
        //given
        List<VilageFcstResponseDto.Item> items = List.of(
                createItem("PCP", "20250804", "0000","20250804","0100", "0"),
                createItem("REH", "20250804", "0000","20250804","0100", "78"),
                createItem("TMP", "20250804", "0000","20250804","0100", "31"),
                createItem("WSD", "20250804", "0000","20250804","0100", "3.2"),
                createItem("PCP", "20250804", "0000","20250804","0300", "0"),
                createItem("REH", "20250804", "0000","20250804","0300", "45"),
                createItem("TMP", "20250804", "0000","20250804","0300", "34"),
                createItem("WSD", "20250804", "0000","20250804","0300", "7.8")
        );
        VilageFcstResponseDto parameter = createMockVilageFcstResponse(items);

        //when
        ShortTermWeatherDto response = processor.process(parameter);

        //then
        assertThat(response.getWeatherRiskList().size()).isEqualTo(2);
        assertThat(response.getWeatherRiskList().get(0).getStartTime()).isEqualTo(BASE.withHour(1));
        assertThat(response.getWeatherRiskList().get(0).getEndTime()).isEqualTo(BASE.withHour(1));
        assertThat(response.getWeatherRiskList().get(0).getName()).isEqualTo(WeatherRiskType.ABNORMAL_HEAT);
        assertThat(response.getWeatherRiskList().get(1).getStartTime()).isEqualTo(BASE.withHour(3));
        assertThat(response.getWeatherRiskList().get(1).getEndTime()).isEqualTo(BASE.withHour(3));
        assertThat(response.getWeatherRiskList().get(1).getName()).isEqualTo(WeatherRiskType.ABNORMAL_HEAT);
    }

    @Test
    void 강풍_판단_성공() throws Exception {
        //given
        List<VilageFcstResponseDto.Item> items = List.of(
                createItem("PCP", "20250804", "0000","20250804","0100", "0"),
                createItem("REH", "20250804", "0000","20250804","0100", "78"),
                createItem("TMP", "20250804", "0000","20250804","0100", "30"),
                createItem("WSD", "20250804", "0000","20250804","0100", "14.5"),
                createItem("PCP", "20250804", "0000","20250804","0200", "0"),
                createItem("REH", "20250804", "0000","20250804","0200", "31"),
                createItem("TMP", "20250804", "0000","20250804","0200", "30"),
                createItem("WSD", "20250804", "0000","20250804","0200", "324")
        );
        VilageFcstResponseDto parameter = createMockVilageFcstResponse(items);

        //when
        ShortTermWeatherDto response = processor.process(parameter);

        //then
        assertThat(response.getWeatherRiskList().size()).isEqualTo(1);
        assertThat(response.getWeatherRiskList().get(0).getStartTime()).isEqualTo(BASE.withHour(1));
        assertThat(response.getWeatherRiskList().get(0).getEndTime()).isEqualTo(BASE.withHour(2));
        assertThat(response.getWeatherRiskList().get(0).getName()).isEqualTo(WeatherRiskType.STRONG_WIND);
    }

    @Test
    void 강풍_여러_구간_판단_성공() throws Exception {
        //given
        List<VilageFcstResponseDto.Item> items = List.of(
                createItem("PCP", "20250804", "0000","20250804","0100", "0"),
                createItem("REH", "20250804", "0000","20250804","0100", "78"),
                createItem("TMP", "20250804", "0000","20250804","0100", "30"),
                createItem("WSD", "20250804", "0000","20250804","0100", "34"),
                createItem("PCP", "20250804", "0000","20250804","0300", "0"),
                createItem("REH", "20250804", "0000","20250804","0300", "45"),
                createItem("TMP", "20250804", "0000","20250804","0300", "30"),
                createItem("WSD", "20250804", "0000","20250804","0300", "35")
        );
        VilageFcstResponseDto parameter = createMockVilageFcstResponse(items);

        //when
        ShortTermWeatherDto response = processor.process(parameter);

        //then
        assertThat(response.getWeatherRiskList().size()).isEqualTo(2);
        assertThat(response.getWeatherRiskList().get(0).getStartTime()).isEqualTo(BASE.withHour(1));
        assertThat(response.getWeatherRiskList().get(0).getEndTime()).isEqualTo(BASE.withHour(1));
        assertThat(response.getWeatherRiskList().get(0).getName()).isEqualTo(WeatherRiskType.STRONG_WIND);
        assertThat(response.getWeatherRiskList().get(1).getStartTime()).isEqualTo(BASE.withHour(3));
        assertThat(response.getWeatherRiskList().get(1).getEndTime()).isEqualTo(BASE.withHour(3));
        assertThat(response.getWeatherRiskList().get(1).getName()).isEqualTo(WeatherRiskType.STRONG_WIND);
    }

    @Test
    void 기상_특보_여러개_판단_성공() throws Exception {
        //given
        List<VilageFcstResponseDto.Item> items = List.of(
                createItem("PCP", "20250804", "0000","20250804","0100", "1mm 미만"),
                createItem("REH", "20250804", "0000","20250804","0100", "78"),
                createItem("TMP", "20250804", "0000","20250804","0100", "32"),
                createItem("WSD", "20250804", "0000","20250804","0100", "34"),
                createItem("PCP", "20250804", "0000","20250804","0300", "50.0mm 이상"),
                createItem("REH", "20250804", "0000","20250804","0300", "45"),
                createItem("TMP", "20250804", "0000","20250804","0300", "-2"),
                createItem("WSD", "20250804", "0000","20250804","0300", "35"),
                createItem("TMP", "20250804", "0000","20250804","0400", "-2"),
                createItem("WSD", "20250804", "0000","20250804","0400", "35")
        );
        VilageFcstResponseDto parameter = createMockVilageFcstResponse(items);

        //when
        ShortTermWeatherDto response = processor.process(parameter);

        //then
        assertThat(response.getWeatherRiskList().size()).isEqualTo(6);
        assertThat(response.getWeatherRiskList().get(0).getStartTime()).isEqualTo(BASE.withHour(1));
        assertThat(response.getWeatherRiskList().get(0).getEndTime()).isEqualTo(BASE.withHour(1));
        assertThat(response.getWeatherRiskList().get(0).getName()).isEqualTo(WeatherRiskType.RAIN);
        assertThat(response.getWeatherRiskList().get(1).getStartTime()).isEqualTo(BASE.withHour(3));
        assertThat(response.getWeatherRiskList().get(1).getEndTime()).isEqualTo(BASE.withHour(3));
        assertThat(response.getWeatherRiskList().get(1).getName()).isEqualTo(WeatherRiskType.TORRENTIAL_RAIN);
        assertThat(response.getWeatherRiskList().get(2).getStartTime()).isEqualTo(BASE.withHour(1));
        assertThat(response.getWeatherRiskList().get(2).getEndTime()).isEqualTo(BASE.withHour(1));
        assertThat(response.getWeatherRiskList().get(2).getName()).isEqualTo(WeatherRiskType.ABNORMAL_HEAT);
        assertThat(response.getWeatherRiskList().get(3).getStartTime()).isEqualTo(BASE.withHour(3));
        assertThat(response.getWeatherRiskList().get(3).getEndTime()).isEqualTo(BASE.withHour(4));
        assertThat(response.getWeatherRiskList().get(3).getName()).isEqualTo(WeatherRiskType.FROST);
        assertThat(response.getWeatherRiskList().get(4).getStartTime()).isEqualTo(BASE.withHour(1));
        assertThat(response.getWeatherRiskList().get(4).getEndTime()).isEqualTo(BASE.withHour(1));
        assertThat(response.getWeatherRiskList().get(4).getName()).isEqualTo(WeatherRiskType.STRONG_WIND);
        assertThat(response.getWeatherRiskList().get(5).getStartTime()).isEqualTo(BASE.withHour(3));
        assertThat(response.getWeatherRiskList().get(5).getEndTime()).isEqualTo(BASE.withHour(4));
        assertThat(response.getWeatherRiskList().get(5).getName()).isEqualTo(WeatherRiskType.STRONG_WIND);
    }

    private VilageFcstResponseDto createMockVilageFcstResponse(List<VilageFcstResponseDto.Item> itemList) {
        VilageFcstResponseDto.Items items = new VilageFcstResponseDto.Items();
        items.setItem(itemList);

        VilageFcstResponseDto.Body body = new VilageFcstResponseDto.Body();
        body.setItems(items);

        VilageFcstResponseDto.Header header = new VilageFcstResponseDto.Header();
        header.setResultCode("00");
        header.setResultMsg("OK");

        VilageFcstResponseDto.Response response = new VilageFcstResponseDto.Response();
        response.setHeader(header);
        response.setBody(body);

        VilageFcstResponseDto VilageFcstResponseDto = new VilageFcstResponseDto();
        VilageFcstResponseDto.setResponse(response);

        return VilageFcstResponseDto;
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
