package com.imsnacks.Nyeoreumnagi.work.repository;

import com.imsnacks.Nyeoreumnagi.work.entity.LifeCycleAndRecommendedWork;
import com.imsnacks.Nyeoreumnagi.work.entity.LifeCycleAndRecommendedWorkId;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LifeCycleAndRecommendedWorkRepository extends JpaRepository<LifeCycleAndRecommendedWork, LifeCycleAndRecommendedWorkId> {
    List<LifeCycleAndRecommendedWork> findAllByLifeCycle_Id(Long lifeCycleId);
}
