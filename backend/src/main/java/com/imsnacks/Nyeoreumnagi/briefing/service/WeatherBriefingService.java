package com.imsnacks.Nyeoreumnagi.briefing.service;

import com.imsnacks.Nyeoreumnagi.briefing.dto.request.WeatherBriefingRequest;
import com.imsnacks.Nyeoreumnagi.briefing.dto.response.WeatherBriefingResponse;
import com.imsnacks.Nyeoreumnagi.briefing.entity.WeatherRisk;
import com.imsnacks.Nyeoreumnagi.briefing.repository.WeatherRiskRepository;
import com.imsnacks.Nyeoreumnagi.member.entity.Member;
import com.imsnacks.Nyeoreumnagi.member.exception.MemberException;
import com.imsnacks.Nyeoreumnagi.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.temporal.ChronoField;
import java.util.Comparator;
import java.util.List;

import static com.imsnacks.Nyeoreumnagi.member.exception.MemberResponseStatus.MEMBER_NOT_FOUND;

@RequiredArgsConstructor
@Service
public class WeatherBriefingService {
    static final int AM = 0;
    static final int PM = 1;
    static final String AM_KOR = "오전";
    static final String PM_KOR = "오후";
    static final String OCLOCK_KOR = "시";
    static final String FROM_KOR = "부터";
    static final String TO_KOR = "까지";
    static final String SPACE = " ";
    static final String KST = "Asia/Seoul";

    private final WeatherRiskRepository weatherRiskRepo;
    private final MemberRepository memberRepo;

    public WeatherBriefingResponse get(Long memberId) {
        final Member member = memberRepo.findById(memberId).orElseThrow(() -> new MemberException(MEMBER_NOT_FOUND));
        final Farm farm = member.getFarm();
        final int nx = farm.getNx();
        final int ny = farm.getNy();

        boolean hasWeatherRisk = false;
        String weatherMsg = "";
        final List<WeatherRisk> weatherRisks = weatherRiskRepo.findAllByNxAndNy(nx, ny);
        if (!weatherRisks.isEmpty()) {
            Comparator<WeatherRisk> compareByDateTime = Comparator.comparing(WeatherRisk::getStartTime)
                    .thenComparing(WeatherRisk::getEndTime);
            final LocalDateTime now = LocalDateTime.now(ZoneId.of(KST));

            //TODO WeatherRisk의 jobExecutionId를 통해 가장 최근에 산출된 정보만 가져오는 단계가 추가되어야 함.
            List<WeatherRisk> filteredWeatherRisks = weatherRisks.stream()
                    .filter(r -> r.getEndTime().isAfter(now)) // endHour가 현재 시각보다 뒤인 경우만 필요하다.
                    .sorted(compareByDateTime) // 시작시각 -> 종료시각 순으로 비내림차순 정렬
                    .toList();
            if (!filteredWeatherRisks.isEmpty()) {
                hasWeatherRisk = true;
                weatherMsg = buildWeatherMsg(filteredWeatherRisks.get(0));
            }
            // Batch 서버가 처리한 weatherRisk는 항상 배치 실행 시점 이후 24시간 동안의 예보이다.
            // 기상 리스크의 시작 시간 순으로 weatherRisks를 정렬  // sorted
            // 현재 시각과 가장 가까운 것 하나만 선택하여 메시지를 생성해 반환한다. // 그냥 맨 앞 거 선택하면 됨.
        }

        return new WeatherBriefingResponse(hasWeatherRisk, weatherMsg);
    }

    private String buildWeatherMsg(WeatherRisk risk) {
        String from = getHourAsString(risk.getStartTime()); // <오전/오후> <1-12>시
        String to = getHourAsString(risk.getEndTime());

        //TODO 리스크의 시작 시각이 현재 시각 이전인 경우, "<현재 시각>부터"로 전달할 것인가?
        StringBuilder sb = new StringBuilder();
        sb.append(from).append(FROM_KOR).append(SPACE);
        sb.append(to).append(TO_KOR).append(SPACE);
        sb.append(risk.getName());

        return sb.toString();
    }

    private String getHourAsString(LocalDateTime time) {
        StringBuilder sb = new StringBuilder();
        if (time.get(ChronoField.AMPM_OF_DAY) == AM) { // 0: AM, 1: PM
            sb.append(AM_KOR);
        } else {
            sb.append(PM_KOR);
        }
        sb.append(SPACE);
        sb.append(Integer.toString(time.get(ChronoField.CLOCK_HOUR_OF_AMPM))); // the hour within the AM/PM, from 1 to 12.
        sb.append(OCLOCK_KOR);
        return sb.toString();
    }
}
