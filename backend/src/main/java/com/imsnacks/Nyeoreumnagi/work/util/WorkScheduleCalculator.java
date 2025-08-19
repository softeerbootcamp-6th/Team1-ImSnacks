package com.imsnacks.Nyeoreumnagi.work.util;

import com.imsnacks.Nyeoreumnagi.weather.entity.ShortTermWeatherForecast;
import com.imsnacks.Nyeoreumnagi.work.dto.response.RecommendWorksResponse;
import com.imsnacks.Nyeoreumnagi.work.entity.RecommendedWork;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.temporal.ChronoUnit;
import java.util.*;

@Component
public class WorkScheduleCalculator {
    private static final int HIGH_TEMP = 30;
    private static final int LOW_TEMP = 5;
    private static final int HIGH_HUMIDITY = 80;
    private static final int LOW_HUMIDITY = 30;
    private static final double STRONG_WIND = 14.0;
    private static final double RAIN_MM = 0.1;

    private boolean meets(RecommendedWork w, ShortTermWeatherForecast f) {
        boolean rain = f.getPrecipitation() >= RAIN_MM;
        boolean snow = rain && f.getTemperature() <= 0;
        boolean highT = f.getTemperature() >= HIGH_TEMP;
        boolean lowT = f.getTemperature() <= LOW_TEMP;
        boolean highH = f.getHumidity() >= HIGH_HUMIDITY;
        boolean lowH = f.getHumidity() <= LOW_HUMIDITY;
        boolean wind = f.getWindSpeed() >= STRONG_WIND;

        if (w.isRain() && rain) return false;
        if (w.isSnow() && snow) return false;
        if (w.isHighTemperature() && highT) return false;
        if (w.isLowTemperature() && lowT) return false;
        if (w.isHighHumidity() && highH) return false;
        if (w.isLowHumidity() && lowH) return false;
        return !w.isStrongWind() || !wind;
    }

    private List<RecommendWorksResponse.RecommendedWorksResponse> windowsForWork(RecommendedWork work,
                                                                                 List<ShortTermWeatherForecast> forecasts,
                                                                                 int minHours,
                                                                                 int neighborCount,
                                                                                 LocalDateTime requestTime
    ) {
        LocalDateTime from = requestTime.truncatedTo(ChronoUnit.HOURS);

        List<ShortTermWeatherForecast> sorted = forecasts.stream()
                .sorted(Comparator.comparing(f -> toDateTimeWithRoll(from, f)))
                .toList();

        Map<Long, List<RecommendWorksResponse.RecommendationDurations>> durationsByWorkId = new HashMap<>();
        LocalDateTime winStart = null;
        LocalDateTime prevOk = null;
        for (ShortTermWeatherForecast f : sorted) {
            boolean ok = meets(work, f);
            LocalDateTime curr = toDateTimeWithRoll(requestTime, f);

            if (ok) {
                if (winStart == null) {
                    winStart = curr;
                } else {
                    if (!prevOk.plusHours(1).equals(curr)) {
                        // 연속이 끊김 → 이전 구간 종료 처리
                        int hours = (int) java.time.Duration.between(winStart, prevOk.plusHours(1)).toHours();
                        if (hours >= minHours) {
                            // 기존 리스트에 추천 시간대 추가
                            durationsByWorkId.computeIfAbsent(work.getId(), k -> new ArrayList<>())
                                    .add(new RecommendWorksResponse.RecommendationDurations(
                                            winStart.toString(),
                                            prevOk.plusHours(1).toString(),
                                            work.getRecommendation()
                                    ));
                        }
                        winStart = curr;
                    }
                }
                prevOk = curr;
            } else {
                if (winStart != null) {
                    int hours = (int) java.time.Duration.between(winStart, prevOk.plusHours(1)).toHours();
                    if (hours >= minHours) {
                        // 기존 리스트에 추천 시간대 추가
                        durationsByWorkId.computeIfAbsent(work.getId(), k -> new ArrayList<>())
                                .add(new RecommendWorksResponse.RecommendationDurations(
                                        winStart.toString(),
                                        prevOk.plusHours(1).toString(),
                                        work.getRecommendation()
                                ));
                    }
                    winStart = null;
                    prevOk = null;
                }
            }
        }

        if (winStart != null) {
            int hours = (int) java.time.Duration.between(winStart, prevOk.plusHours(1)).toHours();
            if (hours >= minHours) {
                durationsByWorkId.computeIfAbsent(work.getId(), k -> new ArrayList<>())
                        .add(new RecommendWorksResponse.RecommendationDurations(
                                winStart.toString(),
                                prevOk.plusHours(1).toString(),
                                work.getRecommendation()
                        ));
            }
        }

        List<RecommendWorksResponse.RecommendedWorksResponse> result = new ArrayList<>();
        for (Map.Entry<Long, List<RecommendWorksResponse.RecommendationDurations>> entry : durationsByWorkId.entrySet()) {
            result.add(new RecommendWorksResponse.RecommendedWorksResponse(
                    work.getName(),
                    entry.getKey(),
                    neighborCount,
                    entry.getValue()
            ));
        }

        return result;
    }

    private LocalDateTime toDateTimeWithRoll(LocalDateTime from, ShortTermWeatherForecast f) {
        int t = f.getFcstTime(); // 예: 0~23
        LocalDateTime dt = LocalDateTime.of(from.toLocalDate(), LocalTime.of(t, 0));


        if (dt.isBefore(from)) {
            dt = dt.plusDays(1);
        }

        return dt;
    }

    public List<RecommendWorksResponse.RecommendedWorksResponse> windowsForWork(RecommendedWork work,
                                                                                List<ShortTermWeatherForecast> forecasts,
                                                                                int neighborCount,
                                                                                LocalDateTime requestDateTime
    ) {
        return windowsForWork(work, forecasts, 2, neighborCount, requestDateTime);
    }

}
