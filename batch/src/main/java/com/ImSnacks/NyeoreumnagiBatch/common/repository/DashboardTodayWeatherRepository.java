package com.ImSnacks.NyeoreumnagiBatch.common.repository;

import com.ImSnacks.NyeoreumnagiBatch.common.entity.DashboardTodayWeather;
import com.ImSnacks.NyeoreumnagiBatch.common.entity.DashboardTodayWeatherId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface DashboardTodayWeatherRepository extends JpaRepository<DashboardTodayWeather, DashboardTodayWeatherId> {
    @Query("""
   select d
   from DashboardTodayWeather d
   where d.nx in :nxList and d.ny in :nyList
""")
    List<DashboardTodayWeather> findByNxInAndNyIn(
            @Param("nxList") List<Integer> nxList,
            @Param("nyList") List<Integer> nyList
    );

    @Modifying(clearAutomatically = true)
    @Query("UPDATE DashboardTodayWeather dw SET dw.pm10Value = :pm10Value, dw.pm10Grade = :pm10Grade, " +
            "dw.pm25Value = :pm25Value, dw.pm25Grade = :pm25Grade " +
            "WHERE dw.nx = :nx AND dw.ny = :ny")
    int updateAirQuality(
            @Param("nx") int nx,
            @Param("ny") int ny,
            @Param("pm10Value") Integer pm10Value,
            @Param("pm25Value") Integer pm25Value,
            @Param("pm10Grade") Integer pm10Grade,
            @Param("pm25Grade") Integer pm25Grade
    );
}
