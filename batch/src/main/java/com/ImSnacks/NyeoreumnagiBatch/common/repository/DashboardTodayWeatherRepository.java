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
        where (d.nx, d.ny) in :coords
    """)
    List<DashboardTodayWeather> findByNxNyIn(@Param("coords") List<NxNy> coords);
}
