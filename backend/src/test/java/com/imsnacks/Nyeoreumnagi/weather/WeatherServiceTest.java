package com.imsnacks.Nyeoreumnagi.weather;

import com.imsnacks.Nyeoreumnagi.common.enums.WeatherCondition;
import com.imsnacks.Nyeoreumnagi.common.enums.WeatherMetric;
import com.imsnacks.Nyeoreumnagi.farm.entity.Farm;
import com.imsnacks.Nyeoreumnagi.member.exception.MemberException;
import com.imsnacks.Nyeoreumnagi.member.repository.FarmRepository;
import com.imsnacks.Nyeoreumnagi.member.repository.MemberRepository;
import com.imsnacks.Nyeoreumnagi.weather.dto.response.*;
import com.imsnacks.Nyeoreumnagi.weather.entity.DashboardWeatherForecast;
import com.imsnacks.Nyeoreumnagi.weather.entity.ShortTermWeatherForecast;
import com.imsnacks.Nyeoreumnagi.weather.exception.WeatherException;
import com.imsnacks.Nyeoreumnagi.weather.repository.DashboardTodayWeatherRepository;
import com.imsnacks.Nyeoreumnagi.weather.repository.DashboardWeatherForecastRepository;
import com.imsnacks.Nyeoreumnagi.weather.repository.ShortTermWeatherForecastRepository;
import com.imsnacks.Nyeoreumnagi.weather.repository.WeatherRiskRepository;
import com.imsnacks.Nyeoreumnagi.weather.service.WeatherService;
import com.imsnacks.Nyeoreumnagi.weather.service.projection_entity.HumidityInfo;
import com.imsnacks.Nyeoreumnagi.weather.service.projection_entity.PrecipitationInfo;
import com.imsnacks.Nyeoreumnagi.weather.service.projection_entity.SunriseSunSetTime;
import com.imsnacks.Nyeoreumnagi.weather.service.projection_entity.WindInfo;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.mockito.junit.jupiter.MockitoSettings;
import org.mockito.quality.Strictness;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.IntStream;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.assertj.core.api.AssertionsForClassTypes.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

@MockitoSettings(strictness = Strictness.LENIENT)
@ExtendWith(MockitoExtension.class)
class WeatherServiceTest {
    private static final LocalDateTime BASE = LocalDateTime.of(2025, 8, 5, 0, 0);

    @InjectMocks
    private WeatherService weatherService;
    @Mock
    private MemberRepository memberRepository;
    @Mock
    private FarmRepository farmRepository;
    @Mock
    private ShortTermWeatherForecastRepository shortTermWeatherForecastRepository;
    @Mock
    private WeatherRiskRepository weatherRiskRepository;
    @Mock
    private DashboardTodayWeatherRepository dashboardTodayWeatherRepository;
    @Mock
    private DashboardWeatherForecastRepository dashboardWeatherForecastRepository;

    @Test
    void getWeatherGraph_성공() {
        // given
        Long memberId = 1L;
        WeatherMetric metric = WeatherMetric.TEMPERATURE;

        Farm farm = new Farm(1L, "", "", "", "", 36.12, 127.12, 60, 120, "regionCode", null);

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

        given(farmRepository.findByMember_Id(memberId)).willReturn(Optional.of(farm));
        given(shortTermWeatherForecastRepository.findAllByNxAndNy(60, 120)).willReturn(forecasts);

        // when
        GetWeatherGraphResponse response = weatherService.getWeatherGraph(memberId, metric);

        // then
        assertThat(response.weatherMetric()).isEqualTo(metric);
        assertThat(response.max()).isGreaterThan(response.min());
        assertThat(response.valuePerTime().size()).isEqualTo(24);
    }

//    @Test
//    void 기상_특보_겹침_우선순위대로_반환_성공() {
//        //given
//        long memberId = 1L;
//        Farm farm = new Farm(1L, "", "", "", "", 36.12, 127.12, 60, 120, null);
//        Member member = new Member(1L, "", "", "", "", null, farm);
//
//        LocalDateTime startA = BASE.withHour(1);
//        LocalDateTime endA = BASE.withHour(6);
//        WeatherRisk riskA = WeatherRisk.builder()
//                .weatherRiskId(10L)
//                .fcstDate(LocalDate.now())
//                .startTime(startA)
//                .endTime(endA)
//                .name(WeatherRiskType.RAIN) // ordinal 1
//                .nx(60).ny(120).jobExecutionId(77L)
//                .build();
//
//        LocalDateTime startB = BASE.withHour(3);
//        LocalDateTime endB = BASE.withHour(8);
//        WeatherRisk riskB = WeatherRisk.builder()
//                .weatherRiskId(11L)
//                .fcstDate(LocalDate.now())
//                .startTime(startB)
//                .endTime(endB)
//                .name(WeatherRiskType.FROST) // ordinal 2
//                .nx(60).ny(120).jobExecutionId(77L)
//                .build();
//
//        LocalDateTime startC = BASE.withHour(5);
//        LocalDateTime endC = BASE.withHour(7);
//        WeatherRisk riskC = WeatherRisk.builder()
//                .weatherRiskId(12L)
//                .fcstDate(LocalDate.now())
//                .startTime(startC)
//                .endTime(endC)
//                .name(WeatherRiskType.ABNORMAL_HEAT) // ordinal 3 가장 높음!
//                .nx(60).ny(120).jobExecutionId(77L)
//                .build();
//
//        when(memberRepository.findById(memberId)).thenReturn(Optional.of(member));
//        when(weatherRiskRepository.findByNxAndNyWithMaxJobExecutionId(60, 120))
//                .thenReturn(Arrays.asList(riskA, riskB, riskC));
//
//        //when
//        GetFcstRiskResponse response = weatherService.getWeatherRisk(memberId);
//        List<GetFcstRiskResponse.WeatherRiskDto> risks = response.items();
//
//        //then
//        assertThat(risks.size()).isEqualTo(4);
//        assertThat(risks.get(0).category()).isEqualTo(WeatherRiskType.RAIN.getDescription());
//        assertThat(risks.get(0).startTime()).isEqualTo("1");
//        assertThat(risks.get(0).endTime()).isEqualTo("3");
//
//        assertThat(risks.get(1).category()).isEqualTo(WeatherRiskType.FROST.getDescription());
//        assertThat(risks.get(1).startTime()).isEqualTo("3");
//        assertThat(risks.get(1).endTime()).isEqualTo("5");
//
//        assertThat(risks.get(2).category()).isEqualTo(WeatherRiskType.ABNORMAL_HEAT.getDescription());
//        assertThat(risks.get(2).startTime()).isEqualTo("5");
//        assertThat(risks.get(2).endTime()).isEqualTo("7");
//
//        assertThat(risks.get(3).category()).isEqualTo(WeatherRiskType.FROST.getDescription());
//        assertThat(risks.get(3).startTime()).isEqualTo("7");
//        assertThat(risks.get(3).endTime()).isEqualTo("8");
//    }

    void 정상_날씨_조회_성공() {
        // given
        long memberId = 1L;
        Farm farm = new Farm(1L, "", "", "", "", 36.12, 127.12, 60, 120, "regionCode", null);

        ShortTermWeatherForecast forecast = mock(ShortTermWeatherForecast.class);
        SunriseSunSetTime sunriseSunSetTime = mock(SunriseSunSetTime.class);

        when(forecast.getFcstTime()).thenReturn(LocalDateTime.now().getHour());
        when(forecast.getWeatherCondition(sunriseSunSetTime)).thenReturn(WeatherCondition.SUNNY);
        when(forecast.getTemperature()).thenReturn(23);
        when(farmRepository.findByMember_Id(memberId)).thenReturn(Optional.of(farm));
        when(shortTermWeatherForecastRepository.findAllByNxAndNy(60, 120)).thenReturn(List.of(forecast));
        when(dashboardTodayWeatherRepository.findSunRiseSetByNxAndNy(60, 120)).thenReturn(Optional.ofNullable(sunriseSunSetTime));

        // when
        GetWeatherConditionResponse response = weatherService.getWeatherCondition(memberId);

        // then
        assertThat(response.weatherCondition()).isEqualTo(WeatherCondition.SUNNY.toString());
        assertThat(response.weatherKeyword()).isEqualTo(WeatherCondition.SUNNY.getKeyword());
        assertThat(response.temperature()).isEqualTo(23);
    }

    @Test
    void 일출몰_시각_조회_성공() {
        Long memberId = 1L;

        // given: member, farm, sunrise/sunset mock
        Farm farm = new Farm(1L, "", "", "", "", 36.12, 127.12, 60, 120, "regionCode", null);

        SunriseSunSetTime sunriseSunSetTime = mock(SunriseSunSetTime.class);
        when(sunriseSunSetTime.getSunriseTime()).thenReturn(LocalTime.of(5, 40));
        when(sunriseSunSetTime.getSunSetTime()).thenReturn(LocalTime.of(19, 22));

        when(farmRepository.findByMember_Id(memberId)).thenReturn(Optional.of(farm));
        when(dashboardTodayWeatherRepository.findSunRiseSetByNxAndNy(60, 120)).thenReturn(Optional.of(sunriseSunSetTime));

        // when
        GetSunRiseSetTimeResponse response = weatherService.getSunRiseSetTime(memberId);

        // then
        assertThat(response.startTime()).isEqualTo("05:40");
        assertThat(response.endTime()).isEqualTo("19:22");
    }

    @Test
    void 존재하지_않는_회원_예외() {
        // given
        Long invalidId = 999L;
        when(farmRepository.findByMember_Id(invalidId)).thenReturn(Optional.empty());

        // when & then
        assertThatThrownBy(() -> weatherService.getWeatherCondition(invalidId))
                .isInstanceOf(MemberException.class);
    }

    @Test
    void 농장정보_없음_예외() {
        // given
        when(farmRepository.findByMember_Id(any())).thenReturn(Optional.empty());

        // when & then
        assertThatThrownBy(() -> weatherService.getWeatherCondition(1L))
                .isInstanceOf(MemberException.class);
    }

    @Test
    void 날씨정보_없음_예외() {
        // given
        Farm farm = new Farm(1L, "", "", "", "", 36.12, 127.12, 60, 120, "regionCode", null);

        when(farmRepository.findByMember_Id(any())).thenReturn(Optional.of(farm));
        when(shortTermWeatherForecastRepository.findAllByNxAndNy(anyInt(), anyInt()))
                .thenReturn(List.of());

        // when & then
        assertThatThrownBy(() -> weatherService.getWeatherCondition(1L))
                .isInstanceOf(WeatherException.class);
    }

    @Test
    void 일일_최대_풍속_풍향_정상응답_성공() {
        // given
        Long memberId = 1L;
        int nx = 60, ny = 127;
        Farm farm = mock(Farm.class);
        when(farm.getNx()).thenReturn(nx);
        when(farm.getNy()).thenReturn(ny);
        when(farmRepository.findByMember_Id(memberId)).thenReturn(Optional.of(farm));

        WindInfo windInfo = mock(WindInfo.class);
        when(windInfo.getMaxWindSpeed()).thenReturn(12);
        when(windInfo.getWindDirection()).thenReturn(45); // 45도면 NE(북동풍)

        when(dashboardTodayWeatherRepository.findWindByNxAndNy(nx, ny)).thenReturn(Optional.of(windInfo));

        // when
        GetWindInfoResponse response = weatherService.getWindInfo(memberId);

        // then
        assertThat(response.direction()).isEqualTo("북동풍");
        assertThat(response.degree()).isEqualTo(45);
        assertThat(response.speed()).isEqualTo(12);
    }

    @Test
    void 농장이_없을때_예외() {
        // given
        Long memberId = 2L;
        when(farmRepository.findByMember_Id(memberId)).thenReturn(Optional.empty());

        // when & then
        assertThatThrownBy(() -> weatherService.getWindInfo(memberId))
                .isInstanceOf(MemberException.class);
    }

    @Test
    void 풍속_풍향_정보_없을_때_예외() {
        // given
        Long memberId = 1L;
        int nx = 11, ny = 22;
        Farm farm = mock(Farm.class);
        when(farm.getNx()).thenReturn(nx);
        when(farm.getNy()).thenReturn(ny);
        when(farmRepository.findByMember_Id(memberId)).thenReturn(Optional.of(farm));
        when(dashboardTodayWeatherRepository.findWindByNxAndNy(nx, ny)).thenReturn(Optional.empty());

        // when & then
        assertThatThrownBy(() -> weatherService.getWindInfo(memberId))
                .isInstanceOf(WeatherException.class);
    }

    @Test
    void 일일_최고_습도_조회_성공() {
        // given
        Long memberId = 123L;
        int nx = 55, ny = 99;
        Farm farm = mock(Farm.class);
        when(farm.getNx()).thenReturn(nx);
        when(farm.getNy()).thenReturn(ny);
        when(farmRepository.findByMember_Id(memberId)).thenReturn(Optional.of(farm));

        HumidityInfo humidityInfo = mock(HumidityInfo.class);
        when(humidityInfo.getMaxHumidity()).thenReturn(84);

        when(dashboardTodayWeatherRepository.findHumidityByNxAndNy(nx, ny)).thenReturn(Optional.of(humidityInfo));

        // when
        GetHumidityResponse response = weatherService.getHumidity(memberId);

        // then
        assertThat(response.value()).isEqualTo(84);
    }

    @Test
    void 일일_최고_강수량_조회_성공() {
        // given
        Long memberId = 123L;
        int nx = 55, ny = 99;
        Farm farm = mock(Farm.class);
        when(farm.getNx()).thenReturn(nx);
        when(farm.getNy()).thenReturn(ny);
        when(farmRepository.findByMember_Id(memberId)).thenReturn(Optional.of(farm));

        PrecipitationInfo precipitationInfo = mock(PrecipitationInfo.class);
        when(precipitationInfo.getMaxPrecipitation()).thenReturn(12);

        when(dashboardTodayWeatherRepository.findPrecipitationByNxAndNy(nx, ny)).thenReturn(Optional.of(precipitationInfo));

        // when
        GetDailyMaxPrecipitationResponse response = weatherService.getDailyMaxPrecipitation(memberId);

        // then
        assertThat(response.value()).isEqualTo(12);
    }

    @Test
    void 시간별_기온_조회_성공() {
        //given
        Long memberId = 1L;
        Farm fakeFarm = mock(Farm.class);
        when(fakeFarm.getNx()).thenReturn(60);
        when(fakeFarm.getNy()).thenReturn(127);

        when(farmRepository.findByMember_Id(memberId)).thenReturn(Optional.of(fakeFarm));

        List<DashboardWeatherForecast> forecasts = new ArrayList<>();
        int[] times = {1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23};
        int[] temps = {1,14,1,1,15,1,1,16,1,1,17,1,1,12,1,1,18,1,1,11,1,1,13};

        for (int i=0; i<23; ++i) {
            DashboardWeatherForecast f = mock(DashboardWeatherForecast.class);
            when(f.getFcstTime()).thenReturn(times[i]);
            when(f.getTemperature()).thenReturn(temps[i]);
            when(f.getWeatherCondition()).thenReturn(WeatherCondition.SUNNY);
            forecasts.add(f);
        }

        when(dashboardWeatherForecastRepository.findByNxAndNy(60,127))
                .thenReturn(forecasts);

        //when
        GetTemperatureResponse response = weatherService.getTemperature(memberId);

        //then
        assertThat(response.maxTemperature()).isEqualTo(18);
        assertThat(response.minTemperature()).isEqualTo(11);
        assertThat(response.temperaturePerTime().stream().map(GetTemperatureResponse.TemperaturePerTime::time).toList())
                .isEqualTo(List.of("02:00","05:00","08:00","11:00","14:00","17:00","20:00","23:00"));
        assertThat(response.temperaturePerTime().stream().map(GetTemperatureResponse.TemperaturePerTime::value).toList())
                .isEqualTo(List.of(14,15,16,17,12,18,11,13));
    }

    @Test
    void 시간별_기온_조회시_3시간_간격에_해당하는_시간이_없을_때_예외처리() {
        //given
        Long memberId = 1L;
        Farm fakeFarm = mock(Farm.class);
        when(fakeFarm.getNx()).thenReturn(60);
        when(fakeFarm.getNy()).thenReturn(127);

        when(farmRepository.findByMember_Id(memberId)).thenReturn(Optional.of(fakeFarm));

        List<DashboardWeatherForecast> forecasts = new ArrayList<>();
        int[] times = {1,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23};
        int[] temps = {1,1,1,15,1,1,16,1,1,17,1,1,12,1,1,18,1,1,11,1,1,13};

        for (int i=0; i<22; ++i) {
            DashboardWeatherForecast f = mock(DashboardWeatherForecast.class);
            when(f.getFcstTime()).thenReturn(times[i]);
            when(f.getTemperature()).thenReturn(temps[i]);
            when(f.getWeatherCondition()).thenReturn(WeatherCondition.SUNNY);
            forecasts.add(f);
        }

        when(dashboardWeatherForecastRepository.findByNxAndNy(60,127))
                .thenReturn(forecasts);

        //when
        //then
        assertThatThrownBy(() -> weatherService.getTemperature(memberId))
                .isInstanceOf(WeatherException.class);
    }
}
