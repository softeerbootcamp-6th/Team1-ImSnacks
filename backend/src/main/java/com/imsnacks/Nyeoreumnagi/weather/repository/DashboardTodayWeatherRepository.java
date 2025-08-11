package com.imsnacks.Nyeoreumnagi.weather.repository;

import com.imsnacks.Nyeoreumnagi.weather.entity.DashboardTodayWeather;
import com.imsnacks.Nyeoreumnagi.weather.entity.DashboardTodayWeatherId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DashboardTodayWeatherRepository extends JpaRepository<DashboardTodayWeather, DashboardTodayWeatherId> {
}
