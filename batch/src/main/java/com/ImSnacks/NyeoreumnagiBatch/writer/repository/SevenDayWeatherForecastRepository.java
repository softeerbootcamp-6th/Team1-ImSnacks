package com.ImSnacks.NyeoreumnagiBatch.writer.repository;

import com.ImSnacks.NyeoreumnagiBatch.writer.entity.SevenDayWeatherForecast;
import com.ImSnacks.NyeoreumnagiBatch.writer.entity.WeatherCondition;
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
