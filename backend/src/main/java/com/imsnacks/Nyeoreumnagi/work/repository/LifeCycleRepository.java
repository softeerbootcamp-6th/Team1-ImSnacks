package com.imsnacks.Nyeoreumnagi.work.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.imsnacks.Nyeoreumnagi.lifecycle.entity.LifeCycle;
import java.util.List;

public interface LifeCycleRepository extends JpaRepository<LifeCycle, Integer> {
    List<LifeCycle> findAllByCrop_IdOrderByStep(Long cropId);
}
