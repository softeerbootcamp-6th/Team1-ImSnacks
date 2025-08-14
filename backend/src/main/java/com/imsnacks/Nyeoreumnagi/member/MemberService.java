package com.imsnacks.Nyeoreumnagi.member;

import com.imsnacks.Nyeoreumnagi.member.dto.response.GetMemberAddressResponse;
import com.imsnacks.Nyeoreumnagi.member.entity.Farm;
import com.imsnacks.Nyeoreumnagi.member.entity.Member;
import com.imsnacks.Nyeoreumnagi.member.exception.MemberException;
import com.imsnacks.Nyeoreumnagi.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import static com.imsnacks.Nyeoreumnagi.member.exception.MemberResponseStatus.INVALID_MEMBER_ID;
import static com.imsnacks.Nyeoreumnagi.member.exception.MemberResponseStatus.NO_FARM_INFO;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;

    public GetMemberAddressResponse getMemberAddress(Long memberId){
        Member member = memberRepository.findById(memberId).orElseThrow(() -> new MemberException(INVALID_MEMBER_ID));
        Farm farm = member.getFarm();

        if (farm == null) {
            throw new MemberException(NO_FARM_INFO);
        }
        return new GetMemberAddressResponse(farm.getState(), farm.getCity(), farm.getTown(), farm.getAddress());
    }
}
