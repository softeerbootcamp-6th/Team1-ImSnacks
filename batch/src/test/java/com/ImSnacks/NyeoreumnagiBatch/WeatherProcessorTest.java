package com.ImSnacks.NyeoreumnagiBatch;

import com.ImSnacks.NyeoreumnagiBatch.dto.VilageFcstResponse;
import com.ImSnacks.NyeoreumnagiBatch.processor.WeatherProcessor;
import com.ImSnacks.NyeoreumnagiBatch.writer.dto.ShortTermWeatherDto;
import com.ImSnacks.NyeoreumnagiBatch.writer.entity.WeatherRiskType;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

@SpringBootTest
public class WeatherProcessorTest {

    @Autowired
    private WeatherProcessor processor;

    @Test
    void 네가지_카테고리만_있고_24시간_내의_데이터만_있을_때_엔티티_매핑_성공() throws Exception {
        //given
        List<VilageFcstResponse.Item> items = List.of(
                createItem("PCP", "250804", "0000","250804","0100", "1.1mm"),
                createItem("REH", "250804", "0000","250804","0100", "78"),
                createItem("TMP", "250804", "0000","250804","0100", "23"),
                createItem("WSD", "250804", "0000","250804","0100", "3.2")
        );
        VilageFcstResponse parameter = createMockVilageFcstResponse(items);

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
        List<VilageFcstResponse.Item> items = List.of(
                createItem("PCP", "250804", "0000","250804","0100", "1.1mm"),
                createItem("REH", "250804", "0000","250804","0100", "78")
        );
        VilageFcstResponse parameter = createMockVilageFcstResponse(items);

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
        List<VilageFcstResponse.Item> items = List.of(
                createItem("PCP", "250804", "0000","250804","0100", "1.1mm"),
                createItem("REH", "250804", "0000","250804","0100", "78"),
                createItem("TMP", "250804", "0000","250804","0100", "23"),
                createItem("WSD", "250804", "0000","250804","0100", "3.2"),
                createItem("SAD", "250804", "0000","250804","0100", "1.1mm"),
                createItem("HAPPY", "250804", "0000","250804","0100", "78"),
                createItem("SOFTEER", "250804", "0000","250804","0100", "23"),
                createItem("HI", "250804", "0000","250804","0100", "3.2")
        );
        VilageFcstResponse parameter = createMockVilageFcstResponse(items);

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
        List<VilageFcstResponse.Item> items = List.of(
                createItem("PCP", "250804", "0000","250804","0100", "1.1mm"),
                createItem("REH", "250804", "0000","250804","0100", "78"),
                createItem("TMP", "250804", "0000","250804","0100", "23"),
                createItem("WSD", "250804", "0000","250804","0100", "3.2"),
                createItem("PCP", "250804", "0000","250805","0100", "4.4mm"),
                createItem("REH", "250804", "0000","250805","0100", "45"),
                createItem("TMP", "250804", "0000","250805","0100", "13"),
                createItem("WSD", "250804", "0000","250805","0100", "7.8")
        );
        VilageFcstResponse parameter = createMockVilageFcstResponse(items);

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
        List<VilageFcstResponse.Item> items = List.of(
                createItem("PCP", "250804", "0000","250804","0100", "1.1mm"),
                createItem("REH", "250804", "0000","250804","0100", "78"),
                createItem("TMP", "250804", "0000","250804","0100", "23"),
                createItem("WSD", "250804", "0000","250804","0100", "3.2"),
                createItem("PCP", "250805", "0000","250803","0100", "4.4mm"),
                createItem("REH", "250805", "0000","250803","0100", "45"),
                createItem("TMP", "250805", "0000","250803","0100", "13"),
                createItem("WSD", "250805", "0000","250803","0100", "7.8")
        );
        VilageFcstResponse parameter = createMockVilageFcstResponse(items);

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
        List<VilageFcstResponse.Item> items = List.of(
                createItem("PCP", "250804", "0000","250804","0100", "1.1mm"),
                createItem("REH", "250804", "0000","250804","0100", "78"),
                createItem("TMP", "250804", "0000","250804","0100", "23"),
                createItem("WSD", "250804", "0000","250804","0100", "3.2"),
                createItem("PCP", "250804", "0000","250804","0200", "4.4mm"),
                createItem("REH", "250804", "0000","250804","0200", "45"),
                createItem("TMP", "250804", "0000","250804","0200", "13"),
                createItem("WSD", "250804", "0000","250804","0200", "7.8")
        );
        VilageFcstResponse parameter = createMockVilageFcstResponse(items);

        //when
        ShortTermWeatherDto response = processor.process(parameter);

        //then
        assertThat(response.getWeatherRiskList().size()).isEqualTo(1);
        assertThat(response.getWeatherRiskList().get(0).getStartTime()).isEqualTo(1);
        assertThat(response.getWeatherRiskList().get(0).getEndTime()).isEqualTo(2);
        assertThat(response.getWeatherRiskList().get(0).getName()).isEqualTo(WeatherRiskType.RAIN);
    }

    @Test
    void 비_여러_구간_판단_성공() throws Exception {
        //given
        List<VilageFcstResponse.Item> items = List.of(
                createItem("PCP", "250804", "0000","250804","0100", "1.1mm"),
                createItem("REH", "250804", "0000","250804","0100", "78"),
                createItem("TMP", "250804", "0000","250804","0100", "23"),
                createItem("WSD", "250804", "0000","250804","0100", "3.2"),
                createItem("PCP", "250804", "0000","250804","0300", "4.4mm"),
                createItem("REH", "250804", "0000","250804","0300", "45"),
                createItem("TMP", "250804", "0000","250804","0300", "13"),
                createItem("WSD", "250804", "0000","250804","0300", "7.8")
        );
        VilageFcstResponse parameter = createMockVilageFcstResponse(items);

        //when
        ShortTermWeatherDto response = processor.process(parameter);

        //then
        assertThat(response.getWeatherRiskList().size()).isEqualTo(2);
        assertThat(response.getWeatherRiskList().get(0).getStartTime()).isEqualTo(1);
        assertThat(response.getWeatherRiskList().get(0).getEndTime()).isEqualTo(1);
        assertThat(response.getWeatherRiskList().get(0).getName()).isEqualTo(WeatherRiskType.RAIN);
        assertThat(response.getWeatherRiskList().get(1).getStartTime()).isEqualTo(3);
        assertThat(response.getWeatherRiskList().get(1).getEndTime()).isEqualTo(3);
        assertThat(response.getWeatherRiskList().get(1).getName()).isEqualTo(WeatherRiskType.RAIN);
    }

    @Test
    void 호우_판단_성공() throws Exception {
        //given
        List<VilageFcstResponse.Item> items = List.of(
                createItem("PCP", "250804", "0000","250804","0100", "30.0~50.0mm"),
                createItem("REH", "250804", "0000","250804","0100", "78"),
                createItem("TMP", "250804", "0000","250804","0100", "23"),
                createItem("WSD", "250804", "0000","250804","0100", "3.2"),
                createItem("PCP", "250804", "0000","250804","0200", "30.0~50.0mm"),
                createItem("REH", "250804", "0000","250804","0200", "45"),
                createItem("TMP", "250804", "0000","250804","0200", "13"),
                createItem("WSD", "250804", "0000","250804","0200", "7.8")
        );
        VilageFcstResponse parameter = createMockVilageFcstResponse(items);

        //when
        ShortTermWeatherDto response = processor.process(parameter);

        //then
        assertThat(response.getWeatherRiskList().size()).isEqualTo(1);
        assertThat(response.getWeatherRiskList().get(0).getStartTime()).isEqualTo(1);
        assertThat(response.getWeatherRiskList().get(0).getEndTime()).isEqualTo(2);
        assertThat(response.getWeatherRiskList().get(0).getName()).isEqualTo(WeatherRiskType.HEAVY_RAIN);
    }

    @Test
    void 호우_여러_구간_판단_성공() throws Exception {
        //given
        List<VilageFcstResponse.Item> items = List.of(
                createItem("PCP", "250804", "0000","250804","0100", "30.0~50.0mm"),
                createItem("REH", "250804", "0000","250804","0100", "78"),
                createItem("TMP", "250804", "0000","250804","0100", "23"),
                createItem("WSD", "250804", "0000","250804","0100", "3.2"),
                createItem("PCP", "250804", "0000","250804","0300", "30.0~50.0mm"),
                createItem("REH", "250804", "0000","250804","0300", "45"),
                createItem("TMP", "250804", "0000","250804","0300", "13"),
                createItem("WSD", "250804", "0000","250804","0300", "7.8")
        );
        VilageFcstResponse parameter = createMockVilageFcstResponse(items);

        //when
        ShortTermWeatherDto response = processor.process(parameter);

        //then
        assertThat(response.getWeatherRiskList().size()).isEqualTo(2);
        assertThat(response.getWeatherRiskList().get(0).getStartTime()).isEqualTo(1);
        assertThat(response.getWeatherRiskList().get(0).getEndTime()).isEqualTo(1);
        assertThat(response.getWeatherRiskList().get(0).getName()).isEqualTo(WeatherRiskType.HEAVY_RAIN);
        assertThat(response.getWeatherRiskList().get(1).getStartTime()).isEqualTo(3);
        assertThat(response.getWeatherRiskList().get(1).getEndTime()).isEqualTo(3);
        assertThat(response.getWeatherRiskList().get(1).getName()).isEqualTo(WeatherRiskType.HEAVY_RAIN);
    }

    @Test
    void 이상고온_판단_성공() throws Exception {
        //given
        List<VilageFcstResponse.Item> items = List.of(
                createItem("PCP", "250804", "0000","250804","0100", "0"),
                createItem("REH", "250804", "0000","250804","0100", "78"),
                createItem("TMP", "250804", "0000","250804","0100", "31"),
                createItem("WSD", "250804", "0000","250804","0100", "3.2"),
                createItem("PCP", "250804", "0000","250804","0200", "0"),
                createItem("REH", "250804", "0000","250804","0200", "31"),
                createItem("TMP", "250804", "0000","250804","0200", "31"),
                createItem("WSD", "250804", "0000","250804","0200", "7.8")
        );
        VilageFcstResponse parameter = createMockVilageFcstResponse(items);

        //when
        ShortTermWeatherDto response = processor.process(parameter);

        //then
        assertThat(response.getWeatherRiskList().size()).isEqualTo(1);
        assertThat(response.getWeatherRiskList().get(0).getStartTime()).isEqualTo(1);
        assertThat(response.getWeatherRiskList().get(0).getEndTime()).isEqualTo(2);
        assertThat(response.getWeatherRiskList().get(0).getName()).isEqualTo(WeatherRiskType.ABNORMAL_HEAT);
    }

    @Test
    void 이상고온_여러_구간_판단_성공() throws Exception {
        //given
        List<VilageFcstResponse.Item> items = List.of(
                createItem("PCP", "250804", "0000","250804","0100", "0"),
                createItem("REH", "250804", "0000","250804","0100", "78"),
                createItem("TMP", "250804", "0000","250804","0100", "31"),
                createItem("WSD", "250804", "0000","250804","0100", "3.2"),
                createItem("PCP", "250804", "0000","250804","0300", "0"),
                createItem("REH", "250804", "0000","250804","0300", "45"),
                createItem("TMP", "250804", "0000","250804","0300", "34"),
                createItem("WSD", "250804", "0000","250804","0300", "7.8")
        );
        VilageFcstResponse parameter = createMockVilageFcstResponse(items);

        //when
        ShortTermWeatherDto response = processor.process(parameter);

        //then
        assertThat(response.getWeatherRiskList().size()).isEqualTo(2);
        assertThat(response.getWeatherRiskList().get(0).getStartTime()).isEqualTo(1);
        assertThat(response.getWeatherRiskList().get(0).getEndTime()).isEqualTo(1);
        assertThat(response.getWeatherRiskList().get(0).getName()).isEqualTo(WeatherRiskType.ABNORMAL_HEAT);
        assertThat(response.getWeatherRiskList().get(1).getStartTime()).isEqualTo(3);
        assertThat(response.getWeatherRiskList().get(1).getEndTime()).isEqualTo(3);
        assertThat(response.getWeatherRiskList().get(1).getName()).isEqualTo(WeatherRiskType.ABNORMAL_HEAT);
    }

    @Test
    void 강풍_판단_성공() throws Exception {
        //given
        List<VilageFcstResponse.Item> items = List.of(
                createItem("PCP", "250804", "0000","250804","0100", "0"),
                createItem("REH", "250804", "0000","250804","0100", "78"),
                createItem("TMP", "250804", "0000","250804","0100", "30"),
                createItem("WSD", "250804", "0000","250804","0100", "14.5"),
                createItem("PCP", "250804", "0000","250804","0200", "0"),
                createItem("REH", "250804", "0000","250804","0200", "31"),
                createItem("TMP", "250804", "0000","250804","0200", "30"),
                createItem("WSD", "250804", "0000","250804","0200", "324")
        );
        VilageFcstResponse parameter = createMockVilageFcstResponse(items);

        //when
        ShortTermWeatherDto response = processor.process(parameter);

        //then
        assertThat(response.getWeatherRiskList().size()).isEqualTo(1);
        assertThat(response.getWeatherRiskList().get(0).getStartTime()).isEqualTo(1);
        assertThat(response.getWeatherRiskList().get(0).getEndTime()).isEqualTo(2);
        assertThat(response.getWeatherRiskList().get(0).getName()).isEqualTo(WeatherRiskType.STRONG_WIND);
    }

    @Test
    void 강풍_여러_구간_판단_성공() throws Exception {
        //given
        List<VilageFcstResponse.Item> items = List.of(
                createItem("PCP", "250804", "0000","250804","0100", "0"),
                createItem("REH", "250804", "0000","250804","0100", "78"),
                createItem("TMP", "250804", "0000","250804","0100", "30"),
                createItem("WSD", "250804", "0000","250804","0100", "34"),
                createItem("PCP", "250804", "0000","250804","0300", "0"),
                createItem("REH", "250804", "0000","250804","0300", "45"),
                createItem("TMP", "250804", "0000","250804","0300", "30"),
                createItem("WSD", "250804", "0000","250804","0300", "35")
        );
        VilageFcstResponse parameter = createMockVilageFcstResponse(items);

        //when
        ShortTermWeatherDto response = processor.process(parameter);

        //then
        assertThat(response.getWeatherRiskList().size()).isEqualTo(2);
        assertThat(response.getWeatherRiskList().get(0).getStartTime()).isEqualTo(1);
        assertThat(response.getWeatherRiskList().get(0).getEndTime()).isEqualTo(1);
        assertThat(response.getWeatherRiskList().get(0).getName()).isEqualTo(WeatherRiskType.STRONG_WIND);
        assertThat(response.getWeatherRiskList().get(1).getStartTime()).isEqualTo(3);
        assertThat(response.getWeatherRiskList().get(1).getEndTime()).isEqualTo(3);
        assertThat(response.getWeatherRiskList().get(1).getName()).isEqualTo(WeatherRiskType.STRONG_WIND);
    }

    @Test
    void 기상_특보_여러개_판단_성공() throws Exception {
        //given
        List<VilageFcstResponse.Item> items = List.of(
                createItem("PCP", "250804", "0000","250804","0100", "1mm 미만"),
                createItem("REH", "250804", "0000","250804","0100", "78"),
                createItem("TMP", "250804", "0000","250804","0100", "32"),
                createItem("WSD", "250804", "0000","250804","0100", "34"),
                createItem("PCP", "250804", "0000","250804","0300", "50.0mm 이상"),
                createItem("REH", "250804", "0000","250804","0300", "45"),
                createItem("TMP", "250804", "0000","250804","0300", "-2"),
                createItem("WSD", "250804", "0000","250804","0300", "35"),
                createItem("TMP", "250804", "0000","250804","0400", "-2"),
                createItem("WSD", "250804", "0000","250804","0400", "35")
        );
        VilageFcstResponse parameter = createMockVilageFcstResponse(items);

        //when
        ShortTermWeatherDto response = processor.process(parameter);

        //then
        assertThat(response.getWeatherRiskList().size()).isEqualTo(6);
        assertThat(response.getWeatherRiskList().get(0).getStartTime()).isEqualTo(1);
        assertThat(response.getWeatherRiskList().get(0).getEndTime()).isEqualTo(1);
        assertThat(response.getWeatherRiskList().get(0).getName()).isEqualTo(WeatherRiskType.RAIN);
        assertThat(response.getWeatherRiskList().get(1).getStartTime()).isEqualTo(3);
        assertThat(response.getWeatherRiskList().get(1).getEndTime()).isEqualTo(3);
        assertThat(response.getWeatherRiskList().get(1).getName()).isEqualTo(WeatherRiskType.TORRENTIAL_RAIN);
        assertThat(response.getWeatherRiskList().get(2).getStartTime()).isEqualTo(1);
        assertThat(response.getWeatherRiskList().get(2).getEndTime()).isEqualTo(1);
        assertThat(response.getWeatherRiskList().get(2).getName()).isEqualTo(WeatherRiskType.ABNORMAL_HEAT);
        assertThat(response.getWeatherRiskList().get(3).getStartTime()).isEqualTo(3);
        assertThat(response.getWeatherRiskList().get(3).getEndTime()).isEqualTo(4);
        assertThat(response.getWeatherRiskList().get(3).getName()).isEqualTo(WeatherRiskType.FROST);
        assertThat(response.getWeatherRiskList().get(4).getStartTime()).isEqualTo(1);
        assertThat(response.getWeatherRiskList().get(4).getEndTime()).isEqualTo(1);
        assertThat(response.getWeatherRiskList().get(4).getName()).isEqualTo(WeatherRiskType.STRONG_WIND);
        assertThat(response.getWeatherRiskList().get(5).getStartTime()).isEqualTo(3);
        assertThat(response.getWeatherRiskList().get(5).getEndTime()).isEqualTo(4);
        assertThat(response.getWeatherRiskList().get(5).getName()).isEqualTo(WeatherRiskType.STRONG_WIND);
    }

    private VilageFcstResponse createMockVilageFcstResponse(List<VilageFcstResponse.Item> itemList) {
        VilageFcstResponse.Items items = new VilageFcstResponse.Items();
        items.setItem(itemList);

        VilageFcstResponse.Body body = new VilageFcstResponse.Body();
        body.setItems(items);

        VilageFcstResponse.Header header = new VilageFcstResponse.Header();
        header.setResultCode("00");
        header.setResultMsg("OK");

        VilageFcstResponse.Response response = new VilageFcstResponse.Response();
        response.setHeader(header);
        response.setBody(body);

        VilageFcstResponse vilageFcstResponse = new VilageFcstResponse();
        vilageFcstResponse.setResponse(response);

        return vilageFcstResponse;
    }

    private VilageFcstResponse.Item createItem(String category, String baseDate, String baseTime, String fcstDate, String fcstTime, String value) {
        VilageFcstResponse.Item item = new VilageFcstResponse.Item();
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
