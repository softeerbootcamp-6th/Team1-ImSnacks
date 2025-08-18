package com.imsnacks.Nyeoreumnagi.pest.service;

import com.imsnacks.Nyeoreumnagi.member.entity.Farm;
import com.imsnacks.Nyeoreumnagi.member.entity.Member;
import com.imsnacks.Nyeoreumnagi.member.exception.MemberException;
import com.imsnacks.Nyeoreumnagi.member.exception.MemberResponseStatus;
import com.imsnacks.Nyeoreumnagi.member.repository.FarmRepository;
import com.imsnacks.Nyeoreumnagi.pest.dto.response.GetPestCardListResponse;
import com.imsnacks.Nyeoreumnagi.pest.entity.PestCondition;
import com.imsnacks.Nyeoreumnagi.pest.service.WeatherConditionCode.HumidityLevel;
import com.imsnacks.Nyeoreumnagi.pest.service.WeatherConditionCode.RainLevel;
import com.imsnacks.Nyeoreumnagi.pest.service.WeatherConditionCode.TemperatureLevel;
import com.imsnacks.Nyeoreumnagi.pest.entity.PestRisk;
import com.imsnacks.Nyeoreumnagi.weather.entity.ShortTermWeatherForecast;
import com.imsnacks.Nyeoreumnagi.weather.repository.ShortTermWeatherForecastRepository;
import com.imsnacks.Nyeoreumnagi.work.entity.Crop;
import com.imsnacks.Nyeoreumnagi.work.entity.MyCrop;
import com.imsnacks.Nyeoreumnagi.work.repository.MyCropRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.mockito.junit.jupiter.MockitoSettings;
import org.mockito.quality.Strictness;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.time.LocalDateTime;
import java.time.Month;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

@MockitoSettings(strictness = Strictness.LENIENT)
@ExtendWith(MockitoExtension.class)
public class PestServiceTest {
    private final int 저온 = WeatherConditionCode.TemperatureLevel.LevelBoundary.LOW_TO_MID.getThresholdValue() - 1;
    private final int 보통기온 = WeatherConditionCode.TemperatureLevel.LevelBoundary.LOW_TO_MID.getThresholdValue();
    private final int 고온 = WeatherConditionCode.TemperatureLevel.LevelBoundary.MID_TO_HIGH.getThresholdValue();

    private final int 건조 = WeatherConditionCode.HumidityLevel.LevelBoundary.LOW_TO_MID.getThresholdValue() - 1;
    private final int 보통습도 = WeatherConditionCode.HumidityLevel.LevelBoundary.LOW_TO_MID.getThresholdValue();
    private final int 다습 = WeatherConditionCode.HumidityLevel.LevelBoundary.MID_TO_HIGH.getThresholdValue();

    private final double 비없음 = WeatherConditionCode.RainLevel.LevelBoundary.RAIN.getThresholdValue() - 0.42;
    private final double 비있음 = WeatherConditionCode.RainLevel.LevelBoundary.RAIN.getThresholdValue() + 0.42;

    @InjectMocks
    private PestService pestService;

    @Mock
    private FarmRepository farmRepo;

    @Mock
    private ShortTermWeatherForecastRepository fcstRepo;

    @Mock
    private MyCropRepository myCropRepo;

    @Test
    void 멤버가_없는_경우_예외를_던진다() {
        final long wrongMemberId = 42L;
        when(farmRepo.findByMember_Id(wrongMemberId)).thenReturn(Optional.empty());
        try {
            pestService.getPestCardList(wrongMemberId, null);
        } catch (MemberException e) {
            assertThat(e.getStatus()).isEqualTo(MemberResponseStatus.NO_FARM_INFO);
        }
    }

    @Test
    void 농장이_없는_경우_예외를_던진다() {
        final long memberId = 42L;
        final Member member = new Member(memberId, "", "", "", "", null, null);
        when(farmRepo.findByMember_Id(memberId)).thenReturn(Optional.empty());
        try {
            pestService.getPestCardList(memberId, null);
        } catch(MemberException e) {
            assertThat(e.getStatus()).isEqualTo(MemberResponseStatus.NO_FARM_INFO);
        }
    }

    @Test
    void 귤과_귤응애() {
        // given
        long memberId = 42L;
        int nx = 60;
        int ny = 120;
        final Farm farm = new Farm(memberId, "", "", "", "", 36.12, 127.12, nx, ny, "regioncode", null);
        final Member member = new Member(memberId, "", "", "", "", null, farm);
        when(farmRepo.findByMember_Id(memberId)).thenReturn(Optional.of(farm));

        // 발생 조건 만들기
        WeatherConditionCode wc1 = new WeatherConditionCode(HumidityLevel.LOW, TemperatureLevel.MID, RainLevel.NONE);

        // 작물
        Long myCropId = 42L;
        Crop 귤 = new Crop(42L, "귤", new ArrayList<>());
        MyCrop 마이귤 = new MyCrop(myCropId, 귤, member, LocalDateTime.now());
        when(myCropRepo.findAllByMember_IdOrderById(memberId)).thenReturn(List.of(마이귤));
        when(myCropRepo.findAllByMember_IdOrderByCrop_Id(memberId)).thenReturn(List.of(마이귤));
        when(myCropRepo.findById(42L)).thenReturn(Optional.of(마이귤));

        // 날씨
        ShortTermWeatherForecast fcst1 = ShortTermWeatherForecast.builder()
                .humidity(건조)
                .temperature(보통기온)
                .precipitation(비없음)
                .build();
        when(fcstRepo.findAllByNxAndNy(nx, ny)).thenReturn(List.of(fcst1));

        PestRisk 귤응애 = new PestRisk(
                42L,
                "귤응애",
                "잎과 과실을 흡즙해 엽록소가 파괴되어 표면에 흰색 반점이 생깁니다.",
                new ArrayList<>(),
                귤
        );
        PestCondition cond1 = PestCondition.builder()
                .pestConditionId(42L)
                .pestRisk(귤응애)
                .startMonth(Month.JULY)
                .startMonthPhase(PestCondition.MonthPhase.EARLY)
                .endMonth(Month.AUGUST)
                .endMonthPhase(PestCondition.MonthPhase.MID)
                .humidityLevel(HumidityLevel.LOW)
                .temperatureLevel(TemperatureLevel.MID)
                .rainLevel(RainLevel.DONT_CARE)
                .build();
        귤응애.addCondition(cond1);
        귤.addPestRisk(귤응애);

        // expected
        var pestCards = List.of(귤응애.toCard());
        //var cropCards = List.of(new GetPestCardListResponse.MyCropCard(마이귤.getId(), 마이귤.getCrop().getName()));
        var cropCards = new ArrayList<GetPestCardListResponse.MyCropCard>();
        var expected = new GetPestCardListResponse(pestCards, cropCards);

        // actual
        var actual = pestService.getPestCardList(memberId, myCropId);
        assertThat(actual).isEqualTo(expected);
    }

    @Test
    void 귤과_귤응애_when_myCropId_is_null() {
        // given
        long memberId = 42L;
        int nx = 60;
        int ny = 120;
        final Farm farm = new Farm(memberId, "", "", "", "", 36.12, 127.12, nx, ny, "regioncode", null);
        final Member member = new Member(memberId, "", "", "", "", null, farm);
        when(farmRepo.findByMember_Id(memberId)).thenReturn(Optional.of(farm));

        // 발생 조건 만들기
        WeatherConditionCode wc1 = new WeatherConditionCode(HumidityLevel.LOW, TemperatureLevel.MID, RainLevel.NONE);

        // 작물
        Long myCropId = 42L;
        Crop 귤 = new Crop(42L, "귤", new ArrayList<>());
        MyCrop 마이귤 = new MyCrop(myCropId, 귤, member, LocalDateTime.now());
        when(myCropRepo.findAllByMember_IdOrderById(memberId)).thenReturn(List.of(마이귤));
        when(myCropRepo.findAllByMember_IdOrderByCrop_Id(memberId)).thenReturn(List.of(마이귤));
        when(myCropRepo.findById(42L)).thenReturn(Optional.of(마이귤));

        // 날씨
        ShortTermWeatherForecast fcst1 = ShortTermWeatherForecast.builder()
                .humidity(건조)
                .temperature(보통기온)
                .precipitation(비없음)
                .build();
        when(fcstRepo.findAllByNxAndNy(nx, ny)).thenReturn(List.of(fcst1));

        PestRisk 귤응애 = new PestRisk(
                42L,
                "귤응애",
                "잎과 과실을 흡즙해 엽록소가 파괴되어 표면에 흰색 반점이 생깁니다.",
                new ArrayList<>(),
                귤
        );
        PestCondition cond1 = PestCondition.builder()
                .pestConditionId(42L)
                .pestRisk(귤응애)
                .startMonth(Month.JULY)
                .startMonthPhase(PestCondition.MonthPhase.EARLY)
                .endMonth(Month.AUGUST)
                .endMonthPhase(PestCondition.MonthPhase.MID)
                .humidityLevel(HumidityLevel.LOW)
                .temperatureLevel(TemperatureLevel.MID)
                .rainLevel(RainLevel.DONT_CARE)
                .build();
        귤응애.addCondition(cond1);
        귤.addPestRisk(귤응애);

        // expected
        var pestCards = List.of(귤응애.toCard());
        var cropCards = List.of(new GetPestCardListResponse.MyCropCard(마이귤.getId(), 마이귤.getCrop().getName()));
//        var cropCards = new ArrayList<GetPestCardListResponse.MyCropCard>();
        var expected = new GetPestCardListResponse(pestCards, cropCards);

        // actual
        var actual = pestService.getPestCardList(memberId, null);
        assertThat(actual).isEqualTo(expected);
    }

    @Test
    void 귤과_귤응애_when_no_condition_met() {
        // given
        long memberId = 42L;
        int nx = 60;
        int ny = 120;
        final Farm farm = new Farm(memberId, "", "", "", "", 36.12, 127.12, nx, ny, "regioncode", null);
        final Member member = new Member(memberId, "", "", "", "", null, farm);
        when(farmRepo.findByMember_Id(memberId)).thenReturn(Optional.of(farm));

        // 발생 조건 만들기
        WeatherConditionCode wc1 = new WeatherConditionCode(HumidityLevel.LOW, TemperatureLevel.MID, RainLevel.NONE);

        // 작물
        Long myCropId = 42L;
        Crop 귤 = new Crop(42L, "귤", new ArrayList<>());
        MyCrop 마이귤 = new MyCrop(myCropId, 귤, member, LocalDateTime.now());
        when(myCropRepo.findAllByMember_IdOrderById(memberId)).thenReturn(List.of(마이귤));
        when(myCropRepo.findAllByMember_IdOrderByCrop_Id(memberId)).thenReturn(List.of(마이귤));
        when(myCropRepo.findById(42L)).thenReturn(Optional.of(마이귤));

        // 날씨
        ShortTermWeatherForecast fcst1 = ShortTermWeatherForecast.builder()
                .humidity(건조)
                .temperature(고온)
                .precipitation(비없음)
                .build();
        when(fcstRepo.findAllByNxAndNy(nx, ny)).thenReturn(List.of(fcst1));

        PestRisk 귤응애 = new PestRisk(
                42L,
                "귤응애",
                "잎과 과실을 흡즙해 엽록소가 파괴되어 표면에 흰색 반점이 생깁니다.",
                new ArrayList<>(),
                귤
        );
        PestCondition cond1 = PestCondition.builder()
                .pestConditionId(42L)
                .pestRisk(귤응애)
                .startMonth(Month.JULY)
                .startMonthPhase(PestCondition.MonthPhase.EARLY)
                .endMonth(Month.AUGUST)
                .endMonthPhase(PestCondition.MonthPhase.MID)
                .humidityLevel(HumidityLevel.LOW)
                .temperatureLevel(TemperatureLevel.MID)
                .rainLevel(RainLevel.DONT_CARE)
                .build();
        귤응애.addCondition(cond1);
        귤.addPestRisk(귤응애);

        // expected
        var pestCards = List.of(귤응애.toCard());
        //var cropCards = List.of(new GetPestCardListResponse.MyCropCard(마이귤.getId(), 마이귤.getCrop().getName()));
        var cropCards = new ArrayList<GetPestCardListResponse.MyCropCard>();
        var expected = new GetPestCardListResponse(pestCards, cropCards);

        // actual
        var actual = pestService.getPestCardList(memberId, myCropId);
        assertThat(actual).isEqualTo(expected);
    }
}
