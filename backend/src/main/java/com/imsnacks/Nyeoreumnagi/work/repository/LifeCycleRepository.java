package com.imsnacks.Nyeoreumnagi.work.repository;

import com.imsnacks.Nyeoreumnagi.work.entity.LifeCycle;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LifeCycleRepository extends JpaRepository<LifeCycle, Integer> {
    List<LifeCycle> findAllByCrop_IdOrderByStep(Long cropId);
}
