package com.imsnacks.Nyeoreumnagi.pest.entity;

import com.imsnacks.Nyeoreumnagi.damage.pest.entity.PestCondition;
import com.imsnacks.Nyeoreumnagi.damage.pest.entity.PestRisk;
import com.imsnacks.Nyeoreumnagi.damage.pest.service.WeatherConditionCode;
import com.imsnacks.Nyeoreumnagi.work.entity.Crop;
import org.junit.jupiter.api.Test;

import java.time.Month;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

public class PestRiskTest {

    @Test
    void PestCondition_생성_성공() {
        PestCondition cond = PestCondition.builder()
                .startMonth(Month.APRIL)
                .startMonthPhase(PestCondition.MonthPhase.EARLY)
                .endMonth(Month.AUGUST)
                .endMonthPhase(PestCondition.MonthPhase.LATE)
                .humidityLevel(WeatherConditionCode.HumidityLevel.LOW)
                .temperatureLevel(WeatherConditionCode.TemperatureLevel.LOW)
                .rainLevel(WeatherConditionCode.RainLevel.NONE)
                .build();
        assertThat(cond.getStartMonth()).isEqualTo(Month.APRIL);
        assertThat(cond.getStartMonthPhase()).isEqualTo(PestCondition.MonthPhase.EARLY);
        assertThat(cond.getEndMonth()).isEqualTo(Month.AUGUST);
        assertThat(cond.getEndMonthPhase()).isEqualTo(PestCondition.MonthPhase.LATE);
        assertThat(cond.getHumidityLevel()).isEqualTo(WeatherConditionCode.HumidityLevel.LOW);
        assertThat(cond.getTemperatureLevel()).isEqualTo(WeatherConditionCode.TemperatureLevel.LOW);
        assertThat(cond.getRainLevel()).isEqualTo(WeatherConditionCode.RainLevel.NONE);
    }

    @Test
    void PestRisk_생성_성공() {
        PestRisk risk = PestRisk.builder()
                .name("응애")
                .build();
        PestCondition cond = new PestCondition();
        Crop crop = new Crop();

        risk.assignCrop(crop);
        risk.addCondition(cond);

        assertThat(risk.getName()).isEqualTo("응애");
        assertThat(risk.getConditions().get(0)).isEqualTo(cond);
        assertThat(risk.getCrop()).isEqualTo(crop);
    }

    @Test
    void Crop_생성_성공() {
        Crop crop = new Crop();
        PestRisk risk = new PestRisk();
        crop.addPestRisk(risk);
        assertThat(crop.getPestRisks().get(0)).isEqualTo(risk);
    }

}
