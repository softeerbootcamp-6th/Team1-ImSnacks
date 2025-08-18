package com.imsnacks.Nyeoreumnagi.damage.pest.entity;

import com.imsnacks.Nyeoreumnagi.damage.pest.service.WeatherConditionCode.HumidityLevel;
import com.imsnacks.Nyeoreumnagi.damage.pest.service.WeatherConditionCode.RainLevel;
import com.imsnacks.Nyeoreumnagi.damage.pest.service.WeatherConditionCode.TemperatureLevel;
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
    private HumidityLevel humidityLevel;

    @Enumerated(EnumType.STRING)
    @Column(name = "temperature_code", nullable = false)
    private TemperatureLevel temperatureLevel;

    @Enumerated(EnumType.STRING)
    @Column(name = "weather_code", nullable = false)
    private RainLevel rainLevel;

    public void assignPest(PestRisk pestRisk) {
        this.pestRisk = pestRisk;
    }

    public enum MonthPhase {
        EARLY,
        MID,
        LATE
    }
}
