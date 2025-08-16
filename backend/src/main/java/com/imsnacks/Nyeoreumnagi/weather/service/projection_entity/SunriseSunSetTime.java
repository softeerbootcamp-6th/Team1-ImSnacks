package com.imsnacks.Nyeoreumnagi.weather.service.projection_entity;

import java.time.LocalTime;

public interface SunriseSunSetTime {
    LocalTime getSunriseTime();
    LocalTime getSunSetTime();
}
