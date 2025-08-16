package com.ImSnacks.NyeoreumnagiBatch.seven_days_weather_forecast.repository;

import com.ImSnacks.NyeoreumnagiBatch.seven_days_weather_forecast.entity.MidTempRegionCode;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MidTempRegionCodeRepository extends JpaRepository<MidTempRegionCode, String> {
    List<MidTempRegionCode> findByLandRegionCode_RegId(String regId);
}
