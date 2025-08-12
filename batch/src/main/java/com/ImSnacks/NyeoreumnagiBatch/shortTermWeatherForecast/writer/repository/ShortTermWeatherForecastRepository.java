package com.ImSnacks.NyeoreumnagiBatch.shortTermWeatherForecast.writer.repository;

import com.ImSnacks.NyeoreumnagiBatch.shortTermWeatherForecast.writer.entity.ShortTermWeatherForecast;
import com.ImSnacks.NyeoreumnagiBatch.shortTermWeatherForecast.writer.entity.ShortTermWeatherForecastId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ShortTermWeatherForecastRepository extends JpaRepository<ShortTermWeatherForecast, ShortTermWeatherForecastId> {

}
