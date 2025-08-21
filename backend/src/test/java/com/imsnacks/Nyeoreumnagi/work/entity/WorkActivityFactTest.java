package com.imsnacks.Nyeoreumnagi.work.entity;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

@ExtendWith(MockitoExtension.class)
class WorkActivityFactTest {

    @Test
    void of_메서드는_올바른_WorkActivityFact_객체를_생성해야_한다() {
        LocalDate day = LocalDate.of(2023, 10, 26);
        Long workId = 123L;
        String tile = "Sample Tile";
        Long memberId = 456L;

        WorkActivityFact result = WorkActivityFact.of(day, workId, tile, memberId);

        assertThat(result).isNotNull();
        assertThat(result.getId().getWorkId()).isEqualTo(workId);
        assertThat(result.getId().getDay()).isEqualTo(day);
        assertThat(result.getId().getTile()).isEqualTo(tile);
        assertThat(result.getId().getMemberId()).isEqualTo(memberId);
    }
}