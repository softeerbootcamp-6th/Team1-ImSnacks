package com.ImSnacks.NyeoreumnagiBatch.utils.weatherRiskFilter;

import com.ImSnacks.NyeoreumnagiBatch.dto.VilageFcstResponse;
import com.ImSnacks.NyeoreumnagiBatch.writer.dto.ShortTermWeatherDto;
import com.ImSnacks.NyeoreumnagiBatch.writer.entity.WeatherRiskType;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;

public abstract class WeatherRiskFilter {

    public abstract List<ShortTermWeatherDto.WeatherRiskDto> filtering(Map<String, List<VilageFcstResponse.Item>> metrics);

    protected List<ShortTermWeatherDto.WeatherRiskDto> groupingSameContinuousRisk(Map<Integer, WeatherRiskType> riskPerTime){
        List<ShortTermWeatherDto.WeatherRiskDto> risks = new ArrayList<>();

        if (!riskPerTime.isEmpty()) {
            List<Integer> sortedTimes = new ArrayList<>(riskPerTime.keySet());
            Collections.sort(sortedTimes);

            Integer startTime = null;
            Integer prevTime = null;
            WeatherRiskType currentType = null;

            for (Integer time : sortedTimes) {
                WeatherRiskType type = riskPerTime.get(time);
                if (currentType == null) {
                    startTime = time;
                    prevTime = time;
                    currentType = type;
                } else if (type.equals(currentType) && time == prevTime + 1) { // 연속되는 시간 & 같은 type
                    prevTime = time;
                } else {
                    risks.add(new ShortTermWeatherDto.WeatherRiskDto(startTime, prevTime, currentType));
                    startTime = time;
                    prevTime = time;
                    currentType = type;
                }
            }
            if (startTime != null && currentType != null) {
                risks.add(new ShortTermWeatherDto.WeatherRiskDto(startTime, prevTime, currentType));
            }
        }
        return risks;
    }
}
