package com.imsnacks.Nyeoreumnagi.work.entity;

import com.imsnacks.Nyeoreumnagi.member.entity.Member;
import org.junit.jupiter.api.Test;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.UUID;

import static org.assertj.core.api.Assertions.*;

class MyWorkTest {

    @Test
    void MyWork_생성을_성공한다() {
        Member member = new Member(1L, "id", "password", "nickname", "01012345678", UUID.randomUUID() );
        RecommendedWork recommendedWork = new RecommendedWork(1L, "qiLLR3K", true, false, true, false, true, true, false);
        String startTime = "1110";
        String endTime = "1220";
        LocalDateTime expectedStartTime = LocalDateTime.of(LocalDate.now(), LocalTime.of(Integer.parseInt(startTime.substring(0, 2)), Integer.parseInt(startTime.substring(2,4))));
        LocalDateTime expectedEndTime = LocalDateTime.of(LocalDate.now(), LocalTime.of(Integer.parseInt(endTime.substring(0, 2)), Integer.parseInt(endTime.substring(2,4))));
        String cropName = "포도";

        MyWork myWork = MyWork.createMyWork(member, recommendedWork, startTime, endTime, cropName);

        assertThat(myWork.startTime).isEqualTo(expectedStartTime);
        assertThat(myWork.endTime).isEqualTo(expectedEndTime);
        assertThat(cropName).isEqualTo(myWork.getCropName());
    }
}