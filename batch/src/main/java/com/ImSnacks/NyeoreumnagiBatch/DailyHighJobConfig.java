package com.ImSnacks.NyeoreumnagiBatch;

import com.ImSnacks.NyeoreumnagiBatch.daily_high.processor.DailyHighProcessor;
import com.ImSnacks.NyeoreumnagiBatch.daily_high.processor.dto.DailyHighProcessorResponseDto;
import com.ImSnacks.NyeoreumnagiBatch.daily_high.reader.DailyHighReader;
import com.ImSnacks.NyeoreumnagiBatch.daily_high.reader.dto.DailyHighReaderResponseDto;
import com.ImSnacks.NyeoreumnagiBatch.daily_high.writer.DailyHighWriter;
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
public class DailyHighJobConfig {
    private final DailyHighReader dailyHighReader;
    private final DailyHighProcessor dailyHighProcessor;
    private final DailyHighWriter dailyHighWriter;

    @Bean
    public Job sunRiseSetJob(JobRepository jobRepository, Step dailyHighStep) {
        return new JobBuilder("dailyHighJob", jobRepository)
                .start(dailyHighStep)
                .build();
    }

    @Bean
    public Step dailyHighStep(JobRepository jobRepository, PlatformTransactionManager transactionManager) {
        return new StepBuilder("dailyHighStep", jobRepository)
                .<DailyHighReaderResponseDto, DailyHighProcessorResponseDto>chunk(100, transactionManager)
                .reader(dailyHighReader)
                .processor(dailyHighProcessor)
                .writer(dailyHighWriter)
                .build();
    }
}
