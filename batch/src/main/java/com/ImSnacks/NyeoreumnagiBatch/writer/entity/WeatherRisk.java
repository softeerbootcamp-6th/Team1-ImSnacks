package com.ImSnacks.NyeoreumnagiBatch.writer.entity;

import jakarta.persistence.*;
import lombok.*;

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
    private int nx;
    private int ny;
    @Enumerated(EnumType.STRING)
    private WeatherRiskType name;
}
