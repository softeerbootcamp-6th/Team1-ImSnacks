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

    @Qualifier("dailyHighJob")
    private final Job dailyHighJob;

    @Qualifier("sevenDayTemperatureJob")
    private final Job sevenDayTemperatureJob;

    @Qualifier("sevenDayWeatherConditionJob")
    private final Job sevenDayWeatherConditionJob;

    @Qualifier("dailyTemperatureJob")
    private final Job dailyTemperatureJob;

    @Qualifier("airQualityJob")
    private final Job airQualityJob;

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

    //매일 새벽 0시 1분에 실행
    @Scheduled(cron = "0 1 0 * * *", zone = "Asia/Seoul")
    public void runDailyHighJob() throws Exception {
        JobParameters params = JobParams.getDailyJobParam();
        jobLauncher.run(dailyHighJob, params);
    }

    // "매일 오전 6시 30분에 실행"
    @Scheduled(cron = "0 30 6 * * *", zone = "Asia/Seoul")
    public void runSevenDayTemperatureJob() throws Exception {
        JobParameters params = JobParams.getSevenDayParam();
        jobLauncher.run(sevenDayTemperatureJob, params);
    }

    // "매일 오전 6시 45분에 실행"
    @Scheduled(cron = "0 45 6 * * *", zone = "Asia/Seoul")
    public void runSevenDayWeatherConditionJob() throws Exception {
        JobParameters params = JobParams.getSevenDayParam();
        jobLauncher.run(sevenDayWeatherConditionJob, params);
    }

    //매일 새벽 0시 1분에 실행
    @Scheduled(cron = "0 1 0 * * *", zone = "Asia/Seoul")
    public void runDailyTemperatureJob() throws Exception {
        JobParameters params = JobParams.getDailyJobParam();
        jobLauncher.run(dailyTemperatureJob, params);
    }

    //매일 새벽 0시 30분에 실행
    @Scheduled(cron = "0 30 0 * * *", zone = "Asia/Seoul")
    public void runAirQualityJob() throws Exception {
        JobParameters params = JobParams.getDailyJobParam();
        jobLauncher.run(airQualityJob, params);
    }
}
