package com.ImSnacks.NyeoreumnagiBatch.DailyTemperature.reader;

import com.ImSnacks.NyeoreumnagiBatch.DailyTemperature.reader.dto.DailyTemperatureReaderResponseDto;
import com.ImSnacks.NyeoreumnagiBatch.common.entity.NxNy;
import com.ImSnacks.NyeoreumnagiBatch.common.entity.ShortTermWeatherForecast;
import com.ImSnacks.NyeoreumnagiBatch.common.repository.ShortTermWeatherForecastRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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
public class DailyTemperatureReader implements ItemReader<DailyTemperatureReaderResponseDto> {

    private final ShortTermWeatherForecastRepository shortTermWeatherForecastRepository;

    private static Map<NxNy, List<ShortTermWeatherForecast>> weatherInfos = null;
    private static Iterator<Map.Entry<NxNy, List<ShortTermWeatherForecast>>> iterator;

    @Override
    public DailyTemperatureReaderResponseDto read() throws Exception, UnexpectedInputException, ParseException, NonTransientResourceException {
        log.info("Reading DailyTemperature Entity");

        setLocation();
        if (iterator.hasNext()) {
            return new DailyTemperatureReaderResponseDto(iterator.next().getValue());
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
            iterator = weatherInfos.entrySet().iterator();
        }
    }
}
