package com.ImSnacks.NyeoreumnagiBatch.air_quality.reader;

import com.ImSnacks.NyeoreumnagiBatch.air_quality.processor.dto.AirQualityResponse;
import com.ImSnacks.NyeoreumnagiBatch.common.repository.UniqueNxNyRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.batch.item.ItemReader;
import org.springframework.stereotype.Component;

import java.util.List;

@Slf4j
@Component
@RequiredArgsConstructor
public class AirQualityReader implements ItemReader<AirQualityResponse> {
    private final UniqueNxNyRepository uniqueNxNyRepository;
    private static List<String> stationNames = null;
    private final AirQualityApiCaller apiCaller;
    private static int index = 0;


    @Override
    public AirQualityResponse read() throws Exception {
        log.info("Reading Air Quality Data");
        if (stationNames == null) {
            setStationNames();
        }
        if (index >= stationNames.size()) {
            return null;
        }

        String stationName = stationNames.get(index);
        index++;

        try {
            log.info("index : {}", index);
            log.info("stationName : {}", stationName);

            return apiCaller.call(stationName);
        } catch (Exception e) {
            log.error("API 호출 중 오류!", e);
            throw e;
        }
    }

    private void setStationNames() {
        stationNames = uniqueNxNyRepository.findDistinctStationName();
    }
}
