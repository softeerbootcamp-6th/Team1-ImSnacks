package com.imsnacks.Nyeoreumnagi.work.util;

import com.imsnacks.Nyeoreumnagi.weather.entity.ShortTermWeatherForecast;
import com.imsnacks.Nyeoreumnagi.work.dto.response.RecommendWorksResponse;
import com.imsnacks.Nyeoreumnagi.work.entity.RecommendedWork;
import org.springframework.stereotype.Component;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.*;

@Component
public class WorkScheduleCalculator {
    private static final int HIGH_TEMP = 30;
    private static final int LOW_TEMP = 5;
    private static final int HIGH_HUMIDITY = 80;
    private static final int LOW_HUMIDITY = 30;
    private static final double STRONG_WIND = 14.0;
    private static final double RAIN_MM = 3;

    private static final int COOLDOWN_GAP_HOURS = 4;
    private static final int MINIMUM_WORK_DURATION = 2;
    private static final int MAXIMUM_WORK_DURATION = 4;

    public List<RecommendWorksResponse.RecommendedWorksResponse> windowsForWork(
            RecommendedWork work,
            List<ShortTermWeatherForecast> forecasts,
            int neighborCount,
            LocalDateTime requestDateTime
    ) {
        List<ShortTermWeatherForecast> sortedForecasts = forecasts.stream()
                .filter(forecast -> forecast.getFcstTime().isAfter(requestDateTime.minusHours(1)) && forecast.getFcstTime().isBefore(requestDateTime.minusHours(2).plusDays(1)))
                .sorted(Comparator.comparing(ShortTermWeatherForecast::getFcstTime))
                .toList();

        List<RecommendWorksResponse.RecommendationDurations> durations =
                calculateDurations(work, sortedForecasts);

        List<RecommendWorksResponse.RecommendedWorksResponse> result = new ArrayList<>();
        result.add(new RecommendWorksResponse.RecommendedWorksResponse(
                work.getName(),
                work.getId(),
                neighborCount,
                durations
        ));
        return result;
    }

    private List<RecommendWorksResponse.RecommendationDurations> calculateDurations(
            RecommendedWork work,
            List<ShortTermWeatherForecast> forecasts
    ) {
        List<RecommendWorksResponse.RecommendationDurations> durations = new ArrayList<>();
        LocalDateTime windowStart = null;
        LocalDateTime prevOkTime = null;
        LocalDateTime cooldownUntil = null;

        for (ShortTermWeatherForecast f : forecasts) {
            LocalDateTime currentTime = f.getFcstTime();

            if (cooldownUntil != null && !currentTime.isBefore(cooldownUntil)) {
                cooldownUntil = null;
            }
            if (cooldownUntil != null) {
                windowStart = null;
                prevOkTime = null;
                continue;
            }

            boolean isWorkPossible = meets(work, f);

            if (isWorkPossible) {
                if (windowStart == null) {
                    windowStart = currentTime;
                    prevOkTime = currentTime;
                } else if (prevOkTime.plusHours(1).equals(currentTime)) {
                    prevOkTime = currentTime;
                } else {
                    closeWindow(durations, windowStart, prevOkTime, work.getRecommendation());
                    windowStart = currentTime;
                    prevOkTime = currentTime;
                }

                int currentLength = (int) Duration.between(windowStart, prevOkTime.plusHours(1)).toHours();
                if (currentLength >= MAXIMUM_WORK_DURATION) {
                    closeWindow(durations, windowStart, prevOkTime, work.getRecommendation());
                    cooldownUntil = currentTime.plusHours(COOLDOWN_GAP_HOURS);
                    windowStart = null;
                    prevOkTime = null;
                }
            } else {
                if (windowStart != null) {
                    closeWindow(durations, windowStart, prevOkTime, work.getRecommendation());
                    windowStart = null;
                    prevOkTime = null;
                }
            }
        }

        if (windowStart != null) {
            closeWindow(durations, windowStart, prevOkTime, work.getRecommendation());
        }

        return durations;
    }

    private void closeWindow(
            List<RecommendWorksResponse.RecommendationDurations> durations,
            LocalDateTime start,
            LocalDateTime end,
            String recommendation
    ) {
        long hours = Duration.between(start, end.plusHours(1)).toHours();
        if (hours >= MINIMUM_WORK_DURATION) {
            durations.add(new RecommendWorksResponse.RecommendationDurations(
                    start.toString(),
                    end.plusHours(1).toString(),
                    recommendation
            ));
        }
    }

    private boolean meets(RecommendedWork w, ShortTermWeatherForecast f) {
        boolean isRain = f.getPrecipitation() >= RAIN_MM;
        boolean isSnow = isRain && f.getTemperature() <= 0;
        boolean isHighTemp = f.getTemperature() >= HIGH_TEMP;
        boolean isLowTemp = f.getTemperature() <= LOW_TEMP;
        boolean isHighHumidity = f.getHumidity() >= HIGH_HUMIDITY;
        boolean isLowHumidity = f.getHumidity() <= LOW_HUMIDITY;
        boolean isStrongWind = f.getWindSpeed() >= STRONG_WIND;

        return !(w.isRain() && isRain) &&
                !(w.isSnow() && isSnow) &&
                !(w.isHighTemperature() && isHighTemp) &&
                !(w.isLowTemperature() && isLowTemp) &&
                !(w.isHighHumidity() && isHighHumidity) &&
                !(w.isLowHumidity() && isLowHumidity) &&
                !(w.isStrongWind() && isStrongWind);
    }
}
