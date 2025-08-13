package com.ImSnacks.NyeoreumnagiBatch.sunRiseSet.writer;

import com.ImSnacks.NyeoreumnagiBatch.common.entity.DashboardTodayWeather;
import com.ImSnacks.NyeoreumnagiBatch.common.repository.DashboardTodayWeatherRepository;
import com.ImSnacks.NyeoreumnagiBatch.sunRiseSet.processor.dto.SunRiseSetProcessorResponseDto;
import com.ImSnacks.NyeoreumnagiBatch.common.entity.NxNy;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.batch.item.Chunk;
import org.springframework.batch.item.ItemWriter;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Slf4j
@Component
@RequiredArgsConstructor
public class SunRiseSetWriter implements ItemWriter<SunRiseSetProcessorResponseDto> {

    private final DashboardTodayWeatherRepository dashboardTodayWeatherRepository;

    @Override
    public void write(Chunk<? extends SunRiseSetProcessorResponseDto> chunk) throws Exception {
        log.info("Writing SunRiseSet started");

        List<? extends SunRiseSetProcessorResponseDto> items = chunk.getItems();
        List<Integer> nxList = items.stream()
                .map(i -> i.nx())
                .toList();
        List<Integer> nyList = items.stream()
                .map(i -> i.ny())
                .toList();

        Map<NxNy, DashboardTodayWeather> existingMap = dashboardTodayWeatherRepository
                .findByNxInAndNyIn(nxList, nyList).stream()
                .collect(Collectors.toMap(
                        e -> new NxNy(e.getNx(), e.getNy()),
                        e -> e
                ));

        List<DashboardTodayWeather> entitiesToSave = new ArrayList<>();
        for (SunRiseSetProcessorResponseDto item : items) {
            NxNy key = new NxNy(item.nx(), item.ny());
            DashboardTodayWeather entity = existingMap.getOrDefault(key,
                    DashboardTodayWeather.builder()
                            .nx(item.nx())
                            .ny(item.ny())
                            .build()
            );

            entity.setSunriseTime(item.sunRise());
            entity.setSunSetTime(item.sunSet());
            entitiesToSave.add(entity);
        }

        dashboardTodayWeatherRepository.saveAll(entitiesToSave);
    }
}
