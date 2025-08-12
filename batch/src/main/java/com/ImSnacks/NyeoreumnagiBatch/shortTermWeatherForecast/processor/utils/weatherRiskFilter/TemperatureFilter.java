package com.ImSnacks.NyeoreumnagiBatch.shortTermWeatherForecast.processor.utils.weatherRiskFilter;

import com.ImSnacks.NyeoreumnagiBatch.shortTermWeatherForecast.processor.dto.VilageFcstItemsDto;
import com.ImSnacks.NyeoreumnagiBatch.shortTermWeatherForecast.writer.dto.ShortTermWeatherDto;
import com.ImSnacks.NyeoreumnagiBatch.common.entity.WeatherRiskType;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.function.BiPredicate;

@Component
public class TemperatureFilter extends WeatherRiskFilter {
    private static final String metricCategory = "TMP";
    private static final Map<WeatherRiskType, BiPredicate<String, String>> weatherRiskMapper = Map.of(
            WeatherRiskType.FROST, (value1, value2) -> Integer.parseInt(value1) <= -2 && Integer.parseInt(value2) <= -2,
            WeatherRiskType.ABNORMAL_HEAT, (value1, value2) -> Integer.parseInt(value1) >= 31
    );

    @Override
    public List<ShortTermWeatherDto.WeatherRiskDto> filtering(Map<LocalDateTime, List<VilageFcstItemsDto>> metrics) {
        Map<LocalDateTime, WeatherRiskType> riskPerTime = new HashMap<>();

        List<Map.Entry<LocalDateTime, List<VilageFcstItemsDto>>> entryList = new ArrayList<>(metrics.entrySet());
        for (int i = 0; i < entryList.size(); i++) {
            Map.Entry<LocalDateTime, List<VilageFcstItemsDto>> entry1 = entryList.get(i);
            VilageFcstItemsDto item1 = entry1.getValue().stream()
                    .filter(it -> it.getCategory().equals(metricCategory))
                    .findFirst()
                    .orElse(null);

            if (item1 == null) {
                continue;
            }

            //마지막 요소는 이상고온 판단만 한다.
            if (i == entryList.size() - 1) {
                BiPredicate<String, String> abnormalHeatPredicate = weatherRiskMapper.get(WeatherRiskType.ABNORMAL_HEAT);
                if (abnormalHeatPredicate.test(item1.getFcstValue(), null)) {
                    riskPerTime.put(item1.fcstDateTime(), WeatherRiskType.ABNORMAL_HEAT);
                }
                continue;
            }

            Map.Entry<LocalDateTime, List<VilageFcstItemsDto>> entry2 = entryList.get(i + 1);
            VilageFcstItemsDto item2 = entry2.getValue().stream()
                    .filter(it -> it.getCategory().equals(metricCategory))
                    .findFirst()
                    .orElse(null);

            if (item2 == null) {
                continue;
            }

            for (Map.Entry<WeatherRiskType, BiPredicate<String, String>> entry : weatherRiskMapper.entrySet()) {
                if (entry.getValue().test(item1.getFcstValue(), item2.getFcstValue())) {
                    if (entry.getKey().equals(WeatherRiskType.FROST)) {
                        riskPerTime.put(entry1.getKey(), entry.getKey());
                        riskPerTime.put(entry2.getKey(), entry.getKey());
                    } else {
                        riskPerTime.put(entry1.getKey(), entry.getKey());
                    }
                    break;
                }
            }
        }

        return groupingSameContinuousRisk(riskPerTime);
    }
}
