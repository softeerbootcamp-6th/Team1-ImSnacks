package com.imsnacks.Nyeoreumnagi.weather;

import com.imsnacks.Nyeoreumnagi.common.enums.WeatherCondition;
import com.imsnacks.Nyeoreumnagi.common.enums.WeatherMetric;
import com.imsnacks.Nyeoreumnagi.common.enums.WeatherRiskType;
import com.imsnacks.Nyeoreumnagi.member.entity.Farm;
import com.imsnacks.Nyeoreumnagi.member.entity.Member;
import com.imsnacks.Nyeoreumnagi.member.exception.MemberException;
import com.imsnacks.Nyeoreumnagi.member.exception.MemberResponseStatus;
import com.imsnacks.Nyeoreumnagi.member.repository.MemberRepository;
import com.imsnacks.Nyeoreumnagi.weather.dto.response.GetFcstRiskResponse;
import com.imsnacks.Nyeoreumnagi.weather.dto.response.GetWeatherBriefingResponse;
import com.imsnacks.Nyeoreumnagi.weather.dto.response.GetWeatherConditionResponse;
import com.imsnacks.Nyeoreumnagi.weather.dto.response.GetWeatherGraphResponse;
import com.imsnacks.Nyeoreumnagi.weather.entity.ShortTermWeatherForecast;
import com.imsnacks.Nyeoreumnagi.weather.entity.WeatherRisk;
import com.imsnacks.Nyeoreumnagi.weather.exception.WeatherException;
import com.imsnacks.Nyeoreumnagi.weather.repository.DashboardTodayWeatherRepository;
import com.imsnacks.Nyeoreumnagi.weather.repository.ShortTermWeatherForecastRepository;
import com.imsnacks.Nyeoreumnagi.weather.repository.WeatherRiskRepository;
import com.imsnacks.Nyeoreumnagi.weather.service.SunriseSunSetTime;
import com.imsnacks.Nyeoreumnagi.weather.service.WeatherService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.mockito.junit.jupiter.MockitoSettings;
import org.mockito.quality.Strictness;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.time.LocalTime;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.IntStream;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.assertj.core.api.AssertionsForClassTypes.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

@MockitoSettings(strictness = Strictness.LENIENT)
@ExtendWith(MockitoExtension.class)
class WeatherServiceTest {
    private static final Logger log = LoggerFactory.getLogger(WeatherServiceTest.class);

    private static final LocalDateTime BASE = LocalDateTime.of(2025, 8, 5, 0, 0);

    @InjectMocks
    private WeatherService weatherService;
    @Mock
    private MemberRepository memberRepository;
    @Mock
    private ShortTermWeatherForecastRepository shortTermWeatherForecastRepository;
    @Mock
    private WeatherRiskRepository weatherRiskRepository;
    @Mock
    private DashboardTodayWeatherRepository dashboardTodayWeatherRepository;


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
        given(shortTermWeatherForecastRepository.findAllByNxAndNy(60, 120)).willReturn(forecasts);

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

        LocalDateTime startA = BASE.withHour(1);
        LocalDateTime endA = BASE.withHour(6);
        WeatherRisk riskA = WeatherRisk.builder()
                .weatherRiskId(10L)
                .fcstDate(LocalDate.now())
                .startTime(startA)
                .endTime(endA)
                .type(WeatherRiskType.RAIN) // ordinal 1
                .nx(60).ny(120).jobExecutionId(77L)
                .build();

        LocalDateTime startB = BASE.withHour(3);
        LocalDateTime endB = BASE.withHour(8);
        WeatherRisk riskB = WeatherRisk.builder()
                .weatherRiskId(11L)
                .fcstDate(LocalDate.now())
                .startTime(startB)
                .endTime(endB)
                .type(WeatherRiskType.FROST) // ordinal 2
                .nx(60).ny(120).jobExecutionId(77L)
                .build();

        LocalDateTime startC = BASE.withHour(5);
        LocalDateTime endC = BASE.withHour(7);
        WeatherRisk riskC = WeatherRisk.builder()
                .weatherRiskId(12L)
                .fcstDate(LocalDate.now())
                .startTime(startC)
                .endTime(endC)
                .type(WeatherRiskType.ABNORMAL_HEAT) // ordinal 3 가장 높음!
                .nx(60).ny(120).jobExecutionId(77L)
                .build();

        when(memberRepository.findById(memberId)).thenReturn(Optional.of(member));
        when(weatherRiskRepository.findByNxAndNyWithMaxJobExecutionId(60, 120))
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

    @Test
    void WeatherBriefing_유효하지_않은_멤버_입력시_예외_발생() {
        final Long wrongMemberId = 42L;
        assertThatThrownBy(() -> weatherService.getWeatherBriefing(wrongMemberId)).isInstanceOf(MemberException.class);
        try {
            weatherService.getWeatherBriefing(wrongMemberId);
        } catch (MemberException e) {
            assertThat(e.getStatus()).isEqualTo(MemberResponseStatus.MEMBER_NOT_FOUND);
        }
    }

    @Test
    void WeatherBriefing_농장이_없는_경우_예외_발생() {
        final long memberId = 42L;
        final Member member = new Member(memberId, "", "", "", "", null, null);
        given(memberRepository.findById(memberId)).willReturn(Optional.of(member));

//        assertThatThrownBy(() -> weatherService.getWeatherBriefing(memberId))
//                .isInstanceOf(MemberException.class)
//                .extracting("status")
//                .isEqualTo(MemberResponseStatus.NO_FARM_INFO);
        Assertions.assertThrows(MemberException.class, () -> {
            weatherService.getWeatherBriefing(memberId);
        });
    }

    @Test
    void WeatherBriefing_날씨특보_정보가_없는_경우_false와_빈문자열_반환() {
        // given
        final long memberId = 42L;
        final Farm farm = new Farm(memberId, "", "", "", "", 36.12, 127.12, 60, 120, null);
        final Member member = new Member(memberId, "", "", "", "", null, farm);
        given(memberRepository.findById(memberId)).willReturn(Optional.of(member));

        // when
        GetWeatherBriefingResponse actual = weatherService.getWeatherBriefing(memberId);

        // then
        GetWeatherBriefingResponse expected = new GetWeatherBriefingResponse(false, "");
        assertThat(actual).isEqualTo(expected);
    }

    @Test
    void WeatherBriefing_날씨특보_하나만_있을때_출력() {
        final long memberId = 42L;
        final int nx = 60;
        final int ny = 120;
        final Farm farm = new Farm(memberId, "", "", "", "", 36.12, 127.12, nx, ny, null);
        final Member member = new Member(memberId, "", "", "", "", null, farm);
        given(memberRepository.findById(memberId)).willReturn(Optional.of(member));

        final long riskId = 1L;
        final long jobExecutionId = 1L;
        final LocalDate fcstDate = LocalDate.now();
        final LocalDateTime from = LocalDateTime.now();
        final LocalDateTime to = LocalDateTime.now().plusHours(2);

        for (WeatherRiskType type : WeatherRiskType.values()) {
            WeatherRisk risk = new WeatherRisk(riskId, jobExecutionId, fcstDate, from, to, nx, ny, type);
            //given(weatherRiskRepository.findById(riskId)).willReturn(Optional.of(risk));
            when(weatherRiskRepository.findByNxAndNyWithMaxJobExecutionId(60, 120))
                    .thenReturn(List.of(risk));
            GetWeatherBriefingResponse actual = weatherService.getWeatherBriefing(memberId);
            log.info(actual.toString());
        }
    }

    @Test
    void WeatherBriefing_날씨특보_여러개가_같은_시간대일때_우선순위_확인() {
        final long memberId = 42L;
        final int nx = 60;
        final int ny = 120;
        final Farm farm = new Farm(memberId, "", "", "", "", 36.12, 127.12, nx, ny, null);
        final Member member = new Member(memberId, "", "", "", "", null, farm);
        given(memberRepository.findById(memberId)).willReturn(Optional.of(member));

        final long jobExecutionId = 1L;
        final LocalDate fcstDate = LocalDate.now();
        final LocalDateTime from = LocalDateTime.now();
        final LocalDateTime to = LocalDateTime.now().plusHours(2);

        // 동일 기간의 리스크 여러개로 리스트를 구성한다.
        // 가장 우선순위가 높은 "폭우" 정보가 나와야 한다.
        List<WeatherRisk> risks = new ArrayList<>();
        long riskId = 1L;
        for (WeatherRiskType type : WeatherRiskType.values()) {
            WeatherRisk e = new WeatherRisk(riskId++, jobExecutionId, fcstDate, from, to, nx, ny, type);
            risks.add(e);
        }
        when(weatherRiskRepository.findByNxAndNyWithMaxJobExecutionId(nx, ny)).thenReturn(risks);

        GetWeatherBriefingResponse actual = weatherService.getWeatherBriefing(memberId);
        log.info(actual.toString());
    }
  
    void 정상_날씨_조회_성공() {
        // given
        long memberId = 1L;
        Farm farm = new Farm(1L, "", "", "", "", 36.12, 127.12, 60, 120, null);
        Member member = new Member(1L, "", "", "", "", null, farm);
        ShortTermWeatherForecast forecast = mock(ShortTermWeatherForecast.class);
        SunriseSunSetTime sunriseSunSetTime = mock(SunriseSunSetTime.class);

        when(forecast.getFcstTime()).thenReturn(LocalDateTime.now().getHour());
        when(forecast.getWeatherCondition(sunriseSunSetTime)).thenReturn(WeatherCondition.SUNNY);
        when(forecast.getTemperature()).thenReturn(23);
        when(memberRepository.findById(memberId)).thenReturn(java.util.Optional.of(member));
        when(shortTermWeatherForecastRepository.findAllByNxAndNy(60, 120)).thenReturn(java.util.List.of(forecast));
        when(dashboardTodayWeatherRepository.findByNxAndNy(60, 120)).thenReturn(sunriseSunSetTime);

        // when
        GetWeatherConditionResponse response = weatherService.getWeatherCondition(memberId);

        // then
        assertThat(response.weatherCondition()).isEqualTo(WeatherCondition.SUNNY.toString());
        assertThat(response.weatherKeyword()).isEqualTo(WeatherCondition.SUNNY.getKeyword());
        assertThat(response.temperature()).isEqualTo(23);
    }

    @Test
    void 존재하지_않는_회원_예외() {
        // given
        Long invalidId = 999L;
        when(memberRepository.findById(invalidId)).thenReturn(java.util.Optional.empty());

        // when & then
        assertThatThrownBy(() -> weatherService.getWeatherCondition(invalidId))
                .isInstanceOf(MemberException.class);
    }

    @Test
    void 농장정보_없음_예외() {
        // given
        Member member = new Member(1L, "", "", "", "", null, null);
        when(member.getFarm()).thenReturn(null);
        when(memberRepository.findById(any())).thenReturn(java.util.Optional.of(member));

        // when & then
        assertThatThrownBy(() -> weatherService.getWeatherCondition(1L))
                .isInstanceOf(MemberException.class);
    }

    @Test
    void 날씨정보_없음_예외() {
        // given
        Farm farm = new Farm(1L, "", "", "", "", 36.12, 127.12, 60, 120, null);
        Member member = new Member(1L, "", "", "", "", null, farm);
        when(memberRepository.findById(any())).thenReturn(java.util.Optional.of(member));
        when(shortTermWeatherForecastRepository.findAllByNxAndNy(anyInt(), anyInt()))
                .thenReturn(java.util.List.of());

        // when & then
        assertThatThrownBy(() -> weatherService.getWeatherCondition(1L))
                .isInstanceOf(WeatherException.class);
    }
}