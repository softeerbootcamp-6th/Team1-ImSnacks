package com.imsnacks.Nyeoreumnagi.lifecycle.repository;

import com.imsnacks.Nyeoreumnagi.work.entity.LifeCycleAndRecommendedWork;
import com.imsnacks.Nyeoreumnagi.work.entity.LifeCycleAndRecommendedWorkId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface LifeCycleAndRecommendedWorkRepository extends JpaRepository<LifeCycleAndRecommendedWork, LifeCycleAndRecommendedWorkId> {
    @Query("select lcr from LifeCycleAndRecommendedWork lcr join fetch lcr.recommendedWork where lcr.lifeCycle.id = :lifeCycleId")
    List<LifeCycleAndRecommendedWork> findAllByLifeCycle_Id(Long lifeCycleId);
}
