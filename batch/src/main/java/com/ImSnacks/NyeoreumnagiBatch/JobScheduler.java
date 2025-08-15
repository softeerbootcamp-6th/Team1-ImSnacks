package com.ImSnacks.NyeoreumnagiBatch;

import com.ImSnacks.NyeoreumnagiBatch.common.params.JobParams;
import lombok.RequiredArgsConstructor;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.JobParameters;
import org.springframework.batch.core.launch.JobLauncher;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
@EnableScheduling
@RequiredArgsConstructor
public class JobScheduler {
    private final JobLauncher jobLauncher;

    @Qualifier("weatherJob")
    private final Job weatherJob;

    @Qualifier("uvJob")
    private final Job uvJob;

    @Qualifier("sunRiseSetJob")
    private final Job sunRiseSetJob;

    //2시부터 3시간 간격으로 15분마다 매일
    @Scheduled(cron = "0 15 2,5,8,11,14,17,20,23 * * *", zone = "Asia/Seoul")
    public void runWeatherJob() throws Exception {
        JobParameters params = JobParams.getWeatherJobParam();
        jobLauncher.run(weatherJob, params);
    }

    //매일 새벽 0시 1분에 실행
    @Scheduled(cron = "0 1 0 * * *", zone = "Asia/Seoul")
    public void runUVJob() throws Exception {
        JobParameters params = JobParams.getUVJobParam();
        jobLauncher.run(uvJob, params);
    }

    //매일 새벽 0시 1분에 실행
    @Scheduled(cron = "0 1 0 * * *", zone = "Asia/Seoul")
    public void runSunRiseSetJob() throws Exception {
        JobParameters params = JobParams.getSunRiseSetJobParam();
        jobLauncher.run(sunRiseSetJob, params);
    }
}
