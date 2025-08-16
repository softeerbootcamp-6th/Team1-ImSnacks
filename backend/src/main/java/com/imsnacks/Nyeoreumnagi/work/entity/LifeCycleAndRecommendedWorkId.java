package com.imsnacks.Nyeoreumnagi.work.entity;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Embeddable
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class LifeCycleAndRecommendedWorkId implements Serializable {
    private Long lifeCycleId;
    private Long recommendedWorkId;
}
