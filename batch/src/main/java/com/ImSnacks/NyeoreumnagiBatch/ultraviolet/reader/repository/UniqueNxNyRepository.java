package com.ImSnacks.NyeoreumnagiBatch.ultraviolet.reader.repository;

import com.ImSnacks.NyeoreumnagiBatch.shortTermWeatherForecast.reader.entity.NxNyId;
import com.ImSnacks.NyeoreumnagiBatch.shortTermWeatherForecast.reader.entity.UniqueNxNy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UniqueNxNyRepository extends JpaRepository<UniqueNxNy, NxNyId> {
    @Query("SELECT up.areaCode FROM UniqueNxNy up")
    List<String> findAreaCodes();
}
