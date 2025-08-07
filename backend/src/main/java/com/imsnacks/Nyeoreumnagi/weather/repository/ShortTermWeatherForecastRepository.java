package com.imsnacks.Nyeoreumnagi.weather.repository;

import com.imsnacks.Nyeoreumnagi.weather.entity.ShortTermWeatherForecast;
import com.imsnacks.Nyeoreumnagi.weather.entity.ShortTermWeatherForecastId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ShortTermWeatherForecastRepository extends JpaRepository<ShortTermWeatherForecast, ShortTermWeatherForecastId> {
}
