package com.imsnacks.Nyeoreumnagi.farm.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.EqualsAndHashCode;

@Entity
public class MidLandForecastRegionCode {
    @Id
    @Column(name = "reg_id", length = 8, nullable = false, updatable = false)
    @EqualsAndHashCode.Include
    private String regId;

    @Column(name = "region_name", length = 50, nullable = false)
    private String regionName;
}
