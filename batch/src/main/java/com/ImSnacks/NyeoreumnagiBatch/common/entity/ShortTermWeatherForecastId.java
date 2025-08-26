package com.ImSnacks.NyeoreumnagiBatch.common.entity;

import lombok.*;

import java.io.Serializable;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class ShortTermWeatherForecastId implements Serializable {
    private int nx;
    private int ny;
    private LocalDateTime fcstTime;
}
