package com.ImSnacks.NyeoreumnagiBatch.air_quality.writer;

import com.ImSnacks.NyeoreumnagiBatch.air_quality.processor.dto.AirQualityResponse;
import com.ImSnacks.NyeoreumnagiBatch.common.entity.UniqueNxNy;
import com.ImSnacks.NyeoreumnagiBatch.common.repository.DashboardTodayWeatherRepository;
import com.ImSnacks.NyeoreumnagiBatch.common.repository.UniqueNxNyRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.batch.item.Chunk;
import org.springframework.batch.item.ItemWriter;
import org.springframework.stereotype.Component;

import java.util.List;

@Slf4j
@Component
public class AirQualityWriter implements ItemWriter<AirQualityResponse> {
    private final UniqueNxNyRepository uniqueNxNyRepository;
    private final DashboardTodayWeatherRepository dashboardTodayWeatherRepository;

    public AirQualityWriter( UniqueNxNyRepository uniqueNxNyRepository, DashboardTodayWeatherRepository dashboardTodayWeatherRepository) {
        this.uniqueNxNyRepository = uniqueNxNyRepository;
        this.dashboardTodayWeatherRepository = dashboardTodayWeatherRepository;
    }

    @Override
    public void write(Chunk<? extends AirQualityResponse> chunk) throws Exception {
        log.info("Air Quality Response Chunk size: {}", chunk.size());

        chunk.getItems().forEach(item -> {
            int pm10Grade = item.pm10Grade();
            int pm10Value = item.pm10Value();
            int pm25Grade = item.pm25Grade();
            int pm25Value = item.pm25Value();

            List<UniqueNxNy> nxNyList = uniqueNxNyRepository.findByStationName(item.stationName());
            for(UniqueNxNy uniqueNxNy : nxNyList) {
                dashboardTodayWeatherRepository.updateAirQuality(
                        uniqueNxNy.getId().getNx(),
                        uniqueNxNy.getId().getNy(),
                        pm10Value,
                        pm25Value,
                        pm10Grade,
                        pm25Grade
                );
            }
        });

    }
}
