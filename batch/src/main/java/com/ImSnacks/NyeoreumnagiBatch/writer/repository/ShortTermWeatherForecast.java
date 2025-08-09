package com.ImSnacks.NyeoreumnagiBatch.writer.repository;

import com.ImSnacks.NyeoreumnagiBatch.writer.entity.ShortTermWeatherForecastId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ShortTermWeatherForecast extends JpaRepository<com.ImSnacks.NyeoreumnagiBatch.writer.entity.ShortTermWeatherForecast, ShortTermWeatherForecastId> {

}
