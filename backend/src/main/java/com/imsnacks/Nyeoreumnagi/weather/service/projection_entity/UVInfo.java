package com.imsnacks.Nyeoreumnagi.weather.service.projection_entity;

import java.time.LocalTime;

public interface UVInfo {
    int getMaxUVIndex();
    LocalTime getMaxUVStart();
    LocalTime getMaxUVEnd();
}
