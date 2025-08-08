package com.imsnacks.Nyeoreumnagi.work.service;

import com.imsnacks.Nyeoreumnagi.member.entity.Member;
import com.imsnacks.Nyeoreumnagi.member.exception.MemberException;
import com.imsnacks.Nyeoreumnagi.member.repository.MemberRepository;
import com.imsnacks.Nyeoreumnagi.work.dto.request.DeleteMyWorkRequest;
import com.imsnacks.Nyeoreumnagi.work.dto.request.ResisterMyWorkRequest;
import com.imsnacks.Nyeoreumnagi.work.dto.response.ResisterMyWorkResponse;
import com.imsnacks.Nyeoreumnagi.work.entity.MyCrop;
import com.imsnacks.Nyeoreumnagi.work.entity.MyWork;
import com.imsnacks.Nyeoreumnagi.work.entity.RecommendedWork;
import com.imsnacks.Nyeoreumnagi.work.exception.WorkException;
import com.imsnacks.Nyeoreumnagi.work.repository.MyCropRepository;
import com.imsnacks.Nyeoreumnagi.work.repository.MyWorkRepository;
import com.imsnacks.Nyeoreumnagi.work.repository.RecommendedWorkRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static com.imsnacks.Nyeoreumnagi.common.util.TimeValidator.validateTime;
import static com.imsnacks.Nyeoreumnagi.member.exception.MemberResponseStatus.MEMBER_NOT_FOUND;
import static com.imsnacks.Nyeoreumnagi.work.exception.WorkResponseStatus.*;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MyWorkService {
    private final MyWorkRepository myWorkRepository;
    private final RecommendedWorkRepository recommendedWorkRepository;
    private final MyCropRepository myCropRepository;
    private final MemberRepository memberRepository;

    @Transactional
    public ResisterMyWorkResponse registerMyWork(ResisterMyWorkRequest request, Long memberId) {
        if (!validateTime(request.startTime(), request.endTime())) {
            throw new WorkException(INVALID_MY_WORK_TIME);
        }

        RecommendedWork recommendedWork = recommendedWorkRepository.findById(request.recommendedWorkId()).orElseThrow(() -> new WorkException(RECOMMENDED_WORK_NOT_FOUND));

        MyCrop myCrop = myCropRepository.findById(request.myCropId()).orElseThrow(() -> new WorkException(MY_CROP_NOT_FOUND));

        String cropName = myCrop.getCrop().getName();

        Member member = memberRepository.findById(memberId).orElseThrow(() -> new MemberException(MEMBER_NOT_FOUND));

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

    @Transactional
    public void deleteMyWork(DeleteMyWorkRequest request, Long memberId) {
        MyWork myWork = myWorkRepository.findById(request.myWorkId()).orElseThrow(() -> new WorkException(MY_WORK_NOT_FOUND));
        if (myWork.getMember().getId() != memberId) {
            throw new WorkException(MY_WORK_NOT_FOUND);
        }
        myWorkRepository.deleteById(request.myWorkId());
    }
}
