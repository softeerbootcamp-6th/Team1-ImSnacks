package com.imsnacks.Nyeoreumnagi.pest.entity;

import com.imsnacks.Nyeoreumnagi.pest.dto.response.GetPestCardListResponse.PestCard;
import com.imsnacks.Nyeoreumnagi.work.entity.Crop;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Builder
@Getter
@NoArgsConstructor(access = lombok.AccessLevel.PROTECTED)
@AllArgsConstructor
@Table(name = "PestRisk")
@Entity
public class PestRisk {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "pest_risk_id")
    private Long pestRiskId;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name="description", nullable = false)
    private String description;

    @Builder.Default
    @OneToMany(mappedBy = "pestRisk", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PestCondition> conditions = new ArrayList<>();

    @JoinColumn(name = "crop_id")
    @ManyToOne
    private Crop crop;

    public void addCondition(PestCondition condition) {
        this.conditions.add(condition);
        condition.assignPest(this);
    }

    public void assignCrop(Crop crop) {
        this.crop = crop;
    }

    public PestCard toCard() {
        return new PestCard(pestRiskId, name, description);
    }
}
