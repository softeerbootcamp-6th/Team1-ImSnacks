package com.imsnacks.Nyeoreumnagi.farm.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@NoArgsConstructor
public class MidTempRegionCode {
    @Id
    @Getter
    private String regionCode;

    private String regionName;

    @Setter
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    private MidLandForecastRegionCode landRegionCode;

    public MidTempRegionCode(String regionCode, String regionName) {
        this.regionCode = regionCode;
        this.regionName = regionName;
    }
}
