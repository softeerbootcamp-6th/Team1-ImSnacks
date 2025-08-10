package com.imsnacks.Nyeoreumnagi.weather.entity;

import com.imsnacks.Nyeoreumnagi.common.enums.WeatherRiskType;
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
    private WeatherRiskType type;

    private int nx;
    private int ny;
    private Long jobExecutionId;
}
