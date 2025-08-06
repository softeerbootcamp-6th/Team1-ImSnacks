package com.ImSnacks.NyeoreumnagiBatch.processor.utils.weatherRiskFilter;

import com.ImSnacks.NyeoreumnagiBatch.reader.dto.VilageFcstResponseDto;
import com.ImSnacks.NyeoreumnagiBatch.processor.utils.ForecastTimeUtils;
import com.ImSnacks.NyeoreumnagiBatch.writer.dto.ShortTermWeatherDto;
import com.ImSnacks.NyeoreumnagiBatch.writer.entity.WeatherRiskType;
import org.springframework.stereotype.Component;

import java.util.*;
import java.util.function.Predicate;

@Component
public class RainFilter extends WeatherRiskFilter{
    private static final String metricCategory = "PCP";
    private static final Map<WeatherRiskType, Predicate<String>> weatherRiskMapper = Map.of(
            WeatherRiskType.TORRENTIAL_RAIN, value -> value.equals("50.0mm 이상"),
            WeatherRiskType.HEAVY_RAIN, value -> value.equals("30.0~50.0mm"),
            WeatherRiskType.RAIN, value -> value.equals("1mm 미만") || value.matches("^(\\d+(\\.\\d+)?|\\.\\d+)mm$")
    );

    @Override
    public List<ShortTermWeatherDto.WeatherRiskDto> filtering(Map<String, List<VilageFcstResponseDto.Item>> metrics) {
        Map<Integer, WeatherRiskType> riskPerTime = new HashMap<>();
        metrics.forEach((k, v) -> {
            VilageFcstResponseDto.Item item = v.stream()
                    .filter(i -> i.getCategory().equals(metricCategory))
                    .findFirst()
                    .orElse(null);

            if(item == null)
                return;

            for(Map.Entry<WeatherRiskType, Predicate<String>> entry : weatherRiskMapper.entrySet()){
                if(entry.getValue().test(item.getFcstValue())){
                    riskPerTime.put(ForecastTimeUtils.getIntegerFromAPITime(k), entry.getKey());
                    break;
                }
            }
        });
        return groupingSameContinuousRisk(riskPerTime);
    }
}
