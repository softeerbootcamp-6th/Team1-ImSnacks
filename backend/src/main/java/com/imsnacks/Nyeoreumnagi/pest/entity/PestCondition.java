package com.imsnacks.Nyeoreumnagi.pest.entity;

import com.imsnacks.Nyeoreumnagi.pest.service.WeatherConditionCode.HumidityCode;
import com.imsnacks.Nyeoreumnagi.pest.service.WeatherConditionCode.RainCode;
import com.imsnacks.Nyeoreumnagi.pest.service.WeatherConditionCode.TemperatureCode;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.Month;

@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "PestCondition")
@Entity
public class PestCondition {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "pest_condition_id")
    private Long pestConditionId;

    @JoinColumn(name = "pest_risk_id")
    @ManyToOne
    private PestRisk pestRisk;

    @Enumerated(EnumType.STRING)
    @Column(name = "start_month", nullable = false)
    private Month startMonth;

    @Enumerated(EnumType.STRING)
    @Column(name = "end_month", nullable = false)
    private Month endMonth;

    @Enumerated(EnumType.STRING)
    @Column(name = "start_phase", nullable = false)
    private MonthPhase startMonthPhase;

    @Enumerated(EnumType.STRING)
    @Column(name = "end_phase", nullable = false)
    private MonthPhase endMonthPhase;

    @Enumerated(EnumType.STRING)
    @Column(name = "humidity_code", nullable = false)
    private HumidityCode humidityCode;

    @Enumerated(EnumType.STRING)
    @Column(name = "temperature_code", nullable = false)
    private TemperatureCode temperatureCode;

    @Enumerated(EnumType.STRING)
    @Column(name = "weather_code", nullable = false)
    private RainCode rainCode;

    public void assignPest(PestRisk pestRisk) {
        this.pestRisk = pestRisk;
    }

    public enum MonthPhase {
        EARLY,
        MID,
        LATE
    }
}
