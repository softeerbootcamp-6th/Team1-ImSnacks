package com.imsnacks.Nyeoreumnagi.weather.repository;

import com.imsnacks.Nyeoreumnagi.weather.entity.DashboardWeatherForecast;
import com.imsnacks.Nyeoreumnagi.weather.entity.DashboardWeatherForecastId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

public interface DashboardWeatherForecastRepository extends JpaRepository<DashboardWeatherForecast, DashboardWeatherForecastId> {
    List<DashboardWeatherForecast> findByNxAndNy(int nx, int ny);
    List<DashboardWeatherForecast> findByNxAndNyAndFcstTimeInOrderByFcstTime(int nx, int ny, List<Integer> fcstTimes);
}
