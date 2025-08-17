package com.imsnacks.Nyeoreumnagi.farm.repository;

import com.imsnacks.Nyeoreumnagi.farm.entity.MidTempRegionCode;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MidTempRegionCodeRepository extends JpaRepository<MidTempRegionCode, String> {
    Optional<MidTempRegionCode> findOneByRegionNameContaining(String regionName);
}
