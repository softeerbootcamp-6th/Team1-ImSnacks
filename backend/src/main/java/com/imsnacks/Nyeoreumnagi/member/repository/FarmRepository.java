package com.imsnacks.Nyeoreumnagi.member.repository;

import com.imsnacks.Nyeoreumnagi.member.entity.Farm;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface FarmRepository extends JpaRepository<Farm, Long> {
    Optional<Farm> findByMember_Id(Long memberId);

    @Query(value = """
        SELECT f.member_id AS member_id, ST_X(f.location) AS lon, ST_Y(f.location) AS lat
        FROM farm f
        WHERE f.member_id IN (:memberIds) AND f.location IS NOT NULL
        """, nativeQuery = true)
    List<Object[]> findMemberLocations(@Param("memberIds") List<Long> memberIds);

}
