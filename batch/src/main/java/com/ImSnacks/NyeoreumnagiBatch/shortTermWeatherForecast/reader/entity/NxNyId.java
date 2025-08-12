package com.ImSnacks.NyeoreumnagiBatch.shortTermWeatherForecast.reader.entity;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Embeddable
@Getter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class NxNyId implements Serializable {

    private Integer nx;
    private Integer ny;
}