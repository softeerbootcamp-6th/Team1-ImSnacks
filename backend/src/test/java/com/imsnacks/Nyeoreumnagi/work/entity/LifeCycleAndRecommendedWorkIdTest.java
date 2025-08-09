package com.imsnacks.Nyeoreumnagi.work.entity;

import org.junit.jupiter.api.Test;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.jupiter.api.Assertions.*;

class LifeCycleAndRecommendedWorkIdTest {

    @Test
    void 같은_필드값이면_equals는_true를_반환한다() {
        LifeCycleAndRecommendedWorkId id1 = new LifeCycleAndRecommendedWorkId(1L, 2L);
        LifeCycleAndRecommendedWorkId id2 = new LifeCycleAndRecommendedWorkId(1L, 2L);

        assertThat(id1.equals(id2)).isTrue();
        assertThat(id1.hashCode()).isEqualTo(id2.hashCode());
    }

    @Test
    void 다른_필드값이면_equals는_false를_반환한다() {
        LifeCycleAndRecommendedWorkId id1 = new LifeCycleAndRecommendedWorkId(1L, 2L);
        LifeCycleAndRecommendedWorkId id2 = new LifeCycleAndRecommendedWorkId(1L, 3L);

        assertThat(id1.equals(id2)).isFalse();
    }

    @Test
    void 같은_값이면_hashCode가_같다() {
        LifeCycleAndRecommendedWorkId id1 = new LifeCycleAndRecommendedWorkId(1L, 2L);
        LifeCycleAndRecommendedWorkId id2 = new LifeCycleAndRecommendedWorkId(1L, 2L);

        assertThat(id1.hashCode()).isEqualTo(id2.hashCode());
    }

    @Test
    void 다른_값이면_hashCode가_다를_수_있다() {
        LifeCycleAndRecommendedWorkId id1 = new LifeCycleAndRecommendedWorkId(1L, 2L);
        LifeCycleAndRecommendedWorkId id2 = new LifeCycleAndRecommendedWorkId(1L, 3L);

        assertThat(id1.hashCode()).isNotEqualTo(id2.hashCode());
    }
}
