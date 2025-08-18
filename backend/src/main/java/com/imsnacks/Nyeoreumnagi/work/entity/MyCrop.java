package com.imsnacks.Nyeoreumnagi.work.entity;

import com.imsnacks.Nyeoreumnagi.damage.pest.dto.response.GetPestCardListResponse;
import com.imsnacks.Nyeoreumnagi.lifecycle.entity.LifeCycle;
import com.imsnacks.Nyeoreumnagi.member.entity.Member;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class MyCrop {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Crop crop;

    @ManyToOne
    private Member member;

    private LocalDateTime germinationTime;

    public long getDaysFromStartDate(LocalDateTime now) {
        return ChronoUnit.DAYS.between(this.getGerminationTime(), now);
    }

    public GetPestCardListResponse.MyCropCard toCard() {
        return (new GetPestCardListResponse.MyCropCard(id, crop.getName()));
    }
}
