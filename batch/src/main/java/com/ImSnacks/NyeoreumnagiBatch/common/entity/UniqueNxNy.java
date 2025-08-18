package com.ImSnacks.NyeoreumnagiBatch.common.entity;

import com.ImSnacks.NyeoreumnagiBatch.seven_days_weather_forecast.entity.MidTempRegionCode;
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

    @ManyToOne(fetch = FetchType.LAZY)
    private MidTempRegionCode regionCode;

    private String areaCode;
    private Double latitude;
    private Double longitude;

    private String stationName;
}
