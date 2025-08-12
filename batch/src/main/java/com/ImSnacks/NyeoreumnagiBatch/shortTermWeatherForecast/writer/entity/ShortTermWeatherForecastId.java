package com.ImSnacks.NyeoreumnagiBatch.shortTermWeatherForecast.writer.entity;

import lombok.*;

import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class ShortTermWeatherForecastId implements Serializable {
    private int nx;
    private int ny;
    private int fcstTime;
}
