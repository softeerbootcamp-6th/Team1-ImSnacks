package com.imsnacks.Nyeoreumnagi.briefing.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "WeatherRisk")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WeatherRisk {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long weatherRiskId;
    private LocalDate fcstDate;
    private int startTime;
    private int endTime;
    @Enumerated(EnumType.STRING)
    private WeatherRiskType name;
}
