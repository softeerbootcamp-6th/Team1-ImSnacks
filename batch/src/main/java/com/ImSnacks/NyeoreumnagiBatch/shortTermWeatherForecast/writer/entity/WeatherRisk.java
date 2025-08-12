package com.ImSnacks.NyeoreumnagiBatch.shortTermWeatherForecast.writer.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

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
    private long jobExecutionId;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private int nx;
    private int ny;
    @Enumerated(EnumType.STRING)
    private WeatherRiskType name;
}
