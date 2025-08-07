package com.imsnacks.Nyeoreumnagi.weather.repository;

import com.imsnacks.Nyeoreumnagi.weather.entity.ShortTermWeatherForecast;
import com.imsnacks.Nyeoreumnagi.weather.entity.ShortTermWeatherForecastId;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ShortTermWeatherForecastRepository extends JpaRepository<ShortTermWeatherForecast, ShortTermWeatherForecastId> {
    List<ShortTermWeatherForecast> findAllByNxAndNy(int nx, int ny);
}
