package com.ImSnacks.NyeoreumnagiBatch.common.repository;

import com.ImSnacks.NyeoreumnagiBatch.common.entity.DashboardTodayWeather;
import com.ImSnacks.NyeoreumnagiBatch.common.entity.DashboardTodayWeatherId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DashboardTodayWeatherRepository extends JpaRepository<DashboardTodayWeather, DashboardTodayWeatherId> {
}
