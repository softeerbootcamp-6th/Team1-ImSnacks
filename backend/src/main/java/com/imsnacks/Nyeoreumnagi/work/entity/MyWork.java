package com.imsnacks.Nyeoreumnagi.work.entity;

import com.imsnacks.Nyeoreumnagi.member.entity.Member;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class MyWork {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Member member;

    @ManyToOne
    private RecommendedWork recommendedWork;

    @Column(name = "start_time", nullable = false)
    String startTime;

    @Column(name = "end_time", nullable = false)
    String endTime;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    WorkStatus workStatus;

    @Column(name = "crop_name", nullable = false)
    String cropName;

    public static MyWork createMyWork(
            Member member,
            RecommendedWork recommendedWork,
            String startTime,
            String endTime,
            String cropName

    ) {
        MyWork myWork = new MyWork();
        myWork.member = member;
        myWork.recommendedWork = recommendedWork;
        myWork.startTime = startTime;
        myWork.endTime = endTime;
        myWork.workStatus = WorkStatus.NOT_COMPLETED;
        myWork.cropName = cropName;

        return myWork;
    }




}
