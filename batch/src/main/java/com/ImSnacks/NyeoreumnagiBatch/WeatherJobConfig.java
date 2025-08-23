package com.ImSnacks.NyeoreumnagiBatch;

import com.ImSnacks.NyeoreumnagiBatch.common.entity.UniqueNxNy;
import com.ImSnacks.NyeoreumnagiBatch.seven_days_weather_forecast.processor.SevenDayTemperatureProcessor;
import com.ImSnacks.NyeoreumnagiBatch.seven_days_weather_forecast.processor.SevenDayWeatherConditionProcessor;
import com.ImSnacks.NyeoreumnagiBatch.seven_days_weather_forecast.reader.SevenDayTemperatureReader;
import com.ImSnacks.NyeoreumnagiBatch.seven_days_weather_forecast.reader.SevenDayWeatherConditionReader;
import com.ImSnacks.NyeoreumnagiBatch.seven_days_weather_forecast.writer.SevenDayTemperatureWriter;
import com.ImSnacks.NyeoreumnagiBatch.seven_days_weather_forecast.writer.SevenDayWeatherConditionWriter;
import com.ImSnacks.NyeoreumnagiBatch.shortTermWeatherForecast.ShadowTableInitTasklet;
import com.ImSnacks.NyeoreumnagiBatch.shortTermWeatherForecast.processor.ImprovedWeatherProcessor;
import com.ImSnacks.NyeoreumnagiBatch.shortTermWeatherForecast.processor.WeatherProcessor;
import com.ImSnacks.NyeoreumnagiBatch.shortTermWeatherForecast.reader.ImprovedWeatherReader;
import com.ImSnacks.NyeoreumnagiBatch.shortTermWeatherForecast.reader.NxNyPagingReader;
import com.ImSnacks.NyeoreumnagiBatch.shortTermWeatherForecast.reader.WeatherReader;
import com.ImSnacks.NyeoreumnagiBatch.shortTermWeatherForecast.reader.dto.VilageFcstResponseDto;
import com.ImSnacks.NyeoreumnagiBatch.shortTermWeatherForecast.writer.WeatherWriter;
import com.ImSnacks.NyeoreumnagiBatch.shortTermWeatherForecast.writer.dto.ShortTermWeatherDto;
import com.ImSnacks.NyeoreumnagiBatch.seven_days_weather_forecast.dto.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.job.builder.JobBuilder;
import org.springframework.batch.core.repository.JobRepository;
import org.springframework.batch.core.step.builder.StepBuilder;
import org.springframework.batch.item.ItemReader;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.task.TaskExecutor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.web.reactive.function.client.WebClientException;

import java.util.concurrent.CompletableFuture;

@Slf4j
@Configuration
@RequiredArgsConstructor
public class WeatherJobConfig {
    private final NxNyPagingReader nxNyPagingReader;
    private final ImprovedWeatherReader improvedWeatherReader;
    private final ImprovedWeatherProcessor improvedWeatherProcessor;
    private final WeatherReader weatherReader;
    private final WeatherWriter weatherWriter;
    private final WeatherProcessor weatherProcessor;
    private final SevenDayWeatherConditionReader sevenDayWeatherConditionReader;
    private final SevenDayWeatherConditionWriter sevenDayWeatherConditionWriter;
    private final SevenDayWeatherConditionProcessor sevenDayWeatherConditionProcessor;
    private final SevenDayTemperatureReader sevenDayTemperatureReader;
    private final SevenDayTemperatureProcessor sevenDayTemperatureProcessor;
    private final SevenDayTemperatureWriter sevenDayTemperatureWriter;

    @Bean
    public Job weatherJob(JobRepository jobRepository, Step weatherStep, Step shadowTableInitStep) {
        return new JobBuilder("weatherJob", jobRepository)
                .start(shadowTableInitStep)
                .next(weatherStep)
                .build();
    }

    @Bean
    public Job improvedWeatherJob(JobRepository jobRepository, Step improvedWeatherStep, Step shadowTableInitStep) {
        log.info("Starting ImprovedWeatherJob");
        return new JobBuilder("improvedWeatherJob", jobRepository)
                .start(shadowTableInitStep)
                .next(improvedWeatherStep)
                .build();
    }

    @Bean
    public Job sevenDayWeatherConditionJob(JobRepository jobRepository, Step sevenDayWeatherConditionStep) {
        return new JobBuilder("sevenDayWeatherConditionJob", jobRepository)
                .start(sevenDayWeatherConditionStep)
                .build();
    }

    @Bean
    public Job sevenDayTemperatureJob(JobRepository jobRepository, Step sevenDayTemperatureStep) {
        log.info("sevenDayTemperatureStep Start");
        return new JobBuilder("sevenDayTemperatureJob", jobRepository)
                .start(sevenDayTemperatureStep)
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

    @Bean
    public Step improvedWeatherStep(JobRepository jobRepository, PlatformTransactionManager transactionManager) throws Exception {
        return new StepBuilder("improvedWeatherStep", jobRepository)
                .<UniqueNxNy, ShortTermWeatherDto>chunk(20, transactionManager)
                .reader(improvedWeatherReader)
                .processor(improvedWeatherProcessor)
                .writer(weatherWriter)
                .build();
        /*
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        executor.setCorePoolSize(10);
        executor.setMaxPoolSize(10);
        executor.setThreadNamePrefix("weather-");
        executor.initialize();

        return new StepBuilder("imrovedWeatherStep", jobRepository)
                .<UniqueNxNy, ShortTermWeatherDto>chunk(20, transactionManager)
                .reader(nxNyPagingReader.pagingReader())
                .processor(improvedWeatherProcessor)
                .writer(weatherWriter)
                .faultTolerant()
                .retryLimit(3)
                .retry(WebClientException.class)
                .skipLimit(10)
                .skip(Exception.class)
                .taskExecutor(executor)
                .build();
                */
    }

    @Bean
    public Step shadowTableInitStep(JobRepository jobRepository, PlatformTransactionManager transactionManager,
                                    ShadowTableInitTasklet shadowTableInitTasklet) {
        return new StepBuilder("shadowTableInitStep", jobRepository)
                .tasklet(shadowTableInitTasklet, transactionManager)
                .build();
    }

    @Bean
    public Step sevenDayWeatherConditionStep(JobRepository jobRepository, PlatformTransactionManager transactionManager) {
        return new StepBuilder("sevenDayWeatherConditionStep", jobRepository)
                .<SevenDayWeatherForecastResponseDto, SevenDayWeatherConditionDto>chunk(10, transactionManager)
                .reader(sevenDayWeatherConditionReader)
                .processor(sevenDayWeatherConditionProcessor)
                .writer(sevenDayWeatherConditionWriter)
                .build();
    }

    @Bean
    public Step sevenDayTemperatureStep(JobRepository jobRepository, PlatformTransactionManager transactionManager) {
        return new StepBuilder("sevenDayTemperatureStep", jobRepository)
                .<SevenDayTemperatureForecastResponseDto, SevenDayTemperatureForecastDto>chunk(10, transactionManager)
                .reader(sevenDayTemperatureReader)
                .processor(sevenDayTemperatureProcessor)
                .writer(sevenDayTemperatureWriter)
                .build();
    }
}
