package com.imsnacks.Nyeoreumnagi.weather.service;

import com.imsnacks.Nyeoreumnagi.weather.entity.WeatherRisk;

public class LinePoint implements Comparable<LinePoint> {
    private final int time;
    private final boolean isStart;
    private final WeatherRisk risk;

    public LinePoint(int time, boolean isStart, WeatherRisk risk) {
        this.time = time;
        this.isStart = isStart;
        this.risk = risk;
    }
    public int time() { return time; }
    public boolean isStart() { return isStart; }
    public WeatherRisk risk() { return risk; }

    @Override
    public int compareTo(LinePoint o) {
        if (this.time != o.time) return Integer.compare(this.time, o.time);
        return Boolean.compare(!this.isStart, !o.isStart);
    }
}
