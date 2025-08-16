package com.ImSnacks.NyeoreumnagiBatch.common.repository;

import com.ImSnacks.NyeoreumnagiBatch.common.entity.ShortTermWeatherForecast;
import com.ImSnacks.NyeoreumnagiBatch.common.entity.ShortTermWeatherForecastId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ShortTermWeatherForecastRepository extends JpaRepository<ShortTermWeatherForecast, ShortTermWeatherForecastId> {

}
