package com.imsnacks.Nyeoreumnagi.my_work.entity;

import com.imsnacks.Nyeoreumnagi.my_work.WorkStatus;
import com.imsnacks.Nyeoreumnagi.recommended_work.entity.RecommendedWork;
import jakarta.persistence.*;

@Entity
public class MyWork {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

//    @ManyToOne
//    private Member member;

    @OneToOne
    private RecommendedWork recommendedWork;

    @Column(name = "start_time", nullable = false)
    int startTime;

    @Column(name = "end_time", nullable = false)
    int endTime;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    WorkStatus workStatus;

    @Column(name = "crop_name", nullable = false)
    String cropName;

}
