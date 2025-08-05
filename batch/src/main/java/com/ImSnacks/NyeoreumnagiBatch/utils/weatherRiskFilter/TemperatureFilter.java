package com.ImSnacks.NyeoreumnagiBatch.utils.weatherRiskFilter;

import com.ImSnacks.NyeoreumnagiBatch.dto.VilageFcstResponse;
import com.ImSnacks.NyeoreumnagiBatch.utils.ForecastTimeUtils;
import com.ImSnacks.NyeoreumnagiBatch.writer.dto.ShortTermWeatherDto;
import com.ImSnacks.NyeoreumnagiBatch.writer.entity.WeatherRiskType;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.function.BiPredicate;

@Component
public class TemperatureFilter extends WeatherRiskFilter{
    private static final String metricCategory = "TMP";
    private static final Map<WeatherRiskType, BiPredicate<String, String>> weatherRiskMapper = Map.of(
            WeatherRiskType.FROST, (value1, value2) -> Integer.parseInt(value1) <= -2 && Integer.parseInt(value2) <= -2,
            WeatherRiskType.ABNORMAL_HEAT, (value1, value2) -> Integer.parseInt(value1) >= 31
    );

    @Override
    public List<ShortTermWeatherDto.WeatherRiskDto> filtering(Map<String, List<VilageFcstResponse.Item>> metrics) {
        Map<Integer, WeatherRiskType> riskPerTime = new HashMap<>();

        List<Map.Entry<String, List<VilageFcstResponse.Item>>> entryList = new ArrayList<>(metrics.entrySet());
        for(int i =0;i<entryList.size();i++){
            Map.Entry<String, List<VilageFcstResponse.Item>> entry1 = entryList.get(i);
            VilageFcstResponse.Item item1 = entry1.getValue().stream()
                    .filter(it -> it.getCategory().equals(metricCategory))
                    .findFirst()
                    .orElse(null);

            Map.Entry<String, List<VilageFcstResponse.Item>> entry2 = entryList.get(i+1);
            VilageFcstResponse.Item item2 = entry2.getValue().stream()
                    .filter(it -> it.getCategory().equals(metricCategory))
                    .findFirst()
                    .orElse(null);

            if(item1 == null || item2 == null){
                continue;
            }

            for(Map.Entry<WeatherRiskType, BiPredicate<String, String>> entry : weatherRiskMapper.entrySet()){
                if(entry.getValue().test(item1.getFcstValue(), item2.getFcstValue())){
                    if(entry.getKey().equals(WeatherRiskType.FROST)){
                        riskPerTime.put(ForecastTimeUtils.getIntegerFromAPITime(entry1.getKey()), entry.getKey());
                        riskPerTime.put(ForecastTimeUtils.getIntegerFromAPITime(entry2.getKey()), entry.getKey());
                    }
                    riskPerTime.put(i, entry.getKey());
                }
            }
        }

        return groupingSameContinuousRisk(riskPerTime);
    }
}
