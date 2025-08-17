package com.imsnacks.Nyeoreumnagi.member;

import com.imsnacks.Nyeoreumnagi.member.dto.response.GetMemberAddressResponse;
import com.imsnacks.Nyeoreumnagi.member.entity.Farm;
import com.imsnacks.Nyeoreumnagi.member.exception.MemberException;
import com.imsnacks.Nyeoreumnagi.member.repository.FarmRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.util.Optional;

import static com.imsnacks.Nyeoreumnagi.member.exception.MemberResponseStatus.*;
import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;

class MemberServiceTest {

    private FarmRepository farmRepository;
    private MemberService memberService;

    @BeforeEach
    void setUp() {
        farmRepository = Mockito.mock(FarmRepository.class);
        memberService = new MemberService(farmRepository);
    }

    @Test
    @DisplayName("getMemberAddress - 성공 케이스")
    void getMemberAddress_success() {
        // given
        Long memberId = 1L;
        Farm farm = new Farm(memberId, "경기도", "성남시", "분당구", "정자1동 123-45", 36.12, 127.12, 12, 60, "regionCode", null);

        Mockito.when(farmRepository.findByMember_Id(memberId)).thenReturn(Optional.of(farm));

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
        Mockito.when(farmRepository.findByMember_Id(memberId)).thenReturn(Optional.empty());

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
        Mockito.when(farmRepository.findById(memberId)).thenReturn(Optional.empty());

        // when & then
        MemberException ex = assertThrows(MemberException.class, () ->
                memberService.getMemberAddress(memberId));
        assertThat(ex.getStatus()).isEqualTo(MEMBER_NOT_FOUND);
    }
}
