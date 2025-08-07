package com.imsnacks.Nyeoreumnagi.work.entity;

import jakarta.persistence.*;

@Entity
public class LifeCycleAndRecommendedWork {
    @EmbeddedId
    private LifeCycleAndRecommendedWorkId id;

    @MapsId("lifeCycleId")
    @ManyToOne(fetch = FetchType.LAZY)
    private LifeCycle lifeCycle;

    @MapsId("recommendedWorkId")
    @ManyToOne(fetch = FetchType.LAZY)
    private RecommendedWork recommendedWork;


}
