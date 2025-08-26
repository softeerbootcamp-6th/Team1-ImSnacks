package com.ImSnacks.NyeoreumnagiBatch.sunRiseSet.reader;

import com.ImSnacks.NyeoreumnagiBatch.sunRiseSet.reader.dto.SunRiseSetReaderResponseDto;
import com.fasterxml.jackson.dataformat.xml.XmlMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.net.URI;
import java.net.URLEncoder;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;

import static com.ImSnacks.NyeoreumnagiBatch.sunRiseSet.reader.enums.SunRiseSetApiRequestValue.SUNRISESET_URL;

@Component
public class SunRiseSetApiCaller {
    @Value("${api.service.sunriseset-key}")
    private String secretKey;

    public SunRiseSetReaderResponseDto call(String locdate, double latitude, double longitude) throws IOException, InterruptedException {
        String uriString = buildUriString(locdate, latitude, longitude);

        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(uriString))
                .header("Content-type", "application/json")
                .GET()
                .build();

        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
        return new XmlMapper().readValue(response.body(), SunRiseSetReaderResponseDto.class);
    }

    private String buildUriString(String date, double latitude, double longitude){
        String serviceKey = URLEncoder.encode(secretKey, StandardCharsets.UTF_8);
        String locdate = URLEncoder.encode(date, StandardCharsets.UTF_8);
        String latitudeStr = String.valueOf(latitude);
        String longitudeStr = String.valueOf(longitude);

        return String.format(
                SUNRISESET_URL.toString(),
                serviceKey, locdate, latitudeStr, longitudeStr, "Y"
        );
    }
}
