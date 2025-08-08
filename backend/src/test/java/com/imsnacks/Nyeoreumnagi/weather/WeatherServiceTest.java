package com.imsnacks.Nyeoreumnagi.weather;

import com.imsnacks.Nyeoreumnagi.common.enums.WeatherMetric;
import com.imsnacks.Nyeoreumnagi.member.entity.Farm;
import com.imsnacks.Nyeoreumnagi.member.entity.Member;
import com.imsnacks.Nyeoreumnagi.member.repository.MemberRepository;
import com.imsnacks.Nyeoreumnagi.weather.dto.response.GetWeatherGraphResponse;
import com.imsnacks.Nyeoreumnagi.weather.entity.ShortTermWeatherForecast;
import com.imsnacks.Nyeoreumnagi.weather.repository.ShortTermWeatherForecastRepository;
import com.imsnacks.Nyeoreumnagi.weather.service.WeatherService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;
import java.util.stream.IntStream;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.mockito.BDDMockito.given;

@ExtendWith(MockitoExtension.class)
class WeatherServiceTest {

    @InjectMocks
    private WeatherService weatherService;

    @Mock
    private MemberRepository memberRepository;

    @Mock
    private ShortTermWeatherForecastRepository weatherRepository;

    @Test
    void getWeatherGraph_성공() {
        // given
        Long memberId = 1L;
        WeatherMetric metric = WeatherMetric.TEMPERATURE;

        Farm farm = new Farm(1L, "", "", "", "", 36.12, 127.12, 60, 120, null);
        Member member = new Member(1L, "", "", "", "", null, farm);

        List<ShortTermWeatherForecast> forecasts = IntStream.range(0, 24)
                .mapToObj(i -> ShortTermWeatherForecast.builder()
                        .fcstTime(i)
                        .nx(60)
                        .ny(120)
                        .temperature(20 + i % 5)
                        .humidity(60)
                        .precipitation(0)
                        .windSpeed(3)
                        .build())
                .toList();

        given(memberRepository.findById(memberId)).willReturn(Optional.of(member));
        given(weatherRepository.findAllByNxAndNy(60, 120)).willReturn(forecasts);

        // when
        GetWeatherGraphResponse response = weatherService.getWeatherGraph(memberId, metric);

        // then
        assertThat(response.weatherMetric()).isEqualTo(metric);
        assertThat(response.max()).isGreaterThan(response.min());
        assertThat(response.valuePerTime().size()).isEqualTo(24);
    }
}