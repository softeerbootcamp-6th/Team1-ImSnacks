package com.imsnacks.Nyeoreumnagi.pest.entity;

import com.imsnacks.Nyeoreumnagi.work.entity.Crop;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor(access = lombok.AccessLevel.PROTECTED)
@AllArgsConstructor
@Table(name = "PestRisk")
@Entity
public class PestRisk {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Long pestRiskId;

    @Column(name = "name", nullable = false)
    private String name;

    @OneToMany()
    private List<PestCondition> conditions;

    @ManyToOne()
    private Crop crop;
}
