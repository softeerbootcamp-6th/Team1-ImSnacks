package com.ImSnacks.NyeoreumnagiBatch.shortTermWeatherForecast.writer;

import com.ImSnacks.NyeoreumnagiBatch.common.entity.ShortTermWeatherForecastShadow;
import com.ImSnacks.NyeoreumnagiBatch.common.entity.WeatherRiskShadow;
import com.ImSnacks.NyeoreumnagiBatch.common.repository.ShortTermWeatherForecastShadowRepository;
import com.ImSnacks.NyeoreumnagiBatch.common.repository.WeatherRiskShadowRepository;
import com.ImSnacks.NyeoreumnagiBatch.shortTermWeatherForecast.writer.dto.ShortTermWeatherDto;
import com.ImSnacks.NyeoreumnagiBatch.common.entity.WeatherRisk;
import lombok.extern.slf4j.Slf4j;
import org.springframework.batch.core.ExitStatus;
import org.springframework.batch.core.StepExecution;
import org.springframework.batch.core.StepExecutionListener;
import org.springframework.batch.core.configuration.annotation.StepScope;
import org.springframework.batch.item.Chunk;
import org.springframework.batch.item.ItemWriter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Component
@StepScope
public class WeatherWriter implements ItemWriter<ShortTermWeatherDto>, StepExecutionListener {
    @Autowired
    private ShortTermWeatherForecastShadowRepository weatherShadowRepository;
    @Autowired
    private WeatherRiskShadowRepository weatherRiskShadowRepository;
    @Autowired
    private JdbcTemplate jdbcTemplate;

    private Long jobExecutionId;

    @Override
    public void beforeStep(StepExecution stepExecution) {
        this.jobExecutionId = stepExecution.getJobExecution().getId();
    }

    @Override
    public void write(Chunk<? extends ShortTermWeatherDto> chunk) {
        log.info("writing data...");
        List<ShortTermWeatherForecastShadow> forecasts = new ArrayList<>();
        List<WeatherRiskShadow> weatherRisks = new ArrayList<>();

        List<? extends ShortTermWeatherDto> items = chunk.getItems();
        items.forEach(item -> {
            item.getWeatherForecastByTimeList().forEach(weatherForecastByTime -> {
                forecasts.add(ShortTermWeatherForecastShadow.builder()
                        .nx(item.getNx())
                        .ny(item.getNy())
                        .fcstTime(weatherForecastByTime.getFcstTime())
                        .precipitation(weatherForecastByTime.getPrecipitation())
                        .temperature(weatherForecastByTime.getTemperature())
                        .humidity(weatherForecastByTime.getHumidity())
                        .windSpeed(weatherForecastByTime.getWindSpeed())
                        .snow(weatherForecastByTime.getSnow())
                        .skyStatus(weatherForecastByTime.getSkyStatus())
                        .wind_direction(weatherForecastByTime.getWindDirection())
                        .build());
            });

            item.getWeatherRiskList().forEach(weatherRisk -> {
                weatherRisks.add(WeatherRiskShadow.builder()
                        .name(weatherRisk.getName())
                        .jobExecutionId(jobExecutionId)
                        .startTime(weatherRisk.getStartTime())
                        .endTime(weatherRisk.getEndTime())
                        .nx(item.getNx())
                        .ny(item.getNy())
                        .build());
            });

        });
        weatherShadowRepository.saveAll(forecasts);
        weatherRiskShadowRepository.saveAll(weatherRisks);
    }

    @Override
    public ExitStatus afterStep(StepExecution stepExecution) {
        boolean stepSucceeded = stepExecution.getExitStatus().equals(ExitStatus.COMPLETED)
                && stepExecution.getFailureExceptions().isEmpty();

        if (!stepSucceeded) {
            log.warn("afterStep: Step이 실패해서 후처리 작업을 SKIP합니다. 현재 상태: {}", stepExecution.getExitStatus());
            return stepExecution.getExitStatus();
        }

        log.info("afterStep: shadow 테이블 rename 작업 시작");

        LocalDateTime nowHour = LocalDateTime.now()
                .withMinute(0)
                .withSecond(0)
                .withNano(0);
        Timestamp nowFcstTime = Timestamp.valueOf(nowHour);

        Timestamp now = Timestamp.valueOf(LocalDateTime.now());

        String sql = "INSERT INTO short_term_weather_forecast_shadow ( " +
                "fcst_time, nx, ny, humidity, precipitation, sky_status, snow, temperature, update_at, wind_speed, wind_direction " +
                ") SELECT fcst_time, nx, ny, humidity, precipitation, sky_status, snow, temperature, ?, wind_speed, wind_direction " +
                "FROM short_term_weather_forecast " +
                "WHERE fcst_time = ?";

        jdbcTemplate.update(sql, now, nowFcstTime);

        try {
            jdbcTemplate.execute("DROP TABLE IF EXISTS short_term_weather_forecast_backup");
            jdbcTemplate.execute("RENAME TABLE short_term_weather_forecast TO short_term_weather_forecast_backup, " +
                    "short_term_weather_forecast_shadow TO short_term_weather_forecast");
            jdbcTemplate.execute("DROP TABLE IF EXISTS weather_risk_backup");
            jdbcTemplate.execute("RENAME TABLE weather_risk TO weather_risk_backup, " +
                    "weather_risk_shadow TO weather_risk");
            log.info("테이블 rename 성공");
        } catch (Exception e) {
            log.error("테이블 rename 실패", e);
            return ExitStatus.FAILED;
        }

        return ExitStatus.COMPLETED;
    }
}
