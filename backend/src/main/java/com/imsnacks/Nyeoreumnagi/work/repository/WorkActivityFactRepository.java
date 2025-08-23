package com.imsnacks.Nyeoreumnagi.work.repository;

import com.imsnacks.Nyeoreumnagi.work.entity.WorkActivityFact;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.Collection;
import java.util.List;

import static com.imsnacks.Nyeoreumnagi.work.entity.WorkActivityFact.*;

public interface WorkActivityFactRepository extends JpaRepository<WorkActivityFact, Key> {
    @org.springframework.data.jpa.repository.Modifying
    @org.springframework.data.jpa.repository.Query(value = """
      INSERT IGNORE INTO work_activity_fact(day, work_id, tile, member_id)
      VALUES (:day, :workId, :tile, :memberId)
      """, nativeQuery = true)
    int insertIgnore(@org.springframework.data.repository.query.Param("day") java.time.LocalDate day,
                     @org.springframework.data.repository.query.Param("workId") long workId,
                     @org.springframework.data.repository.query.Param("tile") String tile,
                     @org.springframework.data.repository.query.Param("memberId") long memberId);


    // (on-read) 최근 3일 + 타일 집합에서 distinct member 후보 조회
    @Query(value = """
        SELECT DISTINCT member_id
        FROM work_activity_fact
        WHERE work_id = :workId
          AND day IN (:d0,:d1,:d2)
          AND tile IN (:tiles)
          AND member_id <> :currentMemberId
        """, nativeQuery = true)
    List<Long> findCandidateMemberIds(@Param("workId") long workId,
                                      @Param("currentMemberId") long currentMemberId,
                                      @Param("d0") LocalDate d0,
                                      @Param("d1") LocalDate d1,
                                      @Param("d2") LocalDate d2,
                                      @Param("tiles") Collection<String> tiles);
}