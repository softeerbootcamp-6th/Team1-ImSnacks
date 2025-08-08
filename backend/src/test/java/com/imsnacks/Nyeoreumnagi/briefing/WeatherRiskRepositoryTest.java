package com.imsnacks.Nyeoreumnagi.briefing;

import com.imsnacks.Nyeoreumnagi.briefing.entity.WeatherRisk;
import com.imsnacks.Nyeoreumnagi.briefing.entity.WeatherRiskType;
import com.imsnacks.Nyeoreumnagi.briefing.repository.WeatherRiskRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;
import java.util.List;

import static org.assertj.core.api.Assertions.*;

@SpringBootTest
public class WeatherRiskRepositoryTest {
    @Autowired
    WeatherRiskRepository weatherRiskRepository;

    @AfterEach
    void cleanup() {
        weatherRiskRepository.deleteAll();
    }

    @Test
    void 리스크_저장_후_불러오기() {
        // given
        LocalDate today = LocalDate.now();
        int startHour = 5;
        int endHour = 7;
        WeatherRiskType riskType = WeatherRiskType.HEAVY_RAIN;
        WeatherRisk entity = WeatherRisk.builder()
                .fcstDate(LocalDate.now())
                .startTime(5)
                .endTime(7)
                .name(WeatherRiskType.HEAVY_RAIN)
                .build();
        weatherRiskRepository.save(entity);

        // when
        List<WeatherRisk> entities = weatherRiskRepository.findAll();

        // then
        WeatherRisk actual = entities.get(0);
        assertThat(actual.getStartTime()).isEqualTo(startHour);
        assertThat(actual.getEndTime()).isEqualTo(endHour);
        assertThat(actual.getName()).isEqualTo(riskType);
        assertThat(actual.getFcstDate()).isEqualTo(today);
    }
}
