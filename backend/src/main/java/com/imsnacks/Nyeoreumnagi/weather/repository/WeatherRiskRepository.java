package com.imsnacks.Nyeoreumnagi.weather.repository;

import com.imsnacks.Nyeoreumnagi.weather.entity.WeatherRisk;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface WeatherRiskRepository extends JpaRepository<WeatherRisk, Long> {
    @Query("""
        SELECT wr
        FROM WeatherRisk wr
        WHERE wr.nx = :nx
          AND wr.ny = :ny
          AND wr.jobExecutionId = (
            SELECT MAX(swr.jobExecutionId)
            FROM WeatherRisk swr
            WHERE swr.nx = :nx AND swr.ny = :ny
          )
    """)
    List<WeatherRisk> findByNxAndNyWithMaxJobExecutionId(@Param("nx") int nx, @Param("ny") int ny);
}
