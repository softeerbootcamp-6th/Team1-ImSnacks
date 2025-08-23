package com.imsnacks.Nyeoreumnagi.weather.entity;

import lombok.*;

import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class DashboardWeatherForecastId implements Serializable {
    private int nx;
    private int ny;
    private int fcstTime;
}
