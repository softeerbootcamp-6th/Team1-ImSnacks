package com.ImSnacks.NyeoreumnagiBatch.writer.entity;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDate;

@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class SevenDayWeatherForecastId implements Serializable {
    private String regionCode;
    private LocalDate date;
}
