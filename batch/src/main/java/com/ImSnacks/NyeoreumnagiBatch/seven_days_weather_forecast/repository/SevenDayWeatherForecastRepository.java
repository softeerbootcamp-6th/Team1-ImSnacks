package com.ImSnacks.NyeoreumnagiBatch.seven_days_weather_forecast.repository;

import com.ImSnacks.NyeoreumnagiBatch.common.entity.SevenDayWeatherForecast;
import com.ImSnacks.NyeoreumnagiBatch.common.enums.WeatherCondition;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;

public interface SevenDayWeatherForecastRepository extends JpaRepository<SevenDayWeatherForecast, String> {
    @Modifying(clearAutomatically = true)
    @Transactional
    @Query("UPDATE SevenDayWeatherForecast sw SET sw.weatherCondition = :weatherCondition " +
            "WHERE sw.regionCode = :regionCode AND sw.date = :date")
    void updateWeatherByRegionAndDateTime(
            @Param("regionCode") String regionCode,
            @Param("date") LocalDate date,
            @Param("weatherCondition") WeatherCondition weatherCondition
    );
}
