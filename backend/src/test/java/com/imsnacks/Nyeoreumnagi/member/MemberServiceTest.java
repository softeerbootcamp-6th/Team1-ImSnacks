package com.imsnacks.Nyeoreumnagi.member;

import com.imsnacks.Nyeoreumnagi.farm.service.FarmService;
import com.imsnacks.Nyeoreumnagi.lifecycle.LifeCycleResolver;
import com.imsnacks.Nyeoreumnagi.lifecycle.repository.LifeCycleRepository;
import com.imsnacks.Nyeoreumnagi.member.dto.response.GetMemberAddressResponse;
import com.imsnacks.Nyeoreumnagi.farm.entity.Farm;
import com.imsnacks.Nyeoreumnagi.member.dto.response.GetMyCropsResponse;
import com.imsnacks.Nyeoreumnagi.member.exception.MemberException;
import com.imsnacks.Nyeoreumnagi.member.repository.FarmRepository;
import com.imsnacks.Nyeoreumnagi.member.repository.MemberRepository;
import com.imsnacks.Nyeoreumnagi.work.entity.Crop;
import com.imsnacks.Nyeoreumnagi.work.entity.MyCrop;
import com.imsnacks.Nyeoreumnagi.work.repository.MyCropRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.GeometryFactory;
import org.locationtech.jts.geom.Point;
import org.locationtech.jts.geom.PrecisionModel;
import org.mockito.Mockito;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static com.imsnacks.Nyeoreumnagi.member.exception.MemberResponseStatus.*;
import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class MemberServiceTest {

    private FarmRepository farmRepository;
    private LifeCycleRepository lifeCycleRepository;
    private MyCropRepository myCropRepository;
    private MemberService memberService;
    private LifeCycleResolver lifeCycleResolver;
    private FarmService farmService;
    private MemberRepository memberRepository;

    @BeforeEach
    void setUp() {
        farmRepository = mock(FarmRepository.class);
        lifeCycleRepository  = mock(LifeCycleRepository.class);
        myCropRepository = mock(MyCropRepository.class);
        lifeCycleResolver = mock(LifeCycleResolver.class);
        farmRepository = Mockito.mock(FarmRepository.class);
        farmService = Mockito.mock(FarmService.class);
        memberRepository = Mockito.mock(MemberRepository.class);

        memberService = new MemberService(farmRepository, myCropRepository, lifeCycleRepository, memberRepository, farmService, lifeCycleResolver);
    }
    @Test
    @DisplayName("getMemberAddress - 성공 케이스")
    void getMemberAddress_success() {
        // given
        Long memberId = 1L;
        GeometryFactory geometryFactory = new GeometryFactory(new PrecisionModel(), 4326); // SRID 4326
        Point point = geometryFactory.createPoint(new Coordinate(127.12, 36.12));
        final Farm farm = new Farm(memberId, "경기도", "성남시", "분당구", "정자1동 123-45", point, 12, 60, "regioncode", null);

        when(farmRepository.findByMember_Id(memberId)).thenReturn(Optional.of(farm));

        // when
        GetMemberAddressResponse response = memberService.getMemberAddress(memberId);

        // then
        assertThat(response.address()).isEqualTo("경기도 성남시 분당구 정자1동 123-45");
    }

    @Test
    @DisplayName("getMemberAddress - 없는 멤버 ID 예외 발생")
    void getMemberAddress_invalidMemberId() {
        // given
        Long memberId = 100L;
        when(farmRepository.findByMember_Id(memberId)).thenReturn(Optional.empty());

        // when & then
        MemberException ex = assertThrows(MemberException.class, () ->
                memberService.getMemberAddress(memberId));
        assertThat(ex.getStatus()).isEqualTo(MEMBER_NOT_FOUND);
    }

    @Test
    @DisplayName("getMemberAddress - 멤버에 농장 정보가 없음")
    void getMemberAddress_noFarmInfo() {
        // given
        Long memberId = 2L;
        when(farmRepository.findById(memberId)).thenReturn(Optional.empty());

        // when & then
        MemberException ex = assertThrows(MemberException.class, () ->
                memberService.getMemberAddress(memberId));
        assertThat(ex.getStatus()).isEqualTo(MEMBER_NOT_FOUND);
    }

//    @Test
//    void 내_작물_리스트와_현재_LifeCycle_정상_조회() {
//        // Given
//        Long memberId = 1L;
//
//        Crop crop = mock(Crop.class);
//        when(crop.getId()).thenReturn(10L);
//        when(crop.getName()).thenReturn("포도");
//
//        LocalDateTime germinationTime = LocalDateTime.now().minusDays(80);
//
//        MyCrop myCrop = mock(MyCrop.class);
//        when(myCrop.getId()).thenReturn(100L);
//        when(myCrop.getCrop()).thenReturn(crop);
//        when(myCrop.getGerminationTime()).thenReturn(germinationTime);
//
//        List<MyCrop> myCrops = List.of(myCrop);
//
//        when(myCropRepository.findAllByMember_Id(memberId)).thenReturn(myCrops);
//
//        LifeCycle lc1 = mock(LifeCycle.class);
//        when(lc1.getDuration()).thenReturn(30);
//        when(lc1.getName()).thenReturn("발아");
//
//        LifeCycle lc2 = mock(LifeCycle.class);
//        when(lc2.getDuration()).thenReturn(40);
//        when(lc2.getName()).thenReturn("성장");
//
//        LifeCycle lc3 = mock(LifeCycle.class);
//        when(lc3.getDuration()).thenReturn(50);
//        when(lc3.getName()).thenReturn("수확");
//
//        List<LifeCycle> lifeCycles = List.of(lc1, lc2, lc3);
//
//        when(lifeCycleRepository.findAllByCrop_IdOrderByStep(crop.getId()))
//                .thenReturn(lifeCycles);
//        when(myCrop.getDaysFromStartDate(any())).thenCallRealMethod();
//        when(myCrop.findCurrentLifeCycle(anyList(), any())).thenCallRealMethod();
//
//        // When
//        List<GetMyCropsResponse> result = memberService.getMyCrops(memberId);
//
//        // Then
//        assertThat(result).hasSize(1);
//        GetMyCropsResponse dto = result.get(0);
//        assertThat(dto.myCropId()).isEqualTo(100L);
//        assertThat(dto.myCropName()).isEqualTo("포도");
//        assertThat(dto.daysFromStartDate()).isEqualTo(80);
//        assertThat(dto.lifeCycle()).isEqualTo("수확");
//    }

    @Test
    void 라이프사이클_없으면_null_정상처리() {
        Long memberId = 2L;
        MyCrop myCrop = mock(MyCrop.class);
        Crop crop = mock(Crop.class);
        when(myCrop.getId()).thenReturn(101L);
        when(myCrop.getCrop()).thenReturn(crop);
        when(myCrop.getGerminationTime()).thenReturn(LocalDateTime.now());

        when(myCropRepository.findAllByMember_Id(memberId))
                .thenReturn(List.of(myCrop));
        when(lifeCycleRepository.findAllByCrop_IdOrderByStep(any()))
                .thenReturn(Collections.emptyList());

        when(myCrop.getDaysFromStartDate(any())).thenCallRealMethod();

        // When
        List<GetMyCropsResponse> response = memberService.getMyCrops(memberId);

        // Then
        assertThat(response).hasSize(1);
        assertThat(response.get(0).lifeCycle()).isNull();
    }
}
