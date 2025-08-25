package com.ImSnacks.NyeoreumnagiBatch.shortTermWeatherForecast.processor;

import com.ImSnacks.NyeoreumnagiBatch.shortTermWeatherForecast.reader.ApiRequestValues;
import com.ImSnacks.NyeoreumnagiBatch.shortTermWeatherForecast.reader.dto.VilageFcstResponseDto;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.retry.annotation.Backoff;
import org.springframework.retry.annotation.EnableRetry;
import org.springframework.retry.annotation.Retryable;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;
import java.time.temporal.ChronoUnit;

@Slf4j
@EnableRetry
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

    @Retryable(
            maxAttempts = 3,
            value = Exception.class,
            backoff = @Backoff(delay = 2000, multiplier = 2)
    )
    public VilageFcstResponseDto call(String baseDate, String baseTime, int nx, int ny) throws IOException, InterruptedException {
        URI uri = buildUri(baseDate, baseTime, nx, ny);
        HttpRequest req = HttpRequest.newBuilder()
                .uri(uri)
                .version(HttpClient.Version.HTTP_1_1)
                .timeout(Duration.of(30, ChronoUnit.SECONDS))
                .GET().build();

        HttpResponse<String> res = httpClient.send(req, HttpResponse.BodyHandlers.ofString());
        VilageFcstResponseDto data = new ObjectMapper()
                .configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false)
                .configure(DeserializationFeature.FAIL_ON_NULL_FOR_PRIMITIVES, false)
                .readValue(res.body(), VilageFcstResponseDto.class);
        return data;
    }

    private URI buildUri(String baseDate, String baseTime, int nx, int ny) {
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
}
