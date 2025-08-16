package com.imsnacks.Nyeoreumnagi.work.repository;

import com.imsnacks.Nyeoreumnagi.work.entity.MyWork;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface MyWorkRepository extends JpaRepository<MyWork, Long> {
    List<MyWork> findByMember_IdAndStartTimeAfter(Long memberId, LocalDateTime startTimeAfter);

    List<MyWork> findByMember_IdAndStartTimeBetween(Long memberId, LocalDateTime startTimeAfter, LocalDateTime startTimeBefore);
}
