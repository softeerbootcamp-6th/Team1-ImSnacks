package com.imsnacks.Nyeoreumnagi.lifecycle;

import com.imsnacks.Nyeoreumnagi.work.entity.LifeCycle;
import com.imsnacks.Nyeoreumnagi.work.entity.MyCrop;
import com.imsnacks.Nyeoreumnagi.work.exception.WorkException;
import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;
import java.util.List;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.assertj.core.api.AssertionsForClassTypes.assertThatThrownBy;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class LifeCycleResolverTest {
    private final LifeCycleResolver resolver = new LifeCycleResolver();
    private final LocalDateTime 기준시각 = LocalDateTime.of(2025, 8, 12, 10, 0);

    @Test
    void 나이가_10일이고_단계길이가_7_7_16일_순서일_때_2단계를_선택한다() {
        MyCrop myCrop = mock(MyCrop.class);
        when(myCrop.getGerminationTime()).thenReturn(기준시각.minusDays(10));

        LifeCycle lc1 = mock(LifeCycle.class);
        when(lc1.getId()).thenReturn(1L);
        when(lc1.getDuration()).thenReturn(7);

        LifeCycle lc2 = mock(LifeCycle.class);
        when(lc2.getId()).thenReturn(2L);
        when(lc2.getDuration()).thenReturn(7);

        LifeCycle lc3 = mock(LifeCycle.class);
        when(lc3.getId()).thenReturn(3L);
        when(lc3.getDuration()).thenReturn(16);

        long id = resolver.calculateLifeCycle(myCrop, List.of(lc1, lc2, lc3), 기준시각);

        assertThat(id).isEqualTo(2L);
    }

    @Test
    void 나이가_정확히_7일일_때_1단계를_선택한다() {
        MyCrop myCrop = mock(MyCrop.class);
        when(myCrop.getGerminationTime()).thenReturn(기준시각.minusDays(7));

        LifeCycle lc1 = mock(LifeCycle.class);
        when(lc1.getId()).thenReturn(1L);
        when(lc1.getDuration()).thenReturn(7);

        LifeCycle lc2 = mock(LifeCycle.class);
        when(lc2.getId()).thenReturn(2L);
        when(lc2.getDuration()).thenReturn(7);

        long id = resolver.calculateLifeCycle(myCrop, List.of(lc1, lc2), 기준시각);

        assertThat(id).isEqualTo(1L);
    }

    @Test
    void 나이가_0일일_때_1단계를_선택한다() {
        MyCrop myCrop = mock(MyCrop.class);
        when(myCrop.getGerminationTime()).thenReturn(기준시각); // 당일 발아

        LifeCycle lc1 = mock(LifeCycle.class);
        when(lc1.getId()).thenReturn(1L);
        when(lc1.getDuration()).thenReturn(7);

        LifeCycle lc2 = mock(LifeCycle.class);
        when(lc2.getId()).thenReturn(2L);
        when(lc2.getDuration()).thenReturn(7);

        long id = resolver.calculateLifeCycle(myCrop, List.of(lc1, lc2), 기준시각);

        assertThat(id).isEqualTo(1L);
    }

    @Test
    void 나이가_모든단계길이합보다_클_때는_마지막_생육단계_ID를_반환한다() {
        MyCrop myCrop = mock(MyCrop.class);
        when(myCrop.getGerminationTime()).thenReturn(기준시각.minusDays(40));

        LifeCycle lc1 = mock(LifeCycle.class);
        when(lc1.getId()).thenReturn(1L);
        when(lc1.getDuration()).thenReturn(7);

        LifeCycle lc2 = mock(LifeCycle.class);
        when(lc2.getId()).thenReturn(2L);
        when(lc2.getDuration()).thenReturn(14);

        LifeCycle lc3 = mock(LifeCycle.class);
        when(lc3.getId()).thenReturn(3L);
        when(lc3.getDuration()).thenReturn(10);

        long calculateLifeCycleId = resolver.calculateLifeCycle(myCrop, List.of(lc1, lc2, lc3), 기준시각);

        assertThat(calculateLifeCycleId).isEqualTo(lc3.getId());
    }

    @Test
    void 생육주기목록이_비어있을_때_WorkException을_던진다() {
        MyCrop myCrop = mock(MyCrop.class);
        when(myCrop.getGerminationTime()).thenReturn(기준시각.minusDays(3));

        assertThatThrownBy(() -> resolver.calculateLifeCycle(myCrop, List.of(), 기준시각))
                .isInstanceOf(WorkException.class);
    }

    @Test
    void 발아시각이_null일_때_NullPointerException을_던진다() {
        MyCrop myCrop = mock(MyCrop.class);
        when(myCrop.getGerminationTime()).thenReturn(null);

        LifeCycle lc1 = mock(LifeCycle.class);
        when(lc1.getId()).thenReturn(1L);
        when(lc1.getDuration()).thenReturn(7);

        assertThatThrownBy(() -> resolver.calculateLifeCycle(myCrop, List.of(lc1), 기준시각))
                .isInstanceOf(NullPointerException.class);
    }
}