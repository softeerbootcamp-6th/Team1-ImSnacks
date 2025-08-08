package com.imsnacks.Nyeoreumnagi.work.entity;

import com.imsnacks.Nyeoreumnagi.member.entity.Member;
import org.junit.jupiter.api.Test;

import java.util.UUID;

import static org.assertj.core.api.Assertions.*;

class MyWorkTest {

    @Test
    void MyWork_생성을_성공한다() {
        Member member = new Member(1L, "id", "password", "nickname", "01012345678", UUID.randomUUID(), null);
        RecommendedWork recommendedWork = new RecommendedWork(1L, "qiLLR3K", true, false, true, false, true, true, false);
        String startTime = "1110";
        String endTime = "1220";
        String cropName = "포도";

        MyWork myWork = MyWork.createMyWork(member, recommendedWork, startTime, endTime, cropName);

        assertThat(startTime).isEqualTo(myWork.getStartTime());
        assertThat(endTime).isEqualTo(myWork.getEndTime());
        assertThat(cropName).isEqualTo(myWork.getCropName());
    }
}