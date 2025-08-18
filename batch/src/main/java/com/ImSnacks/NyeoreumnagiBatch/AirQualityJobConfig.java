package com.ImSnacks.NyeoreumnagiBatch;

import com.ImSnacks.NyeoreumnagiBatch.air_quality.processor.AirQualityProcessor;
import com.ImSnacks.NyeoreumnagiBatch.air_quality.processor.dto.AirQualityResponse;
import com.ImSnacks.NyeoreumnagiBatch.air_quality.reader.AirQualityReader;
import com.ImSnacks.NyeoreumnagiBatch.air_quality.writer.AirQualityWriter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.job.builder.JobBuilder;
import org.springframework.batch.core.repository.JobRepository;
import org.springframework.batch.core.step.builder.StepBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.transaction.PlatformTransactionManager;

@Slf4j
@Configuration
@RequiredArgsConstructor
public class AirQualityJobConfig {
    private final AirQualityReader airQualityReader;
    private final AirQualityProcessor airQualityProcessor;
    private final AirQualityWriter airQualityWriter;

    @Bean
    public Job airQualityJob(JobRepository jobRepository, Step airQualityStep) {
        return new JobBuilder("airQualityJob", jobRepository)
                .start(airQualityStep)
                .build();
    }

    @Bean
    public Step airQualityStep(JobRepository jobRepository, PlatformTransactionManager transactionManager) {
        return new StepBuilder("airQualityStep", jobRepository)
                .<AirQualityResponse, AirQualityResponse>chunk(10, transactionManager)
                .reader(airQualityReader)
                .processor(airQualityProcessor)
                .writer(airQualityWriter)
                .build();
    }
}
