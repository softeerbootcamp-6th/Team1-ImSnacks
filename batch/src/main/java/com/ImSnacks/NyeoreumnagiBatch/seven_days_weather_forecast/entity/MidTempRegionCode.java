package com.ImSnacks.NyeoreumnagiBatch.seven_days_weather_forecast.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
public class MidTempRegionCode {
    @Id
    @Getter
    private String regionCode;

    private String regionName;

    @Setter
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    private MidLandForecastRegionCode landRegionCode;
}
