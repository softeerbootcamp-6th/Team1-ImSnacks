package com.ImSnacks.NyeoreumnagiBatch;

import com.ImSnacks.NyeoreumnagiBatch.shortTermWeatherForecast.processor.WeatherProcessor;
import com.ImSnacks.NyeoreumnagiBatch.shortTermWeatherForecast.reader.WeatherReader;
import com.ImSnacks.NyeoreumnagiBatch.shortTermWeatherForecast.reader.dto.VilageFcstResponseDto;
import com.ImSnacks.NyeoreumnagiBatch.shortTermWeatherForecast.writer.WeatherWriter;
import com.ImSnacks.NyeoreumnagiBatch.shortTermWeatherForecast.writer.dto.ShortTermWeatherDto;
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
public class WeatherJobConfig {
    private final WeatherReader weatherReader;
    private final WeatherWriter weatherWriter;
    private final WeatherProcessor weatherProcessor;


    @Bean
    public Job weatherJob(JobRepository jobRepository, Step weatherStep) {
        return new JobBuilder("weatherJob", jobRepository)
                .start(weatherStep)
                .build();
    }

    @Bean
    public Step weatherStep(JobRepository jobRepository, PlatformTransactionManager transactionManager) {
        return new StepBuilder("weatherStep", jobRepository)
                .<VilageFcstResponseDto, ShortTermWeatherDto>chunk(100, transactionManager)
                .reader(weatherReader)
                .processor(weatherProcessor)
                .writer(weatherWriter)
                .build();
    }
}
