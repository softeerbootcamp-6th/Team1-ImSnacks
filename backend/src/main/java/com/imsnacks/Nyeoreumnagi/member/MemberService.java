package com.imsnacks.Nyeoreumnagi.member;

import com.imsnacks.Nyeoreumnagi.farm.service.FarmService;
import com.imsnacks.Nyeoreumnagi.member.dto.SignupRequest;
import com.imsnacks.Nyeoreumnagi.member.dto.response.GetMemberAddressResponse;
import com.imsnacks.Nyeoreumnagi.farm.entity.Farm;
import com.imsnacks.Nyeoreumnagi.member.entity.Member;
import com.imsnacks.Nyeoreumnagi.member.exception.MemberException;
import com.imsnacks.Nyeoreumnagi.member.repository.FarmRepository;
import com.imsnacks.Nyeoreumnagi.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static com.imsnacks.Nyeoreumnagi.member.dto.SignupRequest.*;
import static com.imsnacks.Nyeoreumnagi.member.exception.MemberResponseStatus.MEMBER_NOT_FOUND;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MemberService {

    private final FarmRepository farmRepository;
    private final MemberRepository memberRepository;
    private final FarmService farmService;

    public GetMemberAddressResponse getMemberAddress(Long memberId){
        Farm farm = farmRepository.findByMember_Id(memberId).orElseThrow(() -> new MemberException(MEMBER_NOT_FOUND));
        return new GetMemberAddressResponse(farm.getState(), farm.getCity(), farm.getTown(), farm.getAddress());
    }

    @Transactional
    public void registerMember(SignupRequest request){
        RegisterMemberRequest memberRequest = request.member();
        Member member = Member.createMember(
                memberRequest.identifier(),
                memberRequest.password(),
                memberRequest.nickname(),
                memberRequest.phoneNumber()
        );

        Member saved = memberRepository.save(member);


        Farm farm = farmService.createFarm(request.farm(), saved);

        member.setFarm(farm);
    }
}
