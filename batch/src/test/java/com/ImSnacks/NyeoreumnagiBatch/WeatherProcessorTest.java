package com.ImSnacks.NyeoreumnagiBatch;

import com.ImSnacks.NyeoreumnagiBatch.dto.VilageFcstResponse;
import com.ImSnacks.NyeoreumnagiBatch.processor.WeatherProcessor;
import com.ImSnacks.NyeoreumnagiBatch.writer.dto.ShortTermWeatherDto;
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
