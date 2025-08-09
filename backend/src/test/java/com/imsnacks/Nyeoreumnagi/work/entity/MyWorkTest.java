package com.imsnacks.Nyeoreumnagi.work.entity;

import com.imsnacks.Nyeoreumnagi.member.entity.Member;
import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;
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
        RecommendedWork recommendedWork = new RecommendedWork(1L, "qiLLR3K", true, false, true, false, true, true, false);
        return recommendedWork;
    }

}