package com.ImSnacks.NyeoreumnagiBatch;

import lombok.RequiredArgsConstructor;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.JobParameters;
import org.springframework.batch.core.JobParametersBuilder;
import org.springframework.batch.core.launch.JobLauncher;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
@EnableScheduling
@RequiredArgsConstructor
public class WeatherJobScheduler {
    private final JobLauncher jobLauncher;
    private final Job weatherJob;

    //2시부터 3시간 간격으로 11분마다 매일
    @Scheduled(cron = "0 11 2,5,8,11,14,17,20,23 * * *")
    public void runWeatherJob() throws Exception {
        JobParameters params = new JobParametersBuilder()
                .addLong("timestamp", System.currentTimeMillis())  //일단 timeStamp를 parameter로 전달
                .toJobParameters();
        jobLauncher.run(weatherJob, params);
    }
}
