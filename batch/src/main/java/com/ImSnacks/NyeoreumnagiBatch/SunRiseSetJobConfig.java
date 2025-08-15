package com.ImSnacks.NyeoreumnagiBatch;

import com.ImSnacks.NyeoreumnagiBatch.sunRiseSet.processor.SunRiseSetProcessor;
import com.ImSnacks.NyeoreumnagiBatch.sunRiseSet.processor.dto.SunRiseSetProcessorResponseDto;
import com.ImSnacks.NyeoreumnagiBatch.sunRiseSet.reader.SunRiseSetReader;
import com.ImSnacks.NyeoreumnagiBatch.sunRiseSet.reader.dto.SunRiseSetReaderResponseDtoWithNxNy;
import com.ImSnacks.NyeoreumnagiBatch.sunRiseSet.writer.SunRiseSetWriter;
import com.ImSnacks.NyeoreumnagiBatch.ultraviolet.processor.dto.UVProcessorResponseDto;
import com.ImSnacks.NyeoreumnagiBatch.ultraviolet.reader.dto.UVReaderResponseDtoWithNxNy;
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
public class SunRiseSetJobConfig {
    private final SunRiseSetReader sunRiseSetReader;
    private final SunRiseSetProcessor sunRiseSetProcessor;
    private final SunRiseSetWriter sunRiseSetWriter;

    @Bean
    public Job sunRiseSetJob(JobRepository jobRepository, Step sunRiseSetStep) {
        return new JobBuilder("sunRiseSetJob", jobRepository)
                .start(sunRiseSetStep)
                .build();
    }

    @Bean
    public Step sunRiseSetStep(JobRepository jobRepository, PlatformTransactionManager transactionManager) {
        return new StepBuilder("sunRiseSetStep", jobRepository)
                .<SunRiseSetReaderResponseDtoWithNxNy, SunRiseSetProcessorResponseDto>chunk(100, transactionManager)
                .reader(sunRiseSetReader)
                .processor(sunRiseSetProcessor)
                .writer(sunRiseSetWriter)
                .build();
    }
}
