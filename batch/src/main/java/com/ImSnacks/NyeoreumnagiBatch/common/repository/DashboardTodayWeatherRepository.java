package com.ImSnacks.NyeoreumnagiBatch.common.repository;

import com.ImSnacks.NyeoreumnagiBatch.common.entity.DashboardTodayWeather;
import com.ImSnacks.NyeoreumnagiBatch.common.entity.DashboardTodayWeatherId;
import com.ImSnacks.NyeoreumnagiBatch.ultraviolet.writer.NxNy;
import org.springframework.data.jpa.repository.JpaRepository;
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
}
