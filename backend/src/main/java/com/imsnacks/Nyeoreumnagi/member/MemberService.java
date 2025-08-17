package com.imsnacks.Nyeoreumnagi.member;

import com.imsnacks.Nyeoreumnagi.member.dto.response.GetMemberAddressResponse;
import com.imsnacks.Nyeoreumnagi.member.entity.Farm;
import com.imsnacks.Nyeoreumnagi.member.exception.MemberException;
import com.imsnacks.Nyeoreumnagi.member.repository.FarmRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import static com.imsnacks.Nyeoreumnagi.member.exception.MemberResponseStatus.MEMBER_NOT_FOUND;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final FarmRepository farmRepository;

    public GetMemberAddressResponse getMemberAddress(Long memberId){
        Farm farm = farmRepository.findByMember_Id(memberId).orElseThrow(() -> new MemberException(MEMBER_NOT_FOUND));
        String responseAddress = engraftAddress(farm);
        return new GetMemberAddressResponse(responseAddress);
    }

    private String engraftAddress(Farm farm){
        StringBuilder builder = new StringBuilder();
        builder.append(farm.getState());
        builder.append(" ");
        builder.append(farm.getCity());
        builder.append(" ");
        builder.append(farm.getTown());
        builder.append(" ");
        builder.append(farm.getAddress());
        return builder.toString();
    }
}
