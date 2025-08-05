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

    protected List<ShortTermWeatherDto.WeatherRiskDto> groupingSameContinuousRisk(Map<Integer, WeatherRiskType> riskPerTime) {
        List<ShortTermWeatherDto.WeatherRiskDto> risks = new ArrayList<>();

        if (riskPerTime.isEmpty()) return risks;

        List<Integer> sortedTimes = new ArrayList<>(riskPerTime.keySet());
        Collections.sort(sortedTimes);

        Integer startTime = null;
        Integer prevTime = null;
        WeatherRiskType currentType = null;

        for (int i = 0; i < sortedTimes.size(); i++) {
            Integer time = sortedTimes.get(i);
            WeatherRiskType type = riskPerTime.get(time);

            if (currentType == null) {
                startTime = time;
                prevTime = time;
                currentType = type;
            } else if (type.equals(currentType) && isNextHour(prevTime, time)) {
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

        //23시와 0시는 연속된 숫자로 판별
        if (risks.size() >= 2) {
            ShortTermWeatherDto.WeatherRiskDto first = risks.get(0);
            ShortTermWeatherDto.WeatherRiskDto last = risks.get(risks.size() - 1);

            if (first.getStartTime() == 0 &&
                    last.getEndTime() == 23 &&
                    first.getName() == last.getName() &&
                    isNextHour(last.getEndTime(), first.getStartTime())) {

                ShortTermWeatherDto.WeatherRiskDto merged = new ShortTermWeatherDto.WeatherRiskDto(
                        last.getStartTime(), first.getEndTime(), first.getName()
                );
                risks.remove(risks.size() - 1);
                risks.remove(0);
                risks.add(0, merged);
            }
        }

        return risks;
    }

    private boolean isNextHour(int prev, int current) {
        return (prev + 1) % 24 == current;
    }
}
