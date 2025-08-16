package com.imsnacks.Nyeoreumnagi.work.util;

import com.imsnacks.Nyeoreumnagi.weather.entity.ShortTermWeatherForecast;
import com.imsnacks.Nyeoreumnagi.work.dto.response.RecommendWorksResponse;
import com.imsnacks.Nyeoreumnagi.work.entity.RecommendedWork;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

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
                                                                                 LocalDateTime requestTime
    ) {
        LocalDateTime from =requestTime.truncatedTo(ChronoUnit.HOURS);

        List<ShortTermWeatherForecast> sorted = forecasts.stream()
                .sorted(Comparator.comparing(f -> toDateTimeWithRoll(from, f)))
                .toList();

        List<RecommendWorksResponse.RecommendedWorksResponse> result = new ArrayList<>();

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
                            result.add(new RecommendWorksResponse.RecommendedWorksResponse(
                                    work.getName(),
                                    work.getId(),
                                    winStart.toString(),
                                    prevOk.plusHours(1).toString(),
                                    work.getRecommendation(),
                                    0
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
                        result.add(new RecommendWorksResponse.RecommendedWorksResponse(
                                work.getName(),
                                work.getId(),
                                winStart.toString(),
                                prevOk.plusHours(1).toString(),
                                work.getRecommendation(),
                                0
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
                result.add(new RecommendWorksResponse.RecommendedWorksResponse(
                        work.getName(),
                        work.getId(),
                        winStart.toString(),
                        prevOk.plusHours(1).toString(),
                        work.getRecommendation(),
                        0
                ));
            }
        }

        return result;
    }

    private LocalDateTime toDateTimeWithRoll(LocalDateTime from, ShortTermWeatherForecast f) {
        int t = f.getFcstTime(); // 예: 0~23 또는 HHmm

        int hour, minute;
        if (t < 24) { // 0~23
            hour = t;
            minute = 0;
        } else { // HHmm
            hour = t / 100;
            minute = t % 100;
        }

        LocalDateTime dt = LocalDateTime.of(from.toLocalDate(), LocalTime.of(hour, minute));


        if (dt.isBefore(from)) {
            dt = dt.plusDays(1);
        }

        return dt;
    }

    public List<RecommendWorksResponse.RecommendedWorksResponse> windowsForWork(RecommendedWork work,
                                                                                 List<ShortTermWeatherForecast> forecasts,
                                                                                LocalDateTime requestDateTime
                                                                                ) {
        return windowsForWork(work, forecasts, 2, requestDateTime);
    }

}
