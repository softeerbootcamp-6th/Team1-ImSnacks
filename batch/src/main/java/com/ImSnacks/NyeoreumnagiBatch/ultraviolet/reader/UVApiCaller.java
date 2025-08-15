package com.ImSnacks.NyeoreumnagiBatch.ultraviolet.reader;

import com.ImSnacks.NyeoreumnagiBatch.ultraviolet.reader.dto.UVReaderResponseDto;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.net.URI;
import java.net.URLEncoder;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;

import static com.ImSnacks.NyeoreumnagiBatch.ultraviolet.reader.enums.UVApiRequestValue.*;

@Component
public class UVApiCaller {
    @Value("${api.service.uv-key}")
    private String secretKey;

    public UVReaderResponseDto call(String areaCode, String time) throws IOException, InterruptedException {
        String uriString = buildUriString(areaCode, time);

        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(uriString))
                .header("Content-type", "application/json")
                .GET()
                .build();

        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
        UVReaderResponseDto dto = new ObjectMapper().readValue(response.body(), UVReaderResponseDto.class);
        return dto;
    }

    private String buildUriString(String areaCode, String timeStr){
        String serviceKey = URLEncoder.encode(secretKey, StandardCharsets.UTF_8);
        String areaNo = URLEncoder.encode(areaCode, StandardCharsets.UTF_8);
        String time = URLEncoder.encode(timeStr, StandardCharsets.UTF_8);
        String dataType = URLEncoder.encode("JSON", StandardCharsets.UTF_8);

        return String.format(
                UV_URL.toString(),
                serviceKey, areaNo, time, dataType
        );
    }
}
