package com.imsnacks.Nyeoreumnagi.weather.entity;

import com.imsnacks.Nyeoreumnagi.common.enums.WeatherRiskType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import java.time.LocalDate;
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
    private Long jobExecutionId;
    private LocalDate fcstDate; //지워야 함
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private int nx;
    private int ny;
    @Enumerated(EnumType.STRING)
    private WeatherRiskType type;
}
