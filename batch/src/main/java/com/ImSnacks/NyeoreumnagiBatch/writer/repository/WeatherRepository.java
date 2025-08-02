package com.ImSnacks.NyeoreumnagiBatch.writer.repository;

import com.ImSnacks.NyeoreumnagiBatch.writer.entity.ShortTermWeatherForecast;
import com.ImSnacks.NyeoreumnagiBatch.writer.entity.ShortTermWeatherForecastId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WeatherRepository extends JpaRepository<ShortTermWeatherForecast, ShortTermWeatherForecastId> {

}
