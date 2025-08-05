package com.ImSnacks.NyeoreumnagiBatch.utils.weatherRiskFilter;

import com.ImSnacks.NyeoreumnagiBatch.dto.VilageFcstResponse;
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



        return groupingSameContinuousRisk(riskPerTime);
    }
}
