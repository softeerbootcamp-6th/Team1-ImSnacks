package com.ImSnacks.NyeoreumnagiBatch.shortTermWeatherForecast.reader;

import com.ImSnacks.NyeoreumnagiBatch.shortTermWeatherForecast.reader.dto.VilageFcstResponseDto;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import static com.ImSnacks.NyeoreumnagiBatch.shortTermWeatherForecast.reader.ApiRequestValues.*;

@Component
public class ApiCaller {
    @Value("${api.service.key}")
    private String serviceKey;

    public VilageFcstResponseDto call(String baseDate, String baseTime, int nx, int ny) {
        RestClient restClient = RestClient.create();
        String uriString = buildUriString(baseDate, baseTime, nx, ny);

        return restClient.get()
                .uri(uriString)
                .retrieve()
                .body(VilageFcstResponseDto.class);
    }

    public String buildUriString(String baseDate, String baseTime, int nx, int ny) {
        UriComponentsBuilder builder = UriComponentsBuilder.fromUriString(URI.toString());
        //TODO 상수값 정적 변수로 만들기
        UriComponents uri = builder
                .queryParam(AUTH_KEY.toString(), serviceKey)
                .queryParam(NUM_OF_ROWS.toString(), 1000)
                .queryParam(PAGE_NO.toString(), 1)
                .queryParam(DATA_TYPE.toString(), "JSON")
                .queryParam(BASE_DATE.toString(), baseDate)
                .queryParam(BASE_TIME.toString(), baseTime)
                .queryParam(NX.toString(), nx)
                .queryParam(NY.toString(), ny)
                .build();
        String uriString =  uri.encode().toUriString();
        return uriString;
    }
}
