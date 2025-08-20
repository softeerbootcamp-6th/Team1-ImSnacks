package com.ImSnacks.NyeoreumnagiBatch.shortTermWeatherForecast;

import org.springframework.batch.core.StepContribution;
import org.springframework.batch.core.scope.context.ChunkContext;
import org.springframework.batch.core.step.tasklet.Tasklet;
import org.springframework.batch.repeat.RepeatStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

@Component
public class ShadowTableInitTasklet implements Tasklet {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public RepeatStatus execute(StepContribution contribution, ChunkContext chunkContext) throws Exception {
        jdbcTemplate.execute("CREATE TABLE IF NOT EXISTS short_term_weather_forecast_shadow LIKE short_term_weather_forecast");
        jdbcTemplate.execute("TRUNCATE TABLE short_term_weather_forecast_shadow");

        jdbcTemplate.execute("CREATE TABLE IF NOT EXISTS weather_risk_shadow LIKE weather_risk");
        jdbcTemplate.execute("TRUNCATE TABLE weather_risk_shadow");
        return RepeatStatus.FINISHED;
    }
}