package com.ImSnacks.NyeoreumnagiBatch.air_quality.reader;

import com.ImSnacks.NyeoreumnagiBatch.air_quality.processor.dto.AirQualityResponse;
import com.ImSnacks.NyeoreumnagiBatch.air_quality.reader.dto.AirQualityApiResponseDto;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URI;
import java.net.URLEncoder;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

import static com.ImSnacks.NyeoreumnagiBatch.air_quality.reader.AirQualityApiRequestValue.*;

@Slf4j
@Component
public class AirQualityApiCaller {
    @Value("${api.air-quality-service.key}")
    private String secretKey;

    public AirQualityResponse call(String stationName) throws IOException, InterruptedException {
        String uriString = buildAirQualityUriString(stationName);
        log.info("Air Quality API Caller URI: {}", uriString);
        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(uriString))
                .header("Content-type", "application/json")
                .GET()
                .build();

        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
        AirQualityApiResponseDto.Item item = new ObjectMapper().readValue(response.body(), AirQualityApiResponseDto.class).getFirstItem();
        return new AirQualityResponse(
                stationName,
                Integer.parseInt(item.pm10Grade()),
                Integer.parseInt(item.pm10Value()),
                Integer.parseInt(item.pm25Grade()),
                Integer.parseInt(item.pm25Value())
        );
    }

    public String buildAirQualityUriString(String stationName) throws UnsupportedEncodingException {
        UriComponentsBuilder builder = UriComponentsBuilder.fromUriString(AIR_QUALITY_URI.toString());
        return builder
                .path("/getMsrstnAcctoRltmMesureDnsty")
                .queryParam(SERVICE_KEY.toString(), secretKey)
                .queryParam(NUM_OF_ROWS.toString(), 1)
                .queryParam(PAGE_NO.toString(), 10)
                .queryParam(RETURN_TYPE.toString(), "JSON")
                .queryParam(VER.toString(), "1.0")
                .queryParam(STATION_NAME.toString(),URLEncoder.encode(stationName, "UTF-8"))
                .queryParam(DATA_TERM.toString(), "DAILY")
                .build().toUriString();
    }
}
