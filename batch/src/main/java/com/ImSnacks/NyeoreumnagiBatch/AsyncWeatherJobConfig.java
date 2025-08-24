package com.ImSnacks.NyeoreumnagiBatch;

import com.ImSnacks.NyeoreumnagiBatch.common.entity.UniqueNxNy;
import com.ImSnacks.NyeoreumnagiBatch.shortTermWeatherForecast.processor.ImprovedWeatherProcessor;
import com.ImSnacks.NyeoreumnagiBatch.shortTermWeatherForecast.reader.UniqueNxNyReader;
import com.ImSnacks.NyeoreumnagiBatch.shortTermWeatherForecast.writer.WeatherWriter;
import com.ImSnacks.NyeoreumnagiBatch.shortTermWeatherForecast.writer.dto.ShortTermWeatherDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.job.builder.JobBuilder;
import org.springframework.batch.core.repository.JobRepository;
import org.springframework.batch.core.step.builder.StepBuilder;
import org.springframework.batch.integration.async.AsyncItemProcessor;
import org.springframework.batch.integration.async.AsyncItemWriter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.task.SimpleAsyncTaskExecutor;
import org.springframework.transaction.PlatformTransactionManager;

import java.util.concurrent.Future;

@Slf4j
@Configuration
public class AsyncWeatherJobConfig {
    @Autowired
    private final UniqueNxNyReader reader;
    @Autowired
    private final ImprovedWeatherProcessor processor;
    @Autowired
    private final WeatherWriter writer;

    @Bean
    public Job asyncWeatherJob(JobRepository jobRepository, Step shadowTableInitStep, Step asyncWeatherStep) {
        var builder = new JobBuilder("asyncWeatherJob", jobRepository)
                .start(shadowTableInitStep)
                .next(asyncWeatherStep);
        return builder.build();
    }

    @Bean
    public Step asyncWeatherStep(JobRepository jobRepository, PlatformTransactionManager transactionManager) {
        var builder = new StepBuilder("asyncWeatherStep", jobRepository)
                .<UniqueNxNy, Future<ShortTermWeatherDto>>chunk(100, transactionManager)
                .reader(reader)
                .processor(asyncItemProcessor())
                .writer(asyncItemWriter());
        return builder.build();
    }

    public AsyncWeatherJobConfig(UniqueNxNyReader itemReader, ImprovedWeatherProcessor processor, WeatherWriter writer) {
        this.reader = itemReader;
        this.processor = processor;
        this.writer = writer;
    }

    @Bean
    public AsyncItemProcessor<UniqueNxNy, ShortTermWeatherDto> asyncItemProcessor() {
        var asyncProcessor = new AsyncItemProcessor<UniqueNxNy, ShortTermWeatherDto>();
        asyncProcessor.setDelegate(processor);
        asyncProcessor.setTaskExecutor(new SimpleAsyncTaskExecutor());
        return asyncProcessor;
    }

    @Bean
    public AsyncItemWriter<ShortTermWeatherDto> asyncItemWriter() {
        var asyncItemWriter = new AsyncItemWriter<ShortTermWeatherDto>();
        asyncItemWriter.setDelegate(writer);
        return asyncItemWriter;
    }
}
