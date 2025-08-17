package com.ImSnacks.NyeoreumnagiBatch.daily_high.processor;

import com.ImSnacks.NyeoreumnagiBatch.common.entity.ShortTermWeatherForecast;
import com.ImSnacks.NyeoreumnagiBatch.daily_high.exception.DailyHighProcessorException;
import com.ImSnacks.NyeoreumnagiBatch.daily_high.processor.dto.DailyHighProcessorResponseDto;
import com.ImSnacks.NyeoreumnagiBatch.daily_high.reader.dto.DailyHighReaderResponseDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.batch.item.ItemProcessor;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class DailyHighProcessor implements ItemProcessor<DailyHighReaderResponseDto, DailyHighProcessorResponseDto> {
    @Override
    public DailyHighProcessorResponseDto process(DailyHighReaderResponseDto item) throws Exception {
        log.info("Processing Daily High Processor");

        int nx = item.items().get(0).getNx();
        int ny = item.items().get(0).getNy();

        double maxPrecipitation = item.items().stream()
                .mapToDouble(ShortTermWeatherForecast::getPrecipitation)
                .max()
                .orElseThrow(() -> new DailyHighProcessorException("강수량 정보가 없어서 최대값을 계산할 수 없습니다."));

        int maxHumidity = item.items().stream()
                .mapToInt(ShortTermWeatherForecast::getHumidity)
                .max()
                .orElseThrow(() -> new DailyHighProcessorException("습도 정보가 없어서 최대값을 계산할 수 없습니다."));

        int maxTemperature = item.items().stream()
                .mapToInt(ShortTermWeatherForecast::getTemperature)
                .max()
                .orElseThrow(() -> new DailyHighProcessorException("기온 정보가 없어서 최대값을 계산할 수 없습니다."));

        double maxWindSpeed = item.items().stream()
                .mapToDouble(ShortTermWeatherForecast::getWindSpeed)
                .max()
                .orElseThrow(() -> new DailyHighProcessorException("풍속 정보가 없어서 최대값을 계산할 수 없습니다."));

        int windDirectionWhenWindSpeenMax = item.items().stream()
                .filter(weather -> weather.getWindSpeed() == maxWindSpeed)
                .findFirst()
                .map(ShortTermWeatherForecast::getWind_direction)
                .orElseThrow(() -> new DailyHighProcessorException("풍향 정보가 없어서 최대값을 계산할 수 없습니다."));

        return new DailyHighProcessorResponseDto(nx, ny, maxPrecipitation, maxHumidity, maxWindSpeed, windDirectionWhenWindSpeenMax, maxTemperature);
    }
}

