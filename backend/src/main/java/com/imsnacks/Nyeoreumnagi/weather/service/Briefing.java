package com.imsnacks.Nyeoreumnagi.weather.service;

import com.imsnacks.Nyeoreumnagi.weather.entity.WeatherRisk;
import com.imsnacks.Nyeoreumnagi.work.entity.MyCrop;
import com.imsnacks.Nyeoreumnagi.work.repository.MyCropRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.temporal.ChronoField;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Random;

@RequiredArgsConstructor
@Component
public final class Briefing {
    private final MyCropRepository myCropRepo;

    public static final int AM = 0;
    public static final String AM_KOR = "오전";
    public static final String PM_KOR = "오후";
    public static final String OCLOCK_KOR = "시";
    public static final String FROM_KOR = "부터";
    public static final String TO_KOR = "까지";
    public static final String SPACE = " ";
    public static final String KST = "Asia/Seoul";
    public static final Comparator<WeatherRisk> RISK_COMPARATOR = new RiskComparator();

    public static final String WORK_HOUR_NO_RISK_WEATHER_MSG_ONE = "오늘은 농사짓기 딱 좋은 날씨에요.";
    public static final String WORK_HOUR_NO_RISK_WEATHER_MSG_TWO = "하늘도 도와주는 하루예요. 작업하기 좋겠어요.";
    public static final String WORK_HOUR_NO_RISK_WEATHER_MSG_THREE = "오늘 같은 날은 %s도 기분 좋을 거예요.";

    public static final String OFF_HOUR_NO_RISK_WEATHER_MSG_ONE = "오늘도 고생 많으셨어요. 푹 쉬시고 내일 다시 힘내요.";
    public static final String OFF_HOUR_NO_RISK_WEATHER_MSG_TWO = "내일의 계획을 세우고, 편안하게 쉬어보세요.";
    public static final String OFF_HOUR_NO_RISK_WEATHER_MSG_THREE = "이제 잘 쉬어야 할 시간이에요. 좋은 밤 보내세요.";

    public static final String GOOD_MORNING = "작업 시 기상 상황에 유의하세요.";
    public static final String GOOD_AFTERNOON = "기상 상황을 수시로 확인하세요.";
    public static final String GOOD_EVENING = "기상 리스크가 예보되어 있어요.";
    public static final String GOOD_NIGHT = "작업 전에 기상 상황을 미리 확인하세요.";

    public static final String GOOD_MORNING_NO_RISK = "오늘도 힘찬 하루 보내세요.";
    public static final String GOOD_AFTERNOON_NO_RISK = "점심은 맛있게 드셨나요?";
    public static final String GOOD_EVENING_NO_RISK = "오늘 하루도 수고 많으셨어요.";
    public static final String GOOD_NIGHT_NO_RISK = "편안한 시간 보내고 계신가요?";

    public static String buildWelcomeMsg(int hour) {
        if (hour < 6) return GOOD_NIGHT;
        else if (hour < 12) return GOOD_MORNING;
        else if (hour < 18) return GOOD_AFTERNOON;
        else return GOOD_EVENING;
    }

    public static String buildNoRiskWelcomeMsg(int hour) {
        if (hour < 6) return GOOD_NIGHT_NO_RISK;
        else if (hour < 12) return GOOD_MORNING_NO_RISK;
        else if (hour < 18) return GOOD_AFTERNOON_NO_RISK;
        else return GOOD_EVENING_NO_RISK;
    }

    public static String buildWeatherMsg(LocalDateTime now, WeatherRisk risk) {
        LocalDateTime start = risk.getStartTime();
        LocalDateTime end = risk.getEndTime();
        boolean isBeforeNow = start.isBefore(now);

        final String from = getClockHourAsString(isBeforeNow ? now : start);
        final String to = getClockHourAsString(end);

        final StringBuilder sb = new StringBuilder();
        sb.append(from).append(FROM_KOR).append(SPACE);
        sb.append(to).append(TO_KOR).append(SPACE);
        sb.append(risk.getName().getDescription());

        return sb.toString();
    }

    public String buildNoRiskWeatherMsg(long memberId, int hour) {
        List<String> messages = new ArrayList<>();
        if (hour >= 6 && hour < 18) {
            messages.add(WORK_HOUR_NO_RISK_WEATHER_MSG_ONE);
            messages.add(WORK_HOUR_NO_RISK_WEATHER_MSG_TWO);
            List<MyCrop> myCrops = getMyCropListOrNull(memberId);
            if (myCrops != null) {
                String cropName = selectMyCropRandom(myCrops);
                messages.add(String.format(WORK_HOUR_NO_RISK_WEATHER_MSG_THREE, cropName));
            }
        } else {
            messages.add(OFF_HOUR_NO_RISK_WEATHER_MSG_ONE);
            messages.add(OFF_HOUR_NO_RISK_WEATHER_MSG_TWO);
            messages.add(OFF_HOUR_NO_RISK_WEATHER_MSG_THREE);
        }
        return selectMessageRandom(messages);
    }

    private List<MyCrop> getMyCropListOrNull(long memberId) {
        List<MyCrop> myCrops = myCropRepo.findAllByMember_Id(memberId);
        if (myCrops.isEmpty()) {
            return null;
        }
        return myCrops;
    }

    private String selectMyCropRandom(List<MyCrop> myCrops) {
        Random random = new Random();
        int idx = random.nextInt(myCrops.size());
        MyCrop myCrop = myCrops.get(idx);
        return myCrop.getCrop().getName();
    }

    private String selectMessageRandom(List<String> messages) {
        Random random = new Random();
        int idx = random.nextInt(messages.size());
        return messages.get(idx);
    }


    private static String getClockHourAsString(final LocalDateTime time) {
        final StringBuilder sb = new StringBuilder();
        final boolean isAM = (time.get(ChronoField.AMPM_OF_DAY) == AM);
        sb.append(isAM ? AM_KOR : PM_KOR).append(SPACE);
        sb.append(time.get(ChronoField.CLOCK_HOUR_OF_AMPM)); // the hour within the AM/PM, from 1 to 12.
        sb.append(OCLOCK_KOR);
        return sb.toString();
    }

    private static class RiskComparator implements Comparator<WeatherRisk> {

        @Override
        public int compare(final WeatherRisk r1, final WeatherRisk r2) {
            final LocalDateTime now = LocalDateTime.now(java.time.ZoneId.of(KST));

            // 1. 시작 시각이 현재 시각과 가깝다
            // r1와 r2의 각 시작시간의 차이가 1시간 이내라면 특보 우선 순위를 따른다.
            final long betweenR1 = Math.abs(ChronoUnit.MINUTES.between(now, r1.getStartTime()));
            final long betweenR2 = Math.abs(ChronoUnit.MINUTES.between(now, r2.getStartTime()));
            if (betweenR1 != betweenR2 && Math.abs(ChronoUnit.HOURS.between(r1.getStartTime(), r2.getStartTime())) > 1) {
                return (betweenR1 < betweenR2) ? -1 : 1;
            }

            // 2. 특보 우선 순위
            final long t1 = r1.getName().ordinal();
            final long t2 = r2.getName().ordinal();
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
