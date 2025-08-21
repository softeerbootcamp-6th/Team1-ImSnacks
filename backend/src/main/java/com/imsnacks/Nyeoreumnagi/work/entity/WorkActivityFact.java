package com.imsnacks.Nyeoreumnagi.work.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Immutable;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Immutable
@Entity
@Table(name = "work_activity_fact")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class WorkActivityFact {

    @EmbeddedId
    private Key id;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    public static WorkActivityFact of(LocalDate day, Long workId, String tile, Long memberId) {
        return new WorkActivityFact(new Key(day, workId, tile, memberId), null);
    }

    @Embeddable
    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @EqualsAndHashCode
    public static class Key implements Serializable {
        @Column(name = "day", nullable = false)
        private LocalDate day;

        @Column(name = "work_id", nullable = false)
        private Long workId;

        @Column(name = "tile", nullable = false, length = 16)
        private String tile;

        @Column(name = "member_id", nullable = false)
        private Long memberId;
    }
}