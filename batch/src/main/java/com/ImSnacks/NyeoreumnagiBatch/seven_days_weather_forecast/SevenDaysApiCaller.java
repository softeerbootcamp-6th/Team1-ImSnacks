package com.ImSnacks.NyeoreumnagiBatch.seven_days_weather_forecast;

import com.ImSnacks.NyeoreumnagiBatch.seven_days_weather_forecast.dto.SevenDayTemperatureForecastResponseDto;
import com.ImSnacks.NyeoreumnagiBatch.seven_days_weather_forecast.dto.SevenDayWeatherForecastResponseDto;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

import static com.ImSnacks.NyeoreumnagiBatch.reader.ApiRequestValues.*;
import static com.ImSnacks.NyeoreumnagiBatch.reader.ApiRequestValues.DATA_TYPE;
import static com.ImSnacks.NyeoreumnagiBatch.reader.ApiRequestValues.PAGE_NO;

@Slf4j
@Component
public class SevenDaysApiCaller {
    @Value("${api.seven-days-weather-service.key}")
    private String midRangeServiceKey;

    public SevenDayWeatherForecastResponseDto callMidRangeWeatherCondition(String baseDate, String regId) throws IOException, InterruptedException {
        String uriString = buildMidRangeWeatherUriString(baseDate, regId, true);

        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
                .uri(java.net.URI.create(uriString))
                .header("Content-type", "application/json")
                .GET()
                .build();

        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
        SevenDayWeatherForecastResponseDto dto = new ObjectMapper().readValue(response.body(), SevenDayWeatherForecastResponseDto.class);
        log.info("Response Body : {}", response.body());
        return dto;
    }

    public SevenDayTemperatureForecastResponseDto callMidRangeTemperature(String baseDate, String regId) throws IOException, InterruptedException {
        String uriString = buildMidRangeWeatherUriString(baseDate, regId, false);

        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
                .uri(java.net.URI.create(uriString))
                .header("Content-type", "application/json")
                .GET()
                .build();

        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
        SevenDayTemperatureForecastResponseDto dto = new ObjectMapper().readValue(response.body(), SevenDayTemperatureForecastResponseDto.class);
        return dto;
    }

    public String buildMidRangeWeatherUriString(String baseDate, String regId, boolean isMidLandFcst) {
        UriComponentsBuilder builder = UriComponentsBuilder.fromUriString(MID_RANGE_WEATHER_URI.toString());
        String path = isMidLandFcst ? "/getMidLandFcst" : "/getMidTa";
        UriComponents uri = builder
                .path(path)
                .queryParam(SERVICE_KEY.toString(), midRangeServiceKey)
                .queryParam(NUM_OF_ROWS.toString(), 1)
                .queryParam(PAGE_NO.toString(), 10)
                .queryParam(DATA_TYPE.toString(), "JSON")
                .queryParam("tmFc", baseDate + "0600")
                .queryParam("regId", regId)
                .build();
        String uriString =  uri.toUriString();
        return uriString;
    }

}
