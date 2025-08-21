package com.ImSnacks.NyeoreumnagiBatch.common.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "weather_risk")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WeatherRisk {
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
