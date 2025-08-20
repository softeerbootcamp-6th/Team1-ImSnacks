package com.imsnacks.Nyeoreumnagi.work.repository;

import com.imsnacks.Nyeoreumnagi.work.entity.WorkActivityFact;
import org.springframework.data.jpa.repository.JpaRepository;

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
}