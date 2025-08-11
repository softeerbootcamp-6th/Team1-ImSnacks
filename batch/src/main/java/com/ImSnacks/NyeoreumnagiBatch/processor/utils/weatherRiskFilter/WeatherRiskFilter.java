package com.ImSnacks.NyeoreumnagiBatch.processor.utils.weatherRiskFilter;

import com.ImSnacks.NyeoreumnagiBatch.processor.dto.VilageFcstItemsDto;
import com.ImSnacks.NyeoreumnagiBatch.writer.dto.ShortTermWeatherDto;
import com.ImSnacks.NyeoreumnagiBatch.writer.entity.WeatherRiskType;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;

public abstract class WeatherRiskFilter {

    public abstract List<ShortTermWeatherDto.WeatherRiskDto> filtering(Map<LocalDateTime, List<VilageFcstItemsDto>> metrics);

    protected List<ShortTermWeatherDto.WeatherRiskDto> groupingSameContinuousRisk(Map<LocalDateTime, WeatherRiskType> riskPerTime) {
        List<ShortTermWeatherDto.WeatherRiskDto> risks = new ArrayList<>();

        if (riskPerTime.isEmpty()) return risks;

        List<LocalDateTime> sortedTimes = new ArrayList<>(riskPerTime.keySet());
        Collections.sort(sortedTimes);

        LocalDateTime startTime = null;
        LocalDateTime prevTime = null;
        WeatherRiskType currentType = null;

        for (int i = 0; i < sortedTimes.size(); i++) {
            LocalDateTime dateTime = sortedTimes.get(i);
            WeatherRiskType type = riskPerTime.get(dateTime);

            if (currentType == null) {
                startTime = dateTime;
                prevTime = dateTime;
                currentType = type;
            } else if (type.equals(currentType) && prevTime.plusHours(1L).equals(dateTime)) {
                prevTime = dateTime;
            } else {
                risks.add(new ShortTermWeatherDto.WeatherRiskDto(startTime, prevTime, currentType));
                startTime = dateTime;
                prevTime = dateTime;
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

            if (first.getName() == last.getName() &&
                    last.getEndTime().plusHours(1L).equals(first.getStartTime())) {

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

}
