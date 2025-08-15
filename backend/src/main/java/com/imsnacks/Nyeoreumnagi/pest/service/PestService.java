package com.imsnacks.Nyeoreumnagi.pest.service;

import com.imsnacks.Nyeoreumnagi.pest.service.WeatherConditionCode.HumidityCode;
import com.imsnacks.Nyeoreumnagi.pest.service.WeatherConditionCode.TemperatureCode;
import com.imsnacks.Nyeoreumnagi.pest.service.WeatherConditionCode.RainCode;
import com.imsnacks.Nyeoreumnagi.weather.entity.ShortTermWeatherForecast;
import com.imsnacks.Nyeoreumnagi.weather.exception.WeatherException;
import com.imsnacks.Nyeoreumnagi.weather.exception.WeatherResponseStatus;
import com.imsnacks.Nyeoreumnagi.weather.repository.ShortTermWeatherForecastRepository;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class PestService {
    private final ShortTermWeatherForecastRepository fcstRepo;

    @NotNull
    private List<ShortTermWeatherForecast> getForecastList(final int nx, final int ny) {
        List<ShortTermWeatherForecast> ret = fcstRepo.findAllByNxAndNy(nx, ny);
        if (ret.isEmpty()) {
            throw new WeatherException(WeatherResponseStatus.NO_WEATHER_VALUE);
        }
        return ret;
    }
}
