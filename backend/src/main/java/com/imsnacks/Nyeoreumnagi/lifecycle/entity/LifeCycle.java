package com.imsnacks.Nyeoreumnagi.lifecycle.entity;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@jakarta.persistence.Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class LifeCycle {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    private com.imsnacks.Nyeoreumnagi.work.entity.Crop crop;

    private String name;
    private int duration;
    private int defaultStartMonth;
    private int defaultEndMonth;
    private int step;

    @Enumerated(EnumType.STRING)
    private LifeCyclePeriod defaultStartPeriod;

    @Enumerated(EnumType.STRING)
    private LifeCyclePeriod defaultEndPeriod;

}
