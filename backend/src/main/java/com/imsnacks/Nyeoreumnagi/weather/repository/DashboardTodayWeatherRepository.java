package com.imsnacks.Nyeoreumnagi.weather.repository;

import com.imsnacks.Nyeoreumnagi.weather.entity.DashboardTodayWeather;
import com.imsnacks.Nyeoreumnagi.weather.entity.DashboardTodayWeatherId;
import com.imsnacks.Nyeoreumnagi.weather.service.projection_entity.*;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface DashboardTodayWeatherRepository extends JpaRepository<DashboardTodayWeather, DashboardTodayWeatherId> {
    Optional<SunriseSunSetTime> findSunRiseSetByNxAndNy(int nx, int ny);
    Optional<UVInfo> findUVByNxAndNy(int nx, int ny);
    Optional<WindInfo> findWindByNxAndNy(int nx, int ny);
    Optional<HumidityInfo> findHumidityByNxAndNy(int nx, int ny);
    Optional<PrecipitationInfo> findPrecipitationByNxAndNy(int nx, int ny);
}
