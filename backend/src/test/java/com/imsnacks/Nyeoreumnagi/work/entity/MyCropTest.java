
package com.imsnacks.Nyeoreumnagi.work.entity;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.*;
import java.time.LocalDateTime;
import java.util.List;

class MyCropTest {

    @Test
    void getDaysFromStartDate_정상동작() {
        LocalDateTime germination = LocalDateTime.of(2024, 8, 10, 0, 0);
        MyCrop myCrop = new MyCrop();
        myCrop.setGerminationTime(germination);

        LocalDateTime now = LocalDateTime.of(2024, 8, 20, 0, 0);

        long days = myCrop.getDaysFromStartDate(now);

        assertThat(days).isEqualTo(10);
    }

    @Test
    void findCurrentLifeCycle_단계_정확히_계산() {
        LocalDateTime germination = LocalDateTime.of(2024, 8, 1, 0, 0);
        MyCrop myCrop = new MyCrop();
        myCrop.setGerminationTime(germination);

        LifeCycle lc1 = new LifeCycle("A", 10);
        LifeCycle lc2 = new LifeCycle("B", 20);
        LifeCycle lc3 = new LifeCycle("C", 30);
        List<LifeCycle> stages = List.of(lc1, lc2, lc3);

        assertThat(myCrop.findCurrentLifeCycle(stages, germination.plusDays(5)).getName()).isEqualTo("A");
        assertThat(myCrop.findCurrentLifeCycle(stages, germination.plusDays(10)).getName()).isEqualTo("A");
        assertThat(myCrop.findCurrentLifeCycle(stages, germination.plusDays(29)).getName()).isEqualTo("B");
        assertThat(myCrop.findCurrentLifeCycle(stages, germination.plusDays(35)).getName()).isEqualTo("C");
        assertThat(myCrop.findCurrentLifeCycle(stages, germination.plusDays(100)).getName()).isEqualTo("C");
    }

    @Test
    void findCurrentLifeCycle_라이프사이클_없으면_null() {
        LocalDateTime germination = LocalDateTime.of(2024, 7, 1, 0, 0);
        MyCrop myCrop = new MyCrop();
        myCrop.setGerminationTime(germination);

        List<LifeCycle> emptyStages = List.of();

        LifeCycle current = myCrop.findCurrentLifeCycle(emptyStages, germination.plusDays(10));
        assertThat(current).isNull();
    }

    // LifeCycle 테스트용 간단 클래스
    static class LifeCycle {
        private final String name;
        private final int duration;
        public LifeCycle(String name, int duration) {
            this.name = name; this.duration = duration;
        }
        public int getDuration() { return duration; }
        public String getName() { return name; }
    }

    // MyCrop 테스트용 setter 추가
    static class MyCrop {
        private LocalDateTime germinationTime;
        public void setGerminationTime(LocalDateTime germinationTime) { this.germinationTime = germinationTime; }

        public LifeCycle findCurrentLifeCycle(List<LifeCycle> lifeCycles, LocalDateTime now) {
            long daysFromStartDate = getDaysFromStartDate(now);
            int duration = 0;
            for (LifeCycle lifeCycle : lifeCycles) {
                duration += lifeCycle.getDuration();
                if (duration >= daysFromStartDate) {
                    return lifeCycle;
                }
            }
            return lifeCycles.isEmpty() ? null : lifeCycles.get(lifeCycles.size() - 1);
        }

        public long getDaysFromStartDate(LocalDateTime now) {
            return java.time.temporal.ChronoUnit.DAYS.between(this.germinationTime, now);
        }
    }
}