package com.imsnacks.Nyeoreumnagi.weather.service;

import com.imsnacks.Nyeoreumnagi.weather.entity.WeatherRisk;

import java.time.LocalDateTime;

public class LinePoint implements Comparable<LinePoint> {
    private final LocalDateTime time;
    private final boolean isStart;
    private final WeatherRisk risk;

    public LinePoint(LocalDateTime time, boolean isStart, WeatherRisk risk) {
        this.time = time;
        this.isStart = isStart;
        this.risk = risk;
    }
    public LocalDateTime time() { return time; }
    public boolean isStart() { return isStart; }
    public WeatherRisk risk() { return risk; }

    @Override
    public int compareTo(LinePoint o) {
        int cmp = this.time.compareTo(o.time);
        if (cmp != 0) return cmp;
        return Boolean.compare(!this.isStart, !o.isStart);
    }
}
