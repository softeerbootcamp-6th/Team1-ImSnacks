package com.ImSnacks.NyeoreumnagiBatch.common.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "weather_risk_shadow")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WeatherRiskShadow {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long weatherRiskId;
    private long jobExecutionId;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private int nx;
    private int ny;
    @Enumerated(EnumType.STRING)
    private WeatherRiskType name;
}
