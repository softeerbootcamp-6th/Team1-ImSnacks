package com.ImSnacks.NyeoreumnagiBatch.utils.weatherRiskFilter;

import com.ImSnacks.NyeoreumnagiBatch.writer.dto.ShortTermWeatherDto;
import dto.VilageFcstResponse;

import java.util.List;

public interface WeatherRiskFilter {
    List<ShortTermWeatherDto.WeatherRisk> filter(List<VilageFcstResponse.Item> metrics);
}
