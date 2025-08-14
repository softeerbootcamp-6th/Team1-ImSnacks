package com.imsnacks.Nyeoreumnagi.work.repository;

import com.imsnacks.Nyeoreumnagi.work.entity.MyCrop;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MyCropRepository extends JpaRepository<MyCrop, Long> {
    List<MyCrop> findAllByOrderByCrop_Id();
}
