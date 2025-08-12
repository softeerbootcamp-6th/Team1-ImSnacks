package com.ImSnacks.NyeoreumnagiBatch.ultraviolet.reader;

import com.ImSnacks.NyeoreumnagiBatch.shortTermWeatherForecast.reader.dto.VilageFcstResponseDto;
import com.ImSnacks.NyeoreumnagiBatch.ultraviolet.reader.dto.UVReaderResponseDto;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import static com.ImSnacks.NyeoreumnagiBatch.ultraviolet.reader.enums.UVApiRequestValue.*;

@Component
public class UVApiCaller {
    @Value("${api.service.uv-key}")
    private String secretKey;

    public UVReaderResponseDto call(String areaCode, String time) throws JsonProcessingException {
        RestClient restClient = RestClient.create();
        String uriString = buildUriString(areaCode, time);

//        return restClient.get()
//                .uri(uriString)
//                .retrieve()
//                .body(UVReaderResponseDto.class);

        String rawResponse = restClient.get()
                .uri(uriString)
                .header("User-Agent", "Mozilla/5.0 (compatible; OpenApiTester;)")
                .header("Accept", "application/json") // 혹은 application/xml 등
                .retrieve()
                .body(String.class); // 우선 String으로 받음

        System.out.println(uriString);
        System.out.println("==== Raw Response ====");
        System.out.println(rawResponse);

        UVReaderResponseDto dto = new ObjectMapper().readValue(rawResponse, UVReaderResponseDto.class);
        return dto;
    }

    private String buildUriString(String areaCode, String time){
        UriComponentsBuilder builder = UriComponentsBuilder.fromUriString(UV_URL.toString());

        UriComponents uri = builder
                .queryParam(SERVICE_KEY.toString(), secretKey)
                .queryParam(PAGE_NO.toString(), 1)
                .queryParam(NUM_OF_ROWS.toString(), 10)
                .queryParam(DATA_TYPE.toString(), "JSON")
                .queryParam(AREA_NO.toString(), areaCode)
                .queryParam(TIME.toString(), time)
                .build();

        return uri.toUriString();
    }
}
