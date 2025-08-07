package com.imsnacks.Nyeoreumnagi.weather.repository;

import com.imsnacks.Nyeoreumnagi.weather.entity.ShortTermWeatherForecast;
import com.imsnacks.Nyeoreumnagi.weather.entity.ShortTermWeatherForecastId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WeatherRepository extends JpaRepository<ShortTermWeatherForecast, ShortTermWeatherForecastId> {
}
