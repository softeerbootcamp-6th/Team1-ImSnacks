package com.imsnacks.Nyeoreumnagi.lifecycle.repository;

import com.imsnacks.Nyeoreumnagi.lifecycle.entity.LifeCycle;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LifeCycleRepository extends JpaRepository<LifeCycle, Integer> {
    List<LifeCycle> findAllByCrop_IdOrderByStep(Long cropId);
}
