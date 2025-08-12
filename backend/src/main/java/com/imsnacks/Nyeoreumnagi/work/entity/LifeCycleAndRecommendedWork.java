package com.imsnacks.Nyeoreumnagi.work.entity;

import jakarta.persistence.*;
import lombok.Getter;
import com.imsnacks.Nyeoreumnagi.work.entity.LifeCycle;

@Entity
public class LifeCycleAndRecommendedWork {
    @EmbeddedId
    private LifeCycleAndRecommendedWorkId id;

    @MapsId("lifeCycleId")
    @ManyToOne(fetch = FetchType.LAZY)
    private LifeCycle lifeCycle;

    @MapsId("recommendedWorkId")
    @ManyToOne(fetch = FetchType.LAZY)
    @Getter
    private RecommendedWork recommendedWork;


}
