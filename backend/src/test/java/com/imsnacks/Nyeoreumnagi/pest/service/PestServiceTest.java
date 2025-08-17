package com.imsnacks.Nyeoreumnagi.pest.service;

import com.imsnacks.Nyeoreumnagi.member.entity.Farm;
import com.imsnacks.Nyeoreumnagi.member.entity.Member;
import com.imsnacks.Nyeoreumnagi.member.exception.MemberException;
import com.imsnacks.Nyeoreumnagi.member.exception.MemberResponseStatus;
import com.imsnacks.Nyeoreumnagi.member.repository.FarmRepository;
import com.imsnacks.Nyeoreumnagi.weather.repository.ShortTermWeatherForecastRepository;
import com.imsnacks.Nyeoreumnagi.work.repository.MyCropRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.mockito.junit.jupiter.MockitoSettings;
import org.mockito.quality.Strictness;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

@MockitoSettings(strictness = Strictness.LENIENT)
@ExtendWith(MockitoExtension.class)
public class PestServiceTest {
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
    void 귤() {
        // given
        long memberId = 42L;
        int nx = 60;
        int ny = 120;
        final Farm farm = new Farm(memberId, "", "", "", "", 36.12, 127.12, nx, ny, "regioncode", null);
        final Member member = new Member(memberId, "", "", "", "", null, farm);
        when(farmRepo.findByMember_Id(memberId)).thenReturn(Optional.of(farm));

    }
}
