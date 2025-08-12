package com.imsnacks.Nyeoreumnagi.weather.service;

import com.imsnacks.Nyeoreumnagi.weather.entity.WeatherRisk;

import java.time.LocalDateTime;
import java.time.temporal.ChronoField;
import java.time.temporal.ChronoUnit;
import java.util.Comparator;

public final class Briefing {
    public static final int AM = 0;
    public static final String AM_KOR = "오전";
    public static final String PM_KOR = "오후";
    public static final String OCLOCK_KOR = "시";
    public static final String FROM_KOR = "부터";
    public static final String TO_KOR = "까지";
    public static final String SPACE = " ";
    public static final String KST = "Asia/Seoul";
    public static final Comparator<WeatherRisk> RISK_COMPARATOR = new RiskComparator();

    public static String buildMsg(final WeatherRisk risk) {
        assert(risk != null);
        //TODO 리스크의 시작 시각이 현재 시각 이전인 경우, "<현재 시각>부터"로 전달할 것인가?
        final String from = getClockHourAsString(risk.getStartTime()); // <오전/오후> <1-12>시
        final String to = getClockHourAsString(risk.getEndTime());

        final StringBuilder sb = new StringBuilder();
        sb.append(from).append(FROM_KOR).append(SPACE);
        sb.append(to).append(TO_KOR).append(SPACE);
        sb.append(risk.getType().getDescription());

        return sb.toString();
    }

    private static String getClockHourAsString(final LocalDateTime time) {
        final StringBuilder sb = new StringBuilder();
        final boolean isAM = (time.get(ChronoField.AMPM_OF_DAY) == AM);
        sb.append(isAM ? AM_KOR : PM_KOR).append(SPACE);
        sb.append(Integer.toString(time.get(ChronoField.CLOCK_HOUR_OF_AMPM))); // the hour within the AM/PM, from 1 to 12.
        sb.append(OCLOCK_KOR);
        return sb.toString();
    }

    private static class RiskComparator implements Comparator<WeatherRisk> {

        @Override
        public int compare(final WeatherRisk r1, final WeatherRisk r2) {
            final LocalDateTime now = LocalDateTime.now();

            // 1. 시작 시각이 현재 시각과 가깝다
            // r1와 r2의 각 시작시간의 차이가 1시간 이내라면 특보 우선 순위를 따른다.
            final long betweenR1 = Math.abs(ChronoUnit.MINUTES.between(now, r1.getStartTime()));
            final long betweenR2 = Math.abs(ChronoUnit.MINUTES.between(now, r2.getStartTime()));
            if (betweenR1 != betweenR2 && Math.abs(ChronoUnit.HOURS.between(r1.getStartTime(), r2.getStartTime())) > 1) {
                return (betweenR1 < betweenR2) ? -1 : 1;
            }

            // 2. 특보 우선 순위
            final long t1 = r1.getType().ordinal();
            final long t2 = r2.getType().ordinal();
            if (t1 != t2) {
                return (t1 > t2) ? -1 : 1;
            }
           //  3. 기간이 더 긴 것을 우선한다.
            final long duration1 = Math.abs(ChronoUnit.MINUTES.between(r1.getStartTime(), r1.getEndTime()));
            final long duration2 = Math.abs(ChronoUnit.MINUTES.between(r2.getStartTime(), r2.getEndTime()));
            if (duration1 == duration2) {
                return 0;
            }
            return (duration1 > duration2) ? -1 : 1;
        }
    }
}
