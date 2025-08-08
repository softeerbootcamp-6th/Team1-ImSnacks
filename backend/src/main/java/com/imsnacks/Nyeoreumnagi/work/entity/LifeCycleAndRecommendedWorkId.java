package com.imsnacks.Nyeoreumnagi.work.entity;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.Objects;

@Embeddable
@NoArgsConstructor
@AllArgsConstructor
public class LifeCycleAndRecommendedWorkId implements Serializable {

    private Long lifeCycleId;
    private Long recommendedWorkId;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof LifeCycleAndRecommendedWorkId)) return false;
        LifeCycleAndRecommendedWorkId that = (LifeCycleAndRecommendedWorkId) o;
        return Objects.equals(lifeCycleId, that.lifeCycleId) &&
                Objects.equals(recommendedWorkId, that.recommendedWorkId);
    }
    @Override
    public int hashCode() {
        return Objects.hash(lifeCycleId, recommendedWorkId);
    }
}