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
import com.imsnacks.Nyeoreumnagi.work.entity.Crop;
import com.imsnacks.Nyeoreumnagi.work.entity.MyCrop;
import com.imsnacks.Nyeoreumnagi.work.repository.MyCropRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.GeometryFactory;
import org.locationtech.jts.geom.Point;
import org.locationtech.jts.geom.PrecisionModel;
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
    private MyCropRepository myCropRepo;
    @Mock
    private ShortTermWeatherForecastRepository shortTermWeatherForecastRepository;
    @Mock
    private WeatherRiskRepository riskRepo;
    @Mock
    private DashboardTodayWeatherRepository dashboardTodayWeatherRepository;
    @Mock
    private Random random;

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
