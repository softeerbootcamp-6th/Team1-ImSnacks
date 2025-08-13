package com.ImSnacks.NyeoreumnagiBatch.ultraviolet.writer;

import com.ImSnacks.NyeoreumnagiBatch.common.entity.DashboardTodayWeather;
import com.ImSnacks.NyeoreumnagiBatch.common.entity.NxNy;
import com.ImSnacks.NyeoreumnagiBatch.common.repository.DashboardTodayWeatherRepository;
import com.ImSnacks.NyeoreumnagiBatch.ultraviolet.processor.dto.UVProcessorResponseDto;
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
public class UVWriter implements ItemWriter<UVProcessorResponseDto> {

    private final DashboardTodayWeatherRepository dashboardTodayWeatherRepository;

    public void write(Chunk<? extends UVProcessorResponseDto> chunk) throws Exception {
        log.info("Writing UV started");

        List<? extends UVProcessorResponseDto> items = chunk.getItems();
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

        for (UVProcessorResponseDto item : items) {
            NxNy key = new NxNy(item.nx(), item.ny());
            DashboardTodayWeather entity = existingMap.getOrDefault(key,
                    DashboardTodayWeather.builder()
                            .nx(item.nx())
                            .ny(item.ny())
                            .build()
            );

            entity.setMaxUVIndex(item.maxUVIndex());
            entity.setMaxUVStart(item.maxUVStartTime());
            entity.setMaxUVEnd(item.maxUVEndTime());
            entitiesToSave.add(entity);
        }

        dashboardTodayWeatherRepository.saveAll(entitiesToSave);
    }
}
