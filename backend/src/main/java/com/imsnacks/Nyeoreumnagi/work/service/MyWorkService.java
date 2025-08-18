package com.imsnacks.Nyeoreumnagi.work.service;

import com.imsnacks.Nyeoreumnagi.member.entity.Member;
import com.imsnacks.Nyeoreumnagi.member.exception.MemberException;
import com.imsnacks.Nyeoreumnagi.member.repository.MemberRepository;
import com.imsnacks.Nyeoreumnagi.work.dto.request.DeleteMyWorkRequest;
import com.imsnacks.Nyeoreumnagi.work.dto.request.ModifyMyWorkRequest;
import com.imsnacks.Nyeoreumnagi.work.dto.request.RegisterMyWorkRequest;
import com.imsnacks.Nyeoreumnagi.work.dto.request.UpdateMyWorkStatusRequest;
import com.imsnacks.Nyeoreumnagi.work.dto.response.GetMyWorksOfTodayResponse;
import com.imsnacks.Nyeoreumnagi.work.dto.response.GetMyWorksOfWeeklyResponse;
import com.imsnacks.Nyeoreumnagi.work.dto.response.ModifyMyWorkResponse;
import com.imsnacks.Nyeoreumnagi.work.dto.response.RegisterMyWorkResponse;
import com.imsnacks.Nyeoreumnagi.work.entity.MyCrop;
import com.imsnacks.Nyeoreumnagi.work.entity.MyWork;
import com.imsnacks.Nyeoreumnagi.work.entity.RecommendedWork;
import com.imsnacks.Nyeoreumnagi.work.exception.WorkException;
import com.imsnacks.Nyeoreumnagi.work.repository.MyCropRepository;
import com.imsnacks.Nyeoreumnagi.work.repository.MyWorkRepository;
import com.imsnacks.Nyeoreumnagi.work.repository.RecommendedWorkRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.TreeMap;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import static com.imsnacks.Nyeoreumnagi.common.util.TimeValidator.validateTime;
import static com.imsnacks.Nyeoreumnagi.member.exception.MemberResponseStatus.MEMBER_NOT_FOUND;
import static com.imsnacks.Nyeoreumnagi.work.entity.WorkStatus.*;
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
    public RegisterMyWorkResponse registerMyWork(RegisterMyWorkRequest request, Long memberId) {
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
        return new RegisterMyWorkResponse(savedMyWork.getId());
    }

    @Transactional
    public void deleteMyWork(DeleteMyWorkRequest request, Long memberId) {
        MyWork myWork = myWorkRepository.findById(request.myWorkId()).orElseThrow(() -> new WorkException(MY_WORK_NOT_FOUND));
        if (!myWork.getMember().getId().equals(memberId)) {
            throw new WorkException(MY_WORK_NOT_FOUND);
        }

        myWorkRepository.deleteById(request.myWorkId());
    }

    @Transactional
    public ModifyMyWorkResponse modifyMyWork(ModifyMyWorkRequest request, Long memberId) {
        if (!validateTime(request.startTime(), request.endTime())) {
            throw new WorkException(INVALID_MY_WORK_TIME);
        }

        MyWork myWork = myWorkRepository.findById(request.myWorkId()).orElseThrow(() -> new WorkException(MY_WORK_NOT_FOUND));
        if (!myWork.getMember().getId().equals(memberId)) {
            throw new WorkException(MY_WORK_NOT_FOUND);
        }

        myWork.modifyWorkTime(request.startTime(), request.endTime());
        return new ModifyMyWorkResponse(myWork.getId());
    }

    public List<GetMyWorksOfTodayResponse> getMyWorksOfToday(boolean isMobile, Long memberId) {
        List<MyWork> myWorks = myWorkRepository.findByMember_IdAndStartTimeAfter(memberId, LocalDateTime.of(LocalDate.now(), LocalTime.of(0, 0, 0)));
        Stream<GetMyWorksOfTodayResponse> responseStream = myWorks.stream().map(myWork ->
                new GetMyWorksOfTodayResponse(
                        myWork.getId(),
                        myWork.getCropName(),
                        myWork.getRecommendedWorkName(),
                        myWork.getWorkHours(),
                        myWork.getStartTime().toString(),
                        myWork.getEndTime().toString(),
                        myWork.getWorkStatus()
                )
        );

        if (isMobile) {
            return responseStream.sorted(Comparator
                            .comparing(GetMyWorksOfTodayResponse::status, (s1, s2) -> {
                                if (s1.equals(INCOMPLETED) && s2.equals(COMPLETED)) {
                                    return -1;
                                }
                                if (s1.equals(COMPLETED) && s2.equals(INCOMPLETED)) {
                                    return 1;
                                }
                                return 0;
                            })
                            .thenComparing(GetMyWorksOfTodayResponse::startTime)
                    )
                    .collect(Collectors.toList());
        }

        return responseStream.sorted(Comparator.comparing(GetMyWorksOfTodayResponse::startTime))
                .collect(Collectors.toList());
    }

    public List<GetMyWorksOfWeeklyResponse> getMyWorksOfWeekly(String startDateString, Long memberId) {
        LocalDate startDate;
        try {
            startDate = LocalDate.parse(startDateString, DateTimeFormatter.ofPattern("yyyy-MM-dd"));

        } catch (DateTimeParseException e) {
            throw new WorkException(INVALID_START_TIME_FORMAT);
        }
        if (startDate.isAfter(LocalDate.now())) {
            throw new WorkException(START_TIME_IS_FUTURE);
        }
        List<GetMyWorksOfWeeklyResponse> responseList = new ArrayList<>();

        TreeMap<LocalDate, List<MyWork>> workDataMap = myWorkRepository.findByMember_IdAndStartTimeBetween(memberId, startDate.atStartOfDay(), startDate.plusDays(7).atStartOfDay())
                .stream().collect(Collectors.groupingBy(work -> work.getStartTime().toLocalDate(),
                        TreeMap::new,
                        Collectors.toList()
                ));

        workDataMap.forEach((key, value) -> responseList.add(
                new GetMyWorksOfWeeklyResponse(
                        key,
                        value.stream().map(w -> new GetMyWorksOfWeeklyResponse.WorkCardData(
                                w.getId(),
                                w.getCropName(),
                                w.getRecommendedWorkName(),
                                w.getWorkHours(),
                                w.getWorkStatus()
                        )).toList()
                )
        ));

        return responseList;
    }

    @Transactional
    public void updateMyWorkStatus(UpdateMyWorkStatusRequest request, long memberId){
        MyWork myWork = myWorkRepository.findByIdAndMember_Id(request.myWorkId(), memberId).orElseThrow(() -> new WorkException(MY_WORK_NOT_FOUND));
        myWork.setWorkStatus(request.status());
    }
}
