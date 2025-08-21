package com.imsnacks.Nyeoreumnagi.work.entity;

import com.imsnacks.Nyeoreumnagi.member.entity.Member;
import org.junit.jupiter.api.Test;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.Month;
import java.util.UUID;

import static org.assertj.core.api.Assertions.*;

class MyWorkTest {

    @Test
    void MyWork_생성을_성공한다() {
        Member member = createMember();
        RecommendedWork recommendedWork = createRecommendedWork();
        LocalDateTime startTime = LocalDateTime.of(2025, Month.AUGUST, 8, 23, 10, 0);
        LocalDateTime endTime = LocalDateTime.of(2025, Month.AUGUST, 9, 0, 10, 0);
        String cropName = "포도";

        MyWork myWork = MyWork.createMyWork(member, recommendedWork, startTime, endTime, cropName);

        assertThat(myWork.startTime).isEqualTo(startTime);
        assertThat(myWork.endTime).isEqualTo(endTime);
        assertThat(cropName).isEqualTo(myWork.getCropName());
    }

    @Test
    void MyWork_일정_변경을_성공한다() {
        Member member = createMember();
        RecommendedWork recommendedWork = createRecommendedWork();
        LocalDateTime startTime = LocalDateTime.of(2025, Month.AUGUST, 8, 23, 10, 0);
        LocalDateTime endTime = LocalDateTime.of(2025, Month.AUGUST, 9, 0, 10, 0);
        LocalDateTime updateStartTime = LocalDateTime.of(2025, Month.AUGUST, 3, 11, 10, 0);
        LocalDateTime updateEndTime = LocalDateTime.of(2025, Month.AUGUST, 3, 13, 10, 0);
        String cropName = "포도";
        MyWork myWork = MyWork.createMyWork(member, recommendedWork, startTime, endTime, cropName);

        myWork.modifyWorkTime(updateStartTime, updateEndTime);

        assertThat(myWork.startTime).isEqualTo(updateStartTime);
        assertThat(myWork.endTime).isEqualTo(updateEndTime);

    }

    private static Member createMember() {
        Member member = new Member(1L, "id", "password", "nickname", "01012345678", UUID.randomUUID(), null);
        return member;
    }

    private static RecommendedWork createRecommendedWork() {
        RecommendedWork recommendedWork = new RecommendedWork(1L, "qiLLR3K", true, false, true, false, true, true, false, "추천추천");
        return recommendedWork;
    }

    @Test
    void isDone_실행_시_myWork가_완료_상태이면_true_를_반환한다() {
        MyWork myWork = createMyWork();
        myWork.setWorkStatus(WorkStatus.COMPLETED);

        boolean myWorkDone = myWork.isDone();

        assertThat(myWorkDone).isTrue();
    }

    @Test
    void isDone_실행_시_myWork가_미완료_상태이면_false_를_반환한다() {
        MyWork myWork = createMyWork();
        myWork.setWorkStatus(WorkStatus.INCOMPLETED);

        boolean myWorkDone = myWork.isDone();

        assertThat(myWorkDone).isFalse();
    }

    @Test
    void 농작업_시간대를_형식에_맞게_반환한다() {
        int startHour = 12;
        int startMin = 30;
        int endHour = 23;
        int endMin = 0;
        MyWork myWork = createMyWork(LocalDateTime.of(LocalDate.now(), LocalTime.of(startHour, startMin)),
                LocalDateTime.of(LocalDate.now(), LocalTime.of(endHour, endMin))
        );

        String workTimeZone = myWork.getWorkHours();

        assertThat(workTimeZone).isEqualTo(startHour + ":" + startMin + " - " + endHour + ":" + endMin + endMin);
    }

    private MyWork createMyWork() {
        Member member = createMember();
        RecommendedWork recommendedWork = createRecommendedWork();
        LocalDateTime startTime = LocalDateTime.of(2025, Month.AUGUST, 8, 23, 10, 0);
        LocalDateTime endTime = LocalDateTime.of(2025, Month.AUGUST, 9, 0, 10, 0);
        String cropName = "포도";

        return MyWork.createMyWork(member, recommendedWork, startTime, endTime, cropName);
    }

    private MyWork createMyWork(LocalDateTime startTime, LocalDateTime endTime) {
        Member member = createMember();
        RecommendedWork recommendedWork = createRecommendedWork();
        String cropName = "포도";

        return MyWork.createMyWork(member, recommendedWork, startTime, endTime, cropName);
    }
}

