package com.ImSnacks.NyeoreumnagiBatch.dailyTemperature.processor;

import com.ImSnacks.NyeoreumnagiBatch.common.entity.ShortTermWeatherForecast;
import com.ImSnacks.NyeoreumnagiBatch.common.enums.WeatherCondition;
import com.ImSnacks.NyeoreumnagiBatch.dailyTemperature.processor.dto.DailyTemperatureProcessorResponseDto;
import com.ImSnacks.NyeoreumnagiBatch.dailyTemperature.reader.dto.DailyTemperatureReaderResponseDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.batch.item.ItemProcessor;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Component
public class DailyTemperatureProcessor implements ItemProcessor<DailyTemperatureReaderResponseDto, DailyTemperatureProcessorResponseDto> {
    @Override
    public DailyTemperatureProcessorResponseDto process(DailyTemperatureReaderResponseDto item) throws Exception {
        log.info("Processing Daily Temperature Processor");

        int nx = item.items().get(0).getNx();
        int ny = item.items().get(0).getNy();

        List<DailyTemperatureProcessorResponseDto.TemperaturePerTime> temperaturePerTimeList = new ArrayList<>();
        item.items().forEach(i -> {
            int temperature = i.getTemperature();
            int fcstTime = i.getFcstTime();
            WeatherCondition weatherCondition = getWeatherCondition(i);
            temperaturePerTimeList.add(new DailyTemperatureProcessorResponseDto.TemperaturePerTime(fcstTime, temperature, weatherCondition));
        });

        return new DailyTemperatureProcessorResponseDto(nx, ny, temperaturePerTimeList);
    }

    private WeatherCondition getWeatherCondition(ShortTermWeatherForecast item) {
        if(item.getSnow() > 1) return WeatherCondition.SNOW;
        if(item.getPrecipitation() >= 30) return WeatherCondition.HEAVY_RAIN;
        if(item.getPrecipitation() > 0) return WeatherCondition.RAIN;
        if(item.getFcstTime() > 6 && item.getFcstTime() < 18){
            if(item.getSkyStatus() == 1) return WeatherCondition.SUNNY;
            if(item.getSkyStatus() == 3) return WeatherCondition.LESS_CLOUDY;
            if(item.getSkyStatus() == 4) return WeatherCondition.CLOUDY;
        }
        else{
            if(item.getSkyStatus() == 1) return WeatherCondition.NIGHT;
            else return WeatherCondition.CLOUDY_NIGHT;
        }
        return WeatherCondition.SUNNY;
    }
}
