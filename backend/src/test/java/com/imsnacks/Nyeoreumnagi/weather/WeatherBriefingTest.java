package com.imsnacks.Nyeoreumnagi.weather;

import com.imsnacks.Nyeoreumnagi.common.enums.WeatherRiskType;
import com.imsnacks.Nyeoreumnagi.farm.entity.Farm;
import com.imsnacks.Nyeoreumnagi.member.entity.Member;
import com.imsnacks.Nyeoreumnagi.member.exception.MemberException;
import com.imsnacks.Nyeoreumnagi.member.exception.MemberResponseStatus;
import com.imsnacks.Nyeoreumnagi.member.repository.FarmRepository;
import com.imsnacks.Nyeoreumnagi.member.repository.MemberRepository;
import com.imsnacks.Nyeoreumnagi.weather.dto.response.GetWeatherBriefingResponse;
import com.imsnacks.Nyeoreumnagi.weather.entity.WeatherRisk;
import com.imsnacks.Nyeoreumnagi.weather.repository.DashboardTodayWeatherRepository;
import com.imsnacks.Nyeoreumnagi.weather.repository.ShortTermWeatherForecastRepository;
import com.imsnacks.Nyeoreumnagi.weather.repository.WeatherRiskRepository;
import com.imsnacks.Nyeoreumnagi.weather.service.Briefing;
import com.imsnacks.Nyeoreumnagi.weather.service.WeatherService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockedStatic;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.mockito.junit.jupiter.MockitoSettings;
import org.mockito.quality.Strictness;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Random;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.when;

@MockitoSettings(strictness = Strictness.LENIENT)
@ExtendWith(MockitoExtension.class)
class WeatherBriefingTest {
    private static final LocalDateTime BASE = LocalDateTime.of(2025, 8, 12, 0, 0);

    @InjectMocks
    private WeatherService service;
    @Mock
    private MemberRepository memberRepo;
    @Mock
    private FarmRepository farmRepository;
    @Mock
    private ShortTermWeatherForecastRepository shortTermWeatherForecastRepository;
    @Mock
    private WeatherRiskRepository riskRepo;
    @Mock
    private DashboardTodayWeatherRepository dashboardTodayWeatherRepository;

    @Test
    void 멤버가_없는_경우_예외_발생() {
        final long memberId = 42L;
        when(farmRepository.findByMember_Id(memberId)).thenReturn(Optional.empty());
        Assertions.assertThrows(MemberException.class, () -> {
            service.getWeatherBriefing(memberId);
        });
        try {
            service.getWeatherBriefing(memberId);
        } catch (MemberException e) {
            assertThat(e.getStatus()).isEqualTo(MemberResponseStatus.NO_FARM_INFO);
        }
    }

    @Test
    void 농장이_없는_경우_예외_발생() {
        final long memberId = 42L;
        final Member member = new Member(memberId, "", "", "", "", null, null);
        when(farmRepository.findByMember_Id(memberId)).thenReturn(Optional.empty());
        Assertions.assertThrows(MemberException.class, () -> {
            service.getWeatherBriefing(memberId);
        });
        try {
            service.getWeatherBriefing(memberId);
        } catch (MemberException e) {
            assertThat(e.getStatus()).isEqualTo(MemberResponseStatus.NO_FARM_INFO);
        }
    }

    @Test
    void 날씨_상황_정보가_없을때_아침이면_아침_인사말을_반환한다() {
        // given
        final long memberId = 42L;
        final int nx = 60;
        final int ny = 120;
        final Farm farm = new Farm(memberId, "", "", "", "", 36.12, 127.12, nx, ny, "regioncode", null);
        final Member member = new Member(memberId, "", "", "", "", null, farm);
        when(farmRepository.findByMember_Id(memberId)).thenReturn(Optional.of(farm));

        given(memberRepo.findById(memberId)).willReturn(Optional.of(member));
        final LocalDateTime morning = LocalDateTime.of(2025, 8, 16, 9, 0);

        try (MockedStatic<LocalDateTime> localDateTimeMock = Mockito.mockStatic(LocalDateTime.class)) {
            localDateTimeMock.when(LocalDateTime::now).thenReturn(morning);
            final var expected = new GetWeatherBriefingResponse(false, Briefing.GOOD_MORNING);
            final var actual = service.getWeatherBriefing(memberId);
            assertThat(actual).isEqualTo(expected);
        }
    }

    @Test
    void 날씨_상황_정보가_없을때_정오_이후면_점심_인사말을_반환한다() {
        // given
        final long memberId = 42L;
        final int nx = 60;
        final int ny = 120;
        final Farm farm = new Farm(memberId, "", "", "", "", 36.12, 127.12, nx, ny, "regioncode", null);
        final Member member = new Member(memberId, "", "", "", "", null, farm);
        when(farmRepository.findByMember_Id(memberId)).thenReturn(Optional.of(farm));

        given(memberRepo.findById(memberId)).willReturn(Optional.of(member));
        final LocalDateTime afternoon = LocalDateTime.of(2025, 8, 16, 14, 0);

        try (MockedStatic<LocalDateTime> localDateTimeMock = Mockito.mockStatic(LocalDateTime.class)) {
            localDateTimeMock.when(LocalDateTime::now).thenReturn(afternoon);
            final var expected = new GetWeatherBriefingResponse(false, Briefing.GOOD_AFTERNOON);
            final var actual = service.getWeatherBriefing(memberId);
            assertThat(actual).isEqualTo(expected);
        }
    }

    @Test
    void 날씨_상황_정보가_없을때_저녁_시간이면_저녁_인사말을_반환한다() {
        // given
        final long memberId = 42L;
        final int nx = 60;
        final int ny = 120;
        final Farm farm = new Farm(memberId, "", "", "", "", 36.12, 127.12, nx, ny, "regioncode", null);
        final Member member = new Member(memberId, "", "", "", "", null, farm);
        when(farmRepository.findByMember_Id(memberId)).thenReturn(Optional.of(farm));
        final LocalDateTime evening = LocalDateTime.of(2025, 8, 16, 19, 0);

        try (MockedStatic<LocalDateTime> localDateTimeMock = Mockito.mockStatic(LocalDateTime.class)) {
            localDateTimeMock.when(LocalDateTime::now).thenReturn(evening);
            final var expected = new GetWeatherBriefingResponse(false, Briefing.GOOD_EVENING);
            final var actual = service.getWeatherBriefing(memberId);
            assertThat(actual).isEqualTo(expected);
        }
    }

    @Test
    void 날씨_상황_정보가_없을때_밤이면_밤_인사말을_반환한다() {
        // given
        final long memberId = 42L;
        final int nx = 60;
        final int ny = 120;
        final Farm farm = new Farm(memberId, "", "", "", "", 36.12, 127.12, nx, ny, "regioncode", null);
        final Member member = new Member(memberId, "", "", "", "", null, farm);

        when(farmRepository.findByMember_Id(memberId)).thenReturn(Optional.of(farm));
        final LocalDateTime night = LocalDateTime.of(2025, 8, 16, 2, 0);

        try (MockedStatic<LocalDateTime> localDateTimeMock = Mockito.mockStatic(LocalDateTime.class)) {
            localDateTimeMock.when(LocalDateTime::now).thenReturn(night);
            final var expected = new GetWeatherBriefingResponse(false, Briefing.GOOD_NIGHT);
            final var actual = service.getWeatherBriefing(memberId);
            assertThat(actual).isEqualTo(expected);
        }
    }

    @Test
    void 하나의_날씨_상황_정보() {
        // given
        final long memberId = 42L;
        final int nx = 60;
        final int ny = 120;
        final Farm farm = new Farm(memberId, "", "", "", "", 36.12, 127.12, nx, ny, "regionCode", null);
        when(farmRepository.findByMember_Id(memberId)).thenReturn(Optional.of(farm));

        final LocalDateTime from = LocalDateTime.now(java.time.ZoneId.of(com.imsnacks.Nyeoreumnagi.weather.service.Briefing.KST)).minusHours(1);
        final LocalDateTime to = LocalDateTime.now(java.time.ZoneId.of(com.imsnacks.Nyeoreumnagi.weather.service.Briefing.KST)).plusHours(2);
        final WeatherRiskType type = WeatherRiskType.RAIN;

        WeatherRisk r = WeatherRisk.builder()
                .weatherRiskId(1L)
                .fcstDate(BASE.toLocalDate())
                .startTime(from)
                .endTime(to)
                .nx(nx)
                .ny(ny)
                .name(type)
                .jobExecutionId(1L)
                .build();

        final List<WeatherRisk> risks = List.of(r);
        given(riskRepo.findByNxAndNyWithMaxJobExecutionId(nx, ny)).willReturn(risks);

        // when
        final GetWeatherBriefingResponse actual = service.getWeatherBriefing(memberId);

        // then
        final String msg = Briefing.buildWeatherRiskMsg(r);
        final GetWeatherBriefingResponse expected = new GetWeatherBriefingResponse(true, msg);
        assertThat(actual).isEqualTo(expected);
    }

    @Test
    void 동시간대_날씨특보_여러개_우선순위_확인() {
        final long memberId = 42L;
        final int nx = 60;
        final int ny = 120;
        final Farm farm = new Farm(memberId, "", "", "", "", 36.12, 127.12, nx, ny, "regionCode", null);
        when(farmRepository.findByMember_Id(memberId)).thenReturn(Optional.of(farm));

        final long jobExecutionId = 1L;
        final LocalDate fcstDate = LocalDate.now();
        final LocalDateTime from = LocalDateTime.now(java.time.ZoneId.of(com.imsnacks.Nyeoreumnagi.weather.service.Briefing.KST)).minusHours(1);
        final LocalDateTime to = LocalDateTime.now(java.time.ZoneId.of(com.imsnacks.Nyeoreumnagi.weather.service.Briefing.KST)).plusHours(2);

        final Random rand = new Random();
        long riskId = 1;
        final List<WeatherRisk> risks = new ArrayList<>();
        for (final var type : WeatherRiskType.values()) {
            WeatherRisk r = WeatherRisk.builder()
                    .weatherRiskId(riskId++)
                    .fcstDate(fcstDate)
                    .startTime(from.withMinute(rand.nextInt(60)))
                    .endTime(to.withMinute(rand.nextInt(60)))
                    .name(type)
                    .jobExecutionId(1L)
                    .build();
            risks.add(r);
        }
        given(riskRepo.findByNxAndNyWithMaxJobExecutionId(nx, ny)).willReturn(risks);

        // when
        final GetWeatherBriefingResponse actual = service.getWeatherBriefing(memberId);

        // then
        final WeatherRisk 폭우 = risks.get(risks.size() - 1);
        final String msg = Briefing.buildWeatherRiskMsg(폭우);
        final GetWeatherBriefingResponse expected = new GetWeatherBriefingResponse(true, msg);
        assertThat(actual).isEqualTo(expected);
    }

    @Test
    void 기상상황_비교자() {
        final var now = LocalDateTime.now(java.time.ZoneId.of(com.imsnacks.Nyeoreumnagi.weather.service.Briefing.KST));
        final var from = now.minusHours(2);
        final var to = now.plusHours(2);
        final WeatherRisk r1 = WeatherRisk.builder()
                .weatherRiskId(1L)
                .fcstDate(BASE.toLocalDate())
                .startTime(from.withMinute(55))
                .endTime(to.withMinute(57))
                .nx(11)
                .ny(11)
                .name(WeatherRiskType.STRONG_WIND)
                .jobExecutionId(1L)
                .build();
        final WeatherRisk r2 = WeatherRisk.builder()
                .weatherRiskId(1L)
                .fcstDate(BASE.toLocalDate())
                .startTime(from.withMinute(8))
                .endTime(to.withMinute(8))
                .nx(11)
                .ny(11)
                .name(WeatherRiskType.TORRENTIAL_RAIN)
                .jobExecutionId(1L)
                .build();
        final int actual = Briefing.RISK_COMPARATOR.compare(r1, r2);
        assertThat(actual).isEqualTo(1);
    }
}
