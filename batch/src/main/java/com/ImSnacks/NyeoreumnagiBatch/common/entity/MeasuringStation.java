package com.ImSnacks.NyeoreumnagiBatch.common.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class MeasuringStation {
    @Id
    String regionName;

    @Id
    String stationName;


}
