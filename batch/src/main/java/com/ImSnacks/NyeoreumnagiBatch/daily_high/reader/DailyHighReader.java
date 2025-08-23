package com.ImSnacks.NyeoreumnagiBatch.daily_high.reader;

import com.ImSnacks.NyeoreumnagiBatch.common.entity.NxNy;
import com.ImSnacks.NyeoreumnagiBatch.common.entity.ShortTermWeatherForecast;
import com.ImSnacks.NyeoreumnagiBatch.common.repository.ShortTermWeatherForecastRepository;
import com.ImSnacks.NyeoreumnagiBatch.daily_high.reader.dto.DailyHighReaderResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.batch.core.configuration.annotation.StepScope;
import org.springframework.batch.item.ItemReader;
import org.springframework.batch.item.NonTransientResourceException;
import org.springframework.batch.item.ParseException;
import org.springframework.batch.item.UnexpectedInputException;
import org.springframework.stereotype.Component;

import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Slf4j
@Component
@RequiredArgsConstructor
@StepScope
public class DailyHighReader implements ItemReader<DailyHighReaderResponseDto> {

    private final ShortTermWeatherForecastRepository shortTermWeatherForecastRepository;

    private static Map<NxNy, List<ShortTermWeatherForecast>> weatherInfos = null;
    private Iterator<Map.Entry<NxNy, List<ShortTermWeatherForecast>>> iterator = null;

    @Override
    public DailyHighReaderResponseDto read() throws Exception, UnexpectedInputException, ParseException, NonTransientResourceException {
        log.info("Reading DailyHigh API response");

        setLocation();
        if (iterator.hasNext()) {
            return new DailyHighReaderResponseDto(iterator.next().getValue());
        } else {
            return null;
        }
    }

    private void setLocation(){
        if(weatherInfos == null) {
           weatherInfos = shortTermWeatherForecastRepository.findAll().stream()
                            .collect(Collectors.groupingBy(
                                    stw -> new NxNy(stw.getNx(), stw.getNy())
                            ));
        }
        if (iterator == null) {
            iterator = weatherInfos.entrySet().iterator();
        }
    }
}
