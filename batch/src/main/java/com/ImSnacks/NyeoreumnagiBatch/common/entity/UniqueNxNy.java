package com.ImSnacks.NyeoreumnagiBatch.common.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "unique_nx_ny", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"nx", "ny"})
})
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class UniqueNxNy {

    @EmbeddedId
    private NxNyId id;

    private String areaCode;
}