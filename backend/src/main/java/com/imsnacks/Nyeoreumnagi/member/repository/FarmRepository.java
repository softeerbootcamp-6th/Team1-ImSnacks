package com.imsnacks.Nyeoreumnagi.member.repository;

import com.imsnacks.Nyeoreumnagi.farm.entity.Farm;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface FarmRepository extends JpaRepository<Farm, Long> {
    Optional<Farm> findByMember_Id(Long memberId);
}
