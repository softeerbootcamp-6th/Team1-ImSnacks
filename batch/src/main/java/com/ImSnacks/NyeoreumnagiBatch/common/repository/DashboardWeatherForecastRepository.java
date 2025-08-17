package com.ImSnacks.NyeoreumnagiBatch.common.repository;

import com.ImSnacks.NyeoreumnagiBatch.common.entity.DashboardWeatherForecast;
import com.ImSnacks.NyeoreumnagiBatch.common.entity.DashboardWeatherForecastId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DashboardWeatherForecastRepository extends JpaRepository<DashboardWeatherForecast, DashboardWeatherForecastId> {
}
