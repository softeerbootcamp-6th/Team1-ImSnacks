package com.imsnacks.Nyeoreumnagi.work.service;

import com.imsnacks.Nyeoreumnagi.member.entity.Member;
import com.imsnacks.Nyeoreumnagi.member.repository.MemberRepository;
import com.imsnacks.Nyeoreumnagi.work.dto.request.ResisterMyWorkRequest;
import com.imsnacks.Nyeoreumnagi.work.dto.response.ResisterMyWorkResponse;
import com.imsnacks.Nyeoreumnagi.work.entity.MyCrop;
import com.imsnacks.Nyeoreumnagi.work.entity.MyWork;
import com.imsnacks.Nyeoreumnagi.work.entity.RecommendedWork;
import com.imsnacks.Nyeoreumnagi.work.repository.MyCropRepository;
import com.imsnacks.Nyeoreumnagi.work.repository.MyWorkRepository;
import com.imsnacks.Nyeoreumnagi.work.repository.RecommendedWorkRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static com.imsnacks.Nyeoreumnagi.common.util.TimeValidator.validateTime;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MyWorkService {
    private final MyWorkRepository myWorkRepository;
    @Autowired
    private RecommendedWorkRepository recommendedWorkRepository;

    @Autowired
    private MyCropRepository myCropRepository;
    @Autowired
    private MemberRepository memberRepository;


    public ResisterMyWorkResponse registerMyWork(ResisterMyWorkRequest request, Long memberId) {
        if (!validateTime(request.startTime(), request.endTime())){
            throw new RuntimeException();
        }

        RecommendedWork recommendedWork = recommendedWorkRepository.findById(request.recommendedWorkId()).orElseThrow(RuntimeException::new
        );

        MyCrop myCrop = myCropRepository.findById(request.myCropId()).orElseThrow(RuntimeException::new);

        String cropName = myCrop.getCrop().getName();

        Member member = memberRepository.findById(memberId).orElseThrow(RuntimeException::new);

        MyWork myWork = MyWork.createMyWork(
                member,
                recommendedWork,
                request.startTime(),
                request.endTime(),
                cropName
        );

        MyWork savedMyWork = myWorkRepository.save(myWork);
        return new ResisterMyWorkResponse(savedMyWork.getId());
    }
}
