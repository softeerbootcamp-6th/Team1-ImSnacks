package com.ImSnacks.NyeoreumnagiBatch;

import com.ImSnacks.NyeoreumnagiBatch.dailyTemperature.processor.DailyTemperatureProcessor;
import com.ImSnacks.NyeoreumnagiBatch.dailyTemperature.processor.dto.DailyTemperatureProcessorResponseDto;
import com.ImSnacks.NyeoreumnagiBatch.dailyTemperature.reader.DailyTemperatureReader;
import com.ImSnacks.NyeoreumnagiBatch.dailyTemperature.reader.dto.DailyTemperatureReaderResponseDto;
import com.ImSnacks.NyeoreumnagiBatch.dailyTemperature.writer.DailyTemperatureWriter;
import lombok.RequiredArgsConstructor;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.job.builder.JobBuilder;
import org.springframework.batch.core.repository.JobRepository;
import org.springframework.batch.core.step.builder.StepBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.transaction.PlatformTransactionManager;

@Configuration
@RequiredArgsConstructor
public class DailyTemperatureJobConfig {
    private final DailyTemperatureReader dailyTemperatureReader;
    private final DailyTemperatureProcessor dailyTemperatureProcessor;
    private final DailyTemperatureWriter dailyTemperatureWriter;

    @Bean
    public Job dailyTemperatureJob(JobRepository jobRepository, Step dailyTemperatureStep) {
        return new JobBuilder("dailyTemperatureJob", jobRepository)
                .start(dailyTemperatureStep)
                .build();
    }

    @Bean
    public Step dailyTemperatureStep(JobRepository jobRepository, PlatformTransactionManager transactionManager) {
        return new StepBuilder("dailyTemperatureStep", jobRepository)
                .<DailyTemperatureReaderResponseDto, DailyTemperatureProcessorResponseDto>chunk(100, transactionManager)
                .reader(dailyTemperatureReader)
                .processor(dailyTemperatureProcessor)
                .writer(dailyTemperatureWriter)
                .build();
    }
}
