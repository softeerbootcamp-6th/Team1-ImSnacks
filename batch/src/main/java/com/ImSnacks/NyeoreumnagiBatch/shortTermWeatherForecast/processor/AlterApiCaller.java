package com.ImSnacks.NyeoreumnagiBatch.shortTermWeatherForecast.processor;

import com.ImSnacks.NyeoreumnagiBatch.shortTermWeatherForecast.reader.dto.VilageFcstResponseDto;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.JsonNode;
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
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@EnableRetry
@Component
public class AlterApiCaller {
    @Value("${api.tomorrow.key}")
    private String secretKey;

    private HttpClient httpClient;

    public AlterApiCaller() {
        httpClient = HttpClient.newBuilder()
                .followRedirects(HttpClient.Redirect.ALWAYS)
                .build();

    }

    @Retryable(
            maxAttempts = 3,
            value = Exception.class,
            backoff = @Backoff(delay = 2000, multiplier = 2)
    )
    public VilageFcstResponseDto call(String baseDate, String baseTime, double latitude, double longitude, int nx, int ny) throws IOException, InterruptedException {
        URI uri = buildUri(baseDate, baseTime, latitude, longitude);

        HttpRequest req = HttpRequest.newBuilder()
                .uri(uri)
                .version(HttpClient.Version.HTTP_1_1)
                .timeout(Duration.of(30, ChronoUnit.SECONDS))
                .GET().build();

        HttpResponse<String> res = httpClient.send(req, HttpResponse.BodyHandlers.ofString());

        ObjectMapper mapper = new ObjectMapper()
                .configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false)
                .configure(DeserializationFeature.FAIL_ON_NULL_FOR_PRIMITIVES, false);

        JsonNode root = mapper.readTree(res.body());

        return convertToVilageFcstResponseDto(baseDate, baseTime, root, nx, ny);
    }

    private URI buildUri(String baseDate, String baseTime, double latitude, double longitude) {
        return UriComponentsBuilder.fromUriString("https://api.tomorrow.io/v4/weather/forecast")
                .queryParam("location", latitude + "," + longitude)
                .queryParam("apikey", secretKey)
                .encode()
                .build()
                .toUri();
    }

    private VilageFcstResponseDto convertToVilageFcstResponseDto(String baseDate, String baseTime, JsonNode root, int nx, int ny) {
        List<VilageFcstResponseDto.Item> items = new ArrayList<>();

        for (JsonNode hourlyNode : root.path("timelines").path("hourly")) {
            String utcTime = hourlyNode.path("time").asText();
            ZonedDateTime kst = ZonedDateTime.parse(utcTime)
                    .withZoneSameInstant(ZoneId.of("Asia/Seoul"));

            String fcstDate = kst.format(DateTimeFormatter.ofPattern("yyyyMMdd"));
            String fcstTime = kst.format(DateTimeFormatter.ofPattern("HHmm"));

            JsonNode values = hourlyNode.path("values");

            addItem(items, "PCP", fcstDate, fcstTime, values.path("rainIntensity").asText(), nx, ny, baseDate, baseTime);
            addItem(items, "TMP", fcstDate, fcstTime, String.valueOf(values.path("temperature").asInt()), nx, ny, baseDate, baseTime);
            addItem(items, "REH", fcstDate, fcstTime, String.valueOf(values.path("humidity").asInt()), nx, ny, baseDate, baseTime);
            addItem(items, "WSD", fcstDate, fcstTime, values.path("windSpeed").asText(), nx, ny, baseDate, baseTime);
            addItem(items, "SNO", fcstDate, fcstTime, values.path("snowIntensity").asText(), nx, ny, baseDate, baseTime);

            double cloudCover = values.path("cloudBase").asDouble();
            String skyValue = (cloudCover <= 0.3) ? "1" : (cloudCover <= 0.6 ? "3" : "4");
            addItem(items, "SKY", fcstDate, fcstTime, skyValue, nx, ny, baseDate, baseTime);

            addItem(items, "VEC", fcstDate, fcstTime, values.path("windDirection").asText(), nx, ny, baseDate, baseTime);
        }

        VilageFcstResponseDto.Items itemsWrapper = new VilageFcstResponseDto.Items();
        itemsWrapper.setItem(items);

        VilageFcstResponseDto.Body body = new VilageFcstResponseDto.Body();
        body.setItems(itemsWrapper);

        VilageFcstResponseDto.Header header = new VilageFcstResponseDto.Header();
        header.setResultCode("00");
        header.setResultMsg("OK");

        VilageFcstResponseDto.Response response = new VilageFcstResponseDto.Response();
        response.setHeader(header);
        response.setBody(body);

        VilageFcstResponseDto dto = new VilageFcstResponseDto();
        dto.setResponse(response);

        return dto;
    }

    private void addItem(List<VilageFcstResponseDto.Item> items, String category,
                         String fcstDate, String fcstTime, String value,
                         int nx, int ny,
                         String baseDate, String baseTime) {
        VilageFcstResponseDto.Item item = new VilageFcstResponseDto.Item();
        item.setCategory(category);
        item.setFcstDate(fcstDate);
        item.setFcstTime(fcstTime);
        item.setFcstValue(value);
        item.setNx(nx);
        item.setNy(ny);
        item.setBaseDate(baseDate);
        item.setBaseTime(baseTime);
        items.add(item);
    }
}
