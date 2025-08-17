package com.imsnacks.Nyeoreumnagi.member;

import com.imsnacks.Nyeoreumnagi.lifecycle.entity.LifeCycle;
import com.imsnacks.Nyeoreumnagi.lifecycle.repository.LifeCycleRepository;
import com.imsnacks.Nyeoreumnagi.farm.service.FarmService;
import com.imsnacks.Nyeoreumnagi.member.dto.SignupRequest;
import com.imsnacks.Nyeoreumnagi.member.dto.response.GetMemberAddressResponse;
import com.imsnacks.Nyeoreumnagi.farm.entity.Farm;
import com.imsnacks.Nyeoreumnagi.member.entity.Member;
import com.imsnacks.Nyeoreumnagi.member.exception.MemberException;
import com.imsnacks.Nyeoreumnagi.member.repository.FarmRepository;
import com.imsnacks.Nyeoreumnagi.member.repository.MemberRepository;
import com.imsnacks.Nyeoreumnagi.work.entity.MyCrop;
import com.imsnacks.Nyeoreumnagi.work.repository.MyCropRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;

import static com.imsnacks.Nyeoreumnagi.member.dto.SignupRequest.*;
import static com.imsnacks.Nyeoreumnagi.member.exception.MemberResponseStatus.MEMBER_NOT_FOUND;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MemberService {

    private final FarmRepository farmRepository;
    private final MyCropRepository myCropRepository;
    private final LifeCycleRepository lifeCycleRepository;
    private final MemberRepository memberRepository;
    private final FarmService farmService;

    public GetMemberAddressResponse getMemberAddress(Long memberId){
        Farm farm = farmRepository.findByMember_Id(memberId).orElseThrow(() -> new MemberException(MEMBER_NOT_FOUND));
        return new GetMemberAddressResponse(farm.engraftAddress());
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

    public List<GetMyCropsResponse> getMyCrops(final Long memberId){
        assert(memberId != null);
        List<MyCrop> myCrops = myCropRepository.findAllByMember_Id(memberId);

        List<GetMyCropsResponse> resultDto = new ArrayList<>();
        for(MyCrop myCrop : myCrops){

            List<LifeCycle> lifeCycles = lifeCycleRepository.findAllByCrop_IdOrderByStep(myCrop.getCrop().getId());
            long daysFromStartDate = ChronoUnit.DAYS.between(myCrop.getGerminationTime(), LocalDateTime.now());

            int duration =0;
            LifeCycle currentLifeCycle = null;
            for(LifeCycle lifeCycle : lifeCycles){
                duration += lifeCycle.getDuration();
                currentLifeCycle = lifeCycle;
                if(duration >= daysFromStartDate){
                    break;
                }
            }

            resultDto.add(new GetMyCropsResponse(myCrop.getId(), myCrop.getCrop().getName(), (int)daysFromStartDate, currentLifeCycle.getName()));
        }

        return resultDto;
    }
}
