package com.imsnacks.Nyeoreumnagi.work.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class LifeCycle {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    private Crop crop;

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
