package com.imsnacks.Nyeoreumnagi.weather.repository;

import com.imsnacks.Nyeoreumnagi.weather.entity.SevenDayWeatherForecast;
import com.imsnacks.Nyeoreumnagi.weather.entity.SevenDayWeatherForecastId;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface SevenDayWeatherForecastRepository extends JpaRepository<SevenDayWeatherForecast, SevenDayWeatherForecastId> {
    List<SevenDayWeatherForecast> findByRegionCodeAndDateBetween(String regionCode, LocalDate startDate, LocalDate endDate);
}
