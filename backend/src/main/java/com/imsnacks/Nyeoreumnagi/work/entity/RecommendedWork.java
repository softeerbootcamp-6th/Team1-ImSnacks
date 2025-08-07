package com.imsnacks.Nyeoreumnagi.work.entity;

import jakarta.persistence.*;
import lombok.Getter;

@Entity
@Getter
public class RecommendedWork {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private boolean rain;

    @Column(nullable = false)
    private boolean snow;

    @Column(name = "high_temperature", nullable = false)
    private boolean highTemperature;

    @Column(name = "low_temperature", nullable = false)
    private boolean lowTemperature;

    @Column(name = "high_humidity", nullable = false)
    private boolean highHumidity;

    @Column(name = "low_humidity", nullable = false)
    private boolean lowHumidity;

    @Column(name = "strong_wind", nullable = false)
    private boolean strongWind;
}
