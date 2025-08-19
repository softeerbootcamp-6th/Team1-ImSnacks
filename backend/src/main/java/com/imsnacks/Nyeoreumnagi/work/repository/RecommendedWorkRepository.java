package com.imsnacks.Nyeoreumnagi.work.repository;

import com.imsnacks.Nyeoreumnagi.work.entity.RecommendedWork;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface RecommendedWorkRepository extends JpaRepository<RecommendedWork, Long> {
    @Query(value = """
             SELECT COUNT(DISTINCT mw.member_id) AS neighbor_count
                    FROM my_work mw
                    JOIN member m ON m.id = mw.member_id
                    JOIN farm   f ON f.member_id = m.id AND f.location IS NOT NULL
                    WHERE mw.recommended_work_id = :workId
                      -- KST 기준: 그제 00:00 <= start_time < 내일 00:00
                      AND mw.start_time >= DATE(NOW()) - INTERVAL 2 DAY
                      AND mw.start_time <  DATE(NOW()) + INTERVAL 1 DAY
                      AND ST_Distance_Sphere(
                            ST_SRID(f.location, 4326),
                            (SELECT ST_SRID(location, 4326) FROM farm WHERE member_id = :currentMemberId)
                          ) <= 5000
                      AND mw.member_id <> :currentMemberId
            """, nativeQuery = true)
    long countNearbySameWork(
            @Param("memberId") long memberId,
            @Param("workId") long workId
    );
}
