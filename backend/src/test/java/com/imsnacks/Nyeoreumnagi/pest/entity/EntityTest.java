package com.imsnacks.Nyeoreumnagi.pest.entity;

import com.imsnacks.Nyeoreumnagi.pest.service.WeatherConditionCode;
import com.imsnacks.Nyeoreumnagi.work.entity.Crop;
import org.junit.jupiter.api.Test;

import java.time.Month;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

public class EntityTest {

    @Test
    void PestCondition_생성_성공() {
        PestCondition cond = PestCondition.builder()
                .startMonth(Month.APRIL)
                .startMonthPhase(PestCondition.MonthPhase.EARLY)
                .endMonth(Month.AUGUST)
                .endMonthPhase(PestCondition.MonthPhase.LATE)
                .humidityCode(WeatherConditionCode.HumidityCode.LOW)
                .temperatureCode(WeatherConditionCode.TemperatureCode.LOW)
                .rainCode(WeatherConditionCode.RainCode.NONE)
                .build();
        assertThat(cond.getStartMonth()).isEqualTo(Month.APRIL);
        assertThat(cond.getStartMonthPhase()).isEqualTo(PestCondition.MonthPhase.EARLY);
        assertThat(cond.getEndMonth()).isEqualTo(Month.AUGUST);
        assertThat(cond.getEndMonthPhase()).isEqualTo(PestCondition.MonthPhase.LATE);
        assertThat(cond.getHumidityCode()).isEqualTo(WeatherConditionCode.HumidityCode.LOW);
        assertThat(cond.getTemperatureCode()).isEqualTo(WeatherConditionCode.TemperatureCode.LOW);
        assertThat(cond.getRainCode()).isEqualTo(WeatherConditionCode.RainCode.NONE);
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
}
