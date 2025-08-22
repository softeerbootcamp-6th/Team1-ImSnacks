package com.ImSnacks.NyeoreumnagiBatch.shortTermWeatherForecast.reader;

import com.ImSnacks.NyeoreumnagiBatch.shortTermWeatherForecast.reader.dto.VilageFcstResponseDto;
import io.netty.channel.ChannelOption;
import io.netty.handler.timeout.ReadTimeoutHandler;
import io.netty.handler.timeout.WriteTimeoutHandler;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.client.reactive.ReactorClientHttpConnector;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;
import reactor.netty.http.client.HttpClient;

import java.time.Duration;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.TimeUnit;

import static com.ImSnacks.NyeoreumnagiBatch.shortTermWeatherForecast.reader.ApiRequestValues.AUTH_KEY;
import static com.ImSnacks.NyeoreumnagiBatch.shortTermWeatherForecast.reader.ApiRequestValues.BASE_DATE;
import static com.ImSnacks.NyeoreumnagiBatch.shortTermWeatherForecast.reader.ApiRequestValues.BASE_TIME;
import static com.ImSnacks.NyeoreumnagiBatch.shortTermWeatherForecast.reader.ApiRequestValues.DATA_TYPE;
import static com.ImSnacks.NyeoreumnagiBatch.shortTermWeatherForecast.reader.ApiRequestValues.NUM_OF_ROWS;
import static com.ImSnacks.NyeoreumnagiBatch.shortTermWeatherForecast.reader.ApiRequestValues.NX;
import static com.ImSnacks.NyeoreumnagiBatch.shortTermWeatherForecast.reader.ApiRequestValues.NY;
import static com.ImSnacks.NyeoreumnagiBatch.shortTermWeatherForecast.reader.ApiRequestValues.PAGE_NO;
import static com.ImSnacks.NyeoreumnagiBatch.shortTermWeatherForecast.reader.ApiRequestValues.URI;

@Slf4j
@Component
public class AsyncApiCaller {
    @Value("${OPEN_API_KEY}")
    private String serviceKey;

    private final WebClient webClient;

    public AsyncApiCaller() {
        // configuration
        HttpClient httpClient = HttpClient.create()
                .option(ChannelOption.CONNECT_TIMEOUT_MILLIS, 5000)
                .responseTimeout(Duration.ofMillis(5000))
                .doOnConnected(conn->
                        conn.addHandlerLast(new ReadTimeoutHandler(5, TimeUnit.SECONDS))
                                .addHandlerLast(new WriteTimeoutHandler(5, TimeUnit.SECONDS)));

        this.webClient = WebClient.builder()
                .clientConnector(new ReactorClientHttpConnector(httpClient))
                .build();
    }

    public VilageFcstResponseDto call(String baseDate, String baseTime, int nx, int ny) {
        String uriString = buildUriString(baseDate, baseTime, nx, ny);
        log.info("Calling web service at {}", uriString);
        return webClient.get()
                .uri(uriString)
                .retrieve()
                .bodyToMono(VilageFcstResponseDto.class)
                .block(); // Processor 내에서 동기 처리를 위해 block()을 사용한다.
    }


    private String buildUriString(String baseDate, String baseTime, int nx, int ny) {
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
