package com.ImSnacks.NyeoreumnagiBatch.utils.weatherRiskFilter;

import com.ImSnacks.NyeoreumnagiBatch.writer.dto.ShortTermWeatherDto;
import dto.VilageFcstResponse;

import java.util.ArrayList;
import java.util.List;

public class TemperatureFilter implements WeatherRiskFilter{
    @Override
    public List<ShortTermWeatherDto.WeatherRisk> filter(List<VilageFcstResponse.Item> metrics) {
        List<ShortTermWeatherDto.WeatherRisk> risks = new ArrayList<>();



        return risks;
    }
}
