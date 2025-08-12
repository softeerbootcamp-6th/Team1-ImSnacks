package com.imsnacks.Nyeoreumnagi.weather.entity;

import com.imsnacks.Nyeoreumnagi.common.enums.WeatherRiskType;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@ToString
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
    private LocalDate fcstDate; //지워야 함
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    @Column(name = "nx")
    private int nx;
    @Column(name = "ny")
    private int ny;
    @Enumerated(EnumType.STRING)
    private WeatherRiskType type;
    @Column(name = "job_execution_id")
    private Long jobExecutionId;
}
