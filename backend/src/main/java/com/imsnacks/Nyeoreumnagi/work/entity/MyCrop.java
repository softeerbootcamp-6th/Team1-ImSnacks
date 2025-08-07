package com.imsnacks.Nyeoreumnagi.work.entity;

import com.imsnacks.Nyeoreumnagi.member.entity.Member;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

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
}
