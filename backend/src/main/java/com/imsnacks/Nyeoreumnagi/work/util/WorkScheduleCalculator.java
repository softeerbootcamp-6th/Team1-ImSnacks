package com.imsnacks.Nyeoreumnagi.work.util;

import com.imsnacks.Nyeoreumnagi.weather.entity.ShortTermWeatherForecast;
import com.imsnacks.Nyeoreumnagi.work.dto.response.RecommendWorksResponse;
import com.imsnacks.Nyeoreumnagi.work.entity.RecommendedWork;
import org.springframework.stereotype.Component;

import java.time.Duration;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.temporal.ChronoUnit;
import java.util.*;
import java.util.function.BiConsumer;

@Component
public class WorkScheduleCalculator {
    private static final int HIGH_TEMP = 30;
    private static final int LOW_TEMP = 5;
    private static final int HIGH_HUMIDITY = 80;
    private static final int LOW_HUMIDITY = 30;
    private static final double STRONG_WIND = 14.0;
    private static final double RAIN_MM = 0.1;

    private static final int COOLDOWN_GAP_HOURS = 5;

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
                                                                                 int maxHours,
                                                                                 int neighborCount,
                                                                                 LocalDateTime requestTime
    ) {
        LocalDateTime from = requestTime.truncatedTo(ChronoUnit.HOURS);

        List<ShortTermWeatherForecast> sorted = forecasts.stream()
                .sorted(Comparator.comparing(f -> toDateTimeWithRoll(from, f)))
                .toList();

        Map<Long, List<RecommendWorksResponse.RecommendationDurations>> durationsByWorkId = new HashMap<>();

        LocalDateTime winStart = null;
        LocalDateTime prevOk   = null;
        LocalDateTime cooldownUntil = null;

        BiConsumer<LocalDateTime, LocalDateTime> closeWindow = (start, endExclusive) -> {
            int hours = (int) Duration.between(start, endExclusive).toHours();
            if (hours >= minHours) {
                durationsByWorkId
                        .computeIfAbsent(work.getId(), k -> new ArrayList<>())
                        .add(new RecommendWorksResponse.RecommendationDurations(
                                start.toString(),
                                endExclusive.toString(),
                                work.getRecommendation()
                        ));
            }
        };

        for (ShortTermWeatherForecast f : sorted) {
            LocalDateTime curr = toDateTimeWithRoll(from, f);

            // 쿨다운 중이면 스킵
            if (cooldownUntil != null && !curr.isBefore(cooldownUntil)) {
                // 쿨다운 끝이 현재와 같거나 이전이면 쿨다운 해제
                cooldownUntil = null;
            }
            if (cooldownUntil != null && curr.isBefore(cooldownUntil)) {
                // 쿨다운 기간 → 강제 끊김 상태 유지
                winStart = null;
                prevOk = null;
                continue;
            }

            boolean ok = meets(work, f);

            if (ok) {
                if (winStart == null) {
                    winStart = curr;
                    prevOk = curr;
                } else {
                    // 연속성 체크 (시간이 1시간 단위로 이어지는지)
                    if (prevOk.plusHours(1).equals(curr)) {
                        prevOk = curr;
                    } else {
                        // 불연속 → 이전 구간 닫기
                        closeWindow.accept(winStart, prevOk.plusHours(1));
                        winStart = curr;
                        prevOk = curr;
                    }
                }

                // 현재 구간 길이 계산
                int currLen = (int) Duration.between(winStart, prevOk.plusHours(1)).toHours();

                if (currLen >= maxHours) {
                    // 상한 도달 → 구간 닫고 5시간 쿨다운
                    LocalDateTime endExclusive = prevOk.plusHours(1);
                    closeWindow.accept(winStart, endExclusive);
                    cooldownUntil = endExclusive.plusHours(COOLDOWN_GAP_HOURS);
                    winStart = null;
                    prevOk = null;
                }

            } else {
                // 조건 불만족 → 진행 중 구간이 있으면 닫기
                if (winStart != null) {
                    closeWindow.accept(winStart, prevOk.plusHours(1));
                    winStart = null;
                    prevOk = null;
                }
            }
        }

        // 루프 종료 후 미종료 구간 처리
        if (winStart != null) {
            closeWindow.accept(winStart, prevOk.plusHours(1));
        }

        // 결과 매핑
        List<RecommendWorksResponse.RecommendedWorksResponse> result = new ArrayList<>();
        List<RecommendWorksResponse.RecommendationDurations> durations =
                durationsByWorkId.getOrDefault(work.getId(), Collections.emptyList());

        result.add(new RecommendWorksResponse.RecommendedWorksResponse(
                work.getName(),
                work.getId(),
                neighborCount,
                durations
        ));
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
        return windowsForWork(work, forecasts, 2, 4, neighborCount, requestDateTime);
    }

}
