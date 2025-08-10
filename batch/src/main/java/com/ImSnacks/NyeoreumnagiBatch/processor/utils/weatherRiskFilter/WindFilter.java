package com.ImSnacks.NyeoreumnagiBatch.processor.utils.weatherRiskFilter;

import com.ImSnacks.NyeoreumnagiBatch.processor.dto.VilageFcstItemsDto;
import com.ImSnacks.NyeoreumnagiBatch.writer.dto.ShortTermWeatherDto;
import com.ImSnacks.NyeoreumnagiBatch.writer.entity.WeatherRiskType;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.function.Predicate;

@Component
public class WindFilter extends WeatherRiskFilter{
    private static final String metricCategory = "WSD";
    private static final Map<WeatherRiskType, Predicate<String>> weatherRiskMapper = Map.of(
            WeatherRiskType.STRONG_WIND, (value) -> Double.parseDouble(value) >= 14
    );

    @Override
    public List<ShortTermWeatherDto.WeatherRiskDto> filtering(Map<LocalDateTime, List<VilageFcstItemsDto>> metrics) {
        Map<LocalDateTime, WeatherRiskType> riskPerTime = new HashMap<>();
        metrics.forEach((k, v) -> {
            VilageFcstItemsDto item = v.stream()
                    .filter(i -> i.getCategory().equals(metricCategory))
                    .findFirst()
                    .orElse(null);

            if(item == null)
                return;

            for(Map.Entry<WeatherRiskType, Predicate<String>> entry : weatherRiskMapper.entrySet()){
                if(entry.getValue().test(item.getFcstValue())){
                    riskPerTime.put(k, entry.getKey());
                    break;
                }
            }
        });
        return groupingSameContinuousRisk(riskPerTime);
    }
}
