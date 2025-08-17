package com.imsnacks.Nyeoreumnagi.weather.repository;

import com.imsnacks.Nyeoreumnagi.weather.entity.DashboardWeatherForecast;
import com.imsnacks.Nyeoreumnagi.weather.entity.DashboardWeatherForecastId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DashboardWeatherForecastRepository extends JpaRepository<DashboardWeatherForecast, DashboardWeatherForecastId> {
}
