package com.imsnacks.Nyeoreumnagi.weather.util;

import com.imsnacks.Nyeoreumnagi.weather.dto.response.GetFcstRiskResponse;
import com.imsnacks.Nyeoreumnagi.weather.entity.WeatherRisk;
import com.imsnacks.Nyeoreumnagi.weather.service.LinePoint;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

public class WeatherRiskIntervalMerger {

    public static List<GetFcstRiskResponse.WeatherRiskDto> merge(List<WeatherRisk> risks) {
        List<LinePoint> points = getLinePoints(risks);
        Collections.sort(points);

        TreeSet<WeatherRisk> actives = new TreeSet<>(getRiskComparator());
        List<GetFcstRiskResponse.WeatherRiskDto> merged = new ArrayList<>();

        LocalDateTime lastTime = null;
        WeatherRisk showing = null;

        for (LinePoint p : points) {
            if (lastTime != null && lastTime.isBefore(p.time()) && showing != null) {
                addOrMergeInterval(merged, showing, lastTime, p.time());
            }
            if (p.isStart()) actives.add(p.risk());
            else actives.remove(p.risk());
            showing = actives.isEmpty() ? null : actives.first();
            lastTime = p.time();
        }
        return merged;
    }

    private static List<LinePoint> getLinePoints(List<WeatherRisk> risks) {
        List<LinePoint> points = new ArrayList<>();
        for (WeatherRisk r : risks) {
            points.add(new LinePoint(r.getStartTime(), true, r));
            points.add(new LinePoint(r.getEndTime(), false, r));
        }
        return points;
    }

    private static Comparator<WeatherRisk> getRiskComparator() {
        return Comparator.comparingInt((WeatherRisk r) -> r.getName().ordinal())
                .reversed()
                .thenComparingLong(WeatherRisk::getWeatherRiskId);
    }

    private static void addOrMergeInterval(List<GetFcstRiskResponse.WeatherRiskDto> merged, WeatherRisk risk, LocalDateTime start, LocalDateTime end) {
        String riskType = risk.getName().getDescription();

        LocalDateTime now = LocalDateTime.now();
        if(end.isBefore(now)) return;
        if(start.isAfter(now.plusDays(1).minusHours(1))) return;

        if(start.isBefore(now)) start = now;
        if(end.isAfter(now.plusDays(1)) || end.getHour() == now.plusDays(1).getHour()) end = now.plusDays(1).minusHours(1);

        String s = String.format("%02d", start.getHour());
        String e = String.format("%02d", end.getHour());
        if (!merged.isEmpty()) {
            GetFcstRiskResponse.WeatherRiskDto last = merged.get(merged.size() - 1);
            if (last.category().equals(riskType) && last.endTime().equals(s)) {
                merged.set(merged.size() - 1, new GetFcstRiskResponse.WeatherRiskDto(last.category(), last.startTime(), e));
                return;
            }
        }
        merged.add(new GetFcstRiskResponse.WeatherRiskDto(riskType, s, e));
    }
}
