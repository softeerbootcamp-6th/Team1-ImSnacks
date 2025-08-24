package com.ImSnacks.NyeoreumnagiBatch.shortTermWeatherForecast.processor;

import com.ImSnacks.NyeoreumnagiBatch.shortTermWeatherForecast.reader.ApiRequestValues;
import com.ImSnacks.NyeoreumnagiBatch.shortTermWeatherForecast.reader.dto.VilageFcstResponseDto;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Slf4j
@Component
public class ImprovedApiCaller {
    @Value("${OPEN_API_KEY}")
    private String serviceKey;
    private HttpClient httpClient;

    public ImprovedApiCaller() {
        httpClient = HttpClient.newBuilder()
                .followRedirects(HttpClient.Redirect.ALWAYS)
                .build();

    }

    public VilageFcstResponseDto call(String baseDate, String baseTime, int nx, int ny) {
        URI uri = buildUri(baseDate, baseTime, nx, ny);
        log.info("Calling web service at {}", uri.toString());
        HttpRequest req = HttpRequest.newBuilder()
                .uri(uri)
                .version(HttpClient.Version.HTTP_1_1)
                .timeout(Duration.of(30, ChronoUnit.SECONDS))
                .GET().build();
        try {
            HttpResponse<String> res = httpClient.send(req, HttpResponse.BodyHandlers.ofString());
            VilageFcstResponseDto data = new ObjectMapper()
                    .configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false)
                    .configure(DeserializationFeature.FAIL_ON_NULL_FOR_PRIMITIVES, false)
                    .readValue(res.body(), VilageFcstResponseDto.class);
            return data;
        } catch (Exception e) {
            // TODO 모든 예외에 기본 데이터 반환으로 대응하는 상태.
            // TODO 재시도 기능 도입하기.
            // TODO 실패하면 큐에 담아두고 다시 시도하기.
            log.info("An exception has occured");
            return getDefaultData(baseDate, baseTime, nx, ny);
        }

    }

    private java.net.URI buildUri(String baseDate, String baseTime, int nx, int ny) {
        return UriComponentsBuilder.fromUriString(ApiRequestValues.URI.toString())
                .queryParam(ApiRequestValues.AUTH_KEY.toString(), serviceKey)
                .queryParam(ApiRequestValues.NUM_OF_ROWS.toString(), 1000)
                .queryParam(ApiRequestValues.PAGE_NO.toString(), 1)
                .queryParam(ApiRequestValues.DATA_TYPE.toString(), "JSON")
                .queryParam(ApiRequestValues.BASE_DATE.toString(), baseDate)
                .queryParam(ApiRequestValues.BASE_TIME.toString(), baseTime)
                .queryParam(ApiRequestValues.NX.toString(), nx)
                .queryParam(ApiRequestValues.NY.toString(), ny)
                .encode()
                .build()
                .toUri();
    }

//    private String buildUriString(String baseDate, String baseTime, int nx, int ny) {
//        UriComponentsBuilder builder = UriComponentsBuilder.fromUriString(URI.toString());
//        //TODO 상수값 정적 변수로 만들기
//        UriComponents uri = builder
//                .queryParam(AUTH_KEY.toString(), serviceKey)
//                .queryParam(NUM_OF_ROWS.toString(), 1000)
//                .queryParam(PAGE_NO.toString(), 1)
//                .queryParam(DATA_TYPE.toString(), "JSON")
//                .queryParam(BASE_DATE.toString(), baseDate)
//                .queryParam(BASE_TIME.toString(), baseTime)
//                .queryParam(NX.toString(), nx)
//                .queryParam(NY.toString(), ny)
//                .build();
//        String uriString =  uri.encode().toUriString();
//        return uriString;
//    }

    private VilageFcstResponseDto getDefaultData(String baseDate, String baseTime, int nx, int ny) {
        List<VilageFcstResponseDto.Item> itemList = List.of(
                createItem("PCP", baseDate, baseTime, baseDate, baseTime, "1.1mm")
        );
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
        item.setNx(0);
        item.setNy(0);
        return item;
    }
}
