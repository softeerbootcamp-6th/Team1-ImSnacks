package com.ImSnacks.NyeoreumnagiBatch;

import com.ImSnacks.NyeoreumnagiBatch.ultraviolet.processor.UVProcessor;
import com.ImSnacks.NyeoreumnagiBatch.ultraviolet.processor.dto.UVProcessorResponseDto;
import com.ImSnacks.NyeoreumnagiBatch.ultraviolet.reader.UVReader;
import com.ImSnacks.NyeoreumnagiBatch.ultraviolet.reader.dto.UVReaderResponseDtoWithNxNy;
import com.ImSnacks.NyeoreumnagiBatch.ultraviolet.writer.UVWriter;
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
public class UVJobConfig {
    private final UVReader uvReader;
    private final UVProcessor uvProcessor;
    private final UVWriter uvWriter;

    @Bean
    public Job weatherJob(JobRepository jobRepository, Step uvStep) {
        return new JobBuilder("uvJob", jobRepository)
                .start(uvStep)
                .build();
    }

    @Bean
    public Step uvStep(JobRepository jobRepository, PlatformTransactionManager transactionManager) {
        return new StepBuilder("uvStep", jobRepository)
                .<UVReaderResponseDtoWithNxNy, UVProcessorResponseDto>chunk(100, transactionManager)
                .reader(uvReader)
                .processor(uvProcessor)
                .writer(uvWriter)
                .build();
    }
}
