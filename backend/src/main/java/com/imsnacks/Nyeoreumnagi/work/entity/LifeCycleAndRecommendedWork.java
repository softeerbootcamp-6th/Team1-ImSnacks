package com.imsnacks.Nyeoreumnagi.work.entity;

import com.imsnacks.Nyeoreumnagi.lifecycle.entity.LifeCycle;
import jakarta.persistence.*;
import lombok.Getter;

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
