package com.imsnacks.Nyeoreumnagi.weather;

import com.imsnacks.Nyeoreumnagi.common.enums.WeatherMetric;
import com.imsnacks.Nyeoreumnagi.common.enums.WeatherRiskType;
import com.imsnacks.Nyeoreumnagi.member.entity.Farm;
import com.imsnacks.Nyeoreumnagi.member.entity.Member;
import com.imsnacks.Nyeoreumnagi.member.exception.MemberException;
import com.imsnacks.Nyeoreumnagi.member.repository.MemberRepository;
import com.imsnacks.Nyeoreumnagi.weather.dto.response.GetFcstRiskResponse;
import com.imsnacks.Nyeoreumnagi.weather.dto.response.GetWeatherGraphResponse;
import com.imsnacks.Nyeoreumnagi.weather.entity.ShortTermWeatherForecast;
import com.imsnacks.Nyeoreumnagi.weather.entity.WeatherRisk;
import com.imsnacks.Nyeoreumnagi.weather.repository.ShortTermWeatherForecastRepository;
import com.imsnacks.Nyeoreumnagi.weather.repository.WeatherRiskRepository;
import com.imsnacks.Nyeoreumnagi.weather.service.WeatherService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.IntStream;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class WeatherServiceTest {

    @InjectMocks
    private WeatherService weatherService;
    @Mock
    private MemberRepository memberRepository;
    @Mock
    private ShortTermWeatherForecastRepository weatherRepository;
    @Mock
    private WeatherRiskRepository weatherRiskRepository;

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

    @Test
    void 기상_특보_겹침_우선순위대로_반환_성공() {
        //given
        long memberId = 1L;
        Farm farm = new Farm(1L, "", "", "", "", 36.12, 127.12, 60, 120, null);
        Member member = new Member(1L, "", "", "", "", null, farm);

        WeatherRisk riskA = WeatherRisk.builder()
                .weatherRiskId(10L)
                .fcstDate(LocalDate.now())
                .startTime(1)
                .endTime(6)
                .type(WeatherRiskType.RAIN) // ordinal 1
                .nx(60).ny(120).jobExecutionId(77L)
                .build();
        WeatherRisk riskB = WeatherRisk.builder()
                .weatherRiskId(11L)
                .fcstDate(LocalDate.now())
                .startTime(3)
                .endTime(8)
                .type(WeatherRiskType.FROST) // ordinal 2
                .nx(60).ny(120).jobExecutionId(77L)
                .build();
        WeatherRisk riskC = WeatherRisk.builder()
                .weatherRiskId(12L)
                .fcstDate(LocalDate.now())
                .startTime(5)
                .endTime(7)
                .type(WeatherRiskType.ABNORMAL_HEAT) // ordinal 3 가장 높음!
                .nx(60).ny(120).jobExecutionId(77L)
                .build();
        when(memberRepository.findById(memberId)).thenReturn(Optional.of(member));
        when(weatherRiskRepository.findByNxAndNyWithMaxJobExecutionId(60,120))
                .thenReturn(Arrays.asList(riskA, riskB, riskC));

        //when
        GetFcstRiskResponse response = weatherService.getWeatherRisk(memberId);
        List<GetFcstRiskResponse.WeatherRiskDto> risks = response.items();

        //then
        assertThat(risks.size()).isEqualTo(4);
        assertThat(risks.get(0).category()).isEqualTo(WeatherRiskType.RAIN.getDescription());
        assertThat(risks.get(0).startTime()).isEqualTo("1");
        assertThat(risks.get(0).endTime()).isEqualTo("3");

        assertThat(risks.get(1).category()).isEqualTo(WeatherRiskType.FROST.getDescription());
        assertThat(risks.get(1).startTime()).isEqualTo("3");
        assertThat(risks.get(1).endTime()).isEqualTo("5");

        assertThat(risks.get(2).category()).isEqualTo(WeatherRiskType.ABNORMAL_HEAT.getDescription());
        assertThat(risks.get(2).startTime()).isEqualTo("5");
        assertThat(risks.get(2).endTime()).isEqualTo("7");

        assertThat(risks.get(3).category()).isEqualTo(WeatherRiskType.FROST.getDescription());
        assertThat(risks.get(3).startTime()).isEqualTo("7");
        assertThat(risks.get(3).endTime()).isEqualTo("8");
    }
}