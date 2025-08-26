package com.ImSnacks.NyeoreumnagiBatch.common.repository;

import com.ImSnacks.NyeoreumnagiBatch.common.entity.ShortTermWeatherForecastId;
import com.ImSnacks.NyeoreumnagiBatch.common.entity.ShortTermWeatherForecastShadow;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ShortTermWeatherForecastShadowRepository extends JpaRepository<ShortTermWeatherForecastShadow, ShortTermWeatherForecastId> {

}
